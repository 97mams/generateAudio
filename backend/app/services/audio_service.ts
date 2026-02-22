import Audio from '#models/audio'
import app from '@adonisjs/core/services/app'
import GTTS from 'gtts'
import fs, { createReadStream } from 'node:fs'
import path from 'node:path'

import ffmpeg from 'fluent-ffmpeg'
import mp3Cutter from 'mp3-cutter'
import { parseFile } from 'music-metadata'
import { Context } from 'node:vm'

ffmpeg.setFfmpegPath('ffmpeg')

type AudioData = {
  text: string
  language: string
}

export class AudioService {
  private _duration: number

  constructor() {
    this._duration = 0
  }

  get duration(): number {
    return this._duration
  }

  set duration(value: number) {
    this._duration = value
  }

  async createAudio(data: AudioData | any) {
    const folder: { folder: string; name: string } = await this.generateAudio(
      data.text,
      data.language
    )
    const durationInSeconds = await this.getAudioDuration(folder.folder as string)
    this.duration = durationInSeconds
    if (this.duration < 10) {
      return this.getAudio(folder.name)
    }
    this.audioCutte('1', folder.name)
    const mix = await this.mixAudio(folder.name)
    return this.getAudio(mix)
  }

  async removeAudioFile(id: number): Promise<boolean> {
    const audio = await Audio.findOrFail(id)
    const fileName = audio.name
    const filePath = app.publicPath(path.join('uploads', fileName))
    await audio.delete()
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    if (!audio) {
      return false
    }
    return true
  }

  private async generateAudio(
    text: string,
    language: string
  ): Promise<{ folder: string; name: string }> {
    const g = new GTTS(text, language)
    const name = String(Date.now())
    const file = name + '.mp3'
    const folder = app.publicPath(path.join('uploads'), file)
    fs.mkdirSync(app.publicPath(path.join('uploads')), { recursive: true, mode: 0o755 })
    return new Promise((resolve, reject) =>
      g.save(folder, async (error) => {
        if (error) {
          reject(error)
        } else {
          await Audio.create({ name: name })
          resolve({ folder, name })
        }
      })
    )
  }

  private async getAudio(name: string) {
    const audio = await Audio.findBy('name', name)
    if (this.duration < 10) {
      return {
        id: audio?.id,
        name: audio?.name,
        url: `public/uploads/${audio?.name}`,
        download: `/audio/${audio?.id}/download`,
        stream: `/audio/${audio?.id}/stream`,
      }
    }
    return {
      id: audio?.id,
      name: audio?.name,
      url: `public/mixedAudio/${audio?.name}`,
      download: `/audio/${audio?.id}/download`,
      stream: `/audio/${audio?.id}/stream`,
    }
  }

  private mixAudio(audio: string): Promise<string> {
    const splintNameAudio = audio.split('.')
    const audio1 = app.publicPath(path.join('uploads', audio + '.mp3'))
    const audio2 = app.publicPath(path.join('cutte', audio + '.mp3'))
    const outputDir = app.publicPath('mixedAudio')
    const output = path.join(outputDir, `mixed_${splintNameAudio[0]}.wav`)

    const delayMs = 1000

    if (this.duration < 10) {
      return Promise.resolve(audio)
    }

    if (!fs.existsSync(audio1)) {
      throw new Error(`Audio1 introuvable: ${audio1}`)
    }

    if (!fs.existsSync(audio2)) {
      throw new Error(`Audio2 introuvable: ${audio2}`)
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(audio1)
        .input(audio2)

        // 🎚 audio2 plus faible
        .complexFilter(
          `
      [0:a]aformat=channel_layouts=stereo,adelay=${delayMs},volume=1.0[voice];
      [1:a]aformat=channel_layouts=stereo,volume=0.2[bg];
      [voice][bg]amix=inputs=2:dropout_transition=0
      `
        )

        .outputOptions(['-map [mixed]', '-c:a aac', '-b:a 96k', '-ar 44100', '-ac 2', '-threads 1'])

        .output(output)

        .on('end', () => resolve(audio))
        .on('error', (err) => reject(new Error('Erreur lors du mix audio: ' + err.message)))

        .run()
    })
  }

  private async getAudioDuration(filePath: string): Promise<number> {
    if (fs.existsSync(filePath)) {
      const metadata = await parseFile(filePath)
      return metadata?.format?.duration || 0
    }
    return 0
  }

  private audioCutte(name?: string, nameFile?: string) {
    if (name && nameFile && this.duration > 10) {
      const delay = this.duration + 2
      const bgAudio = app.publicPath(`backgroundAudio/${name}.mp3`)
      const folder = app.publicPath(path.join('cutte', nameFile + '.mp3'))
      fs.mkdirSync(app.publicPath(path.join('cutte')), { recursive: true, mode: 0o755 })
      mp3Cutter.cut({
        src: bgAudio,
        target: folder,
        start: 0,
        end: delay,
      })
    }
  }

  async streamAudio(id: number, response: Context['response']) {
    const audio = await Audio.find(id)
    if (!audio) {
      return response.notFound()
    }
    let filePath = app.makePath('public/mixedAudio', 'mixed_' + audio.name + '.wav')
    console.log(filePath)

    if (this._duration < 10) {
      filePath = app.makePath('public/uploads', audio.name + '.mp3')
    }

    response.header('Content-Type', 'audio/mpeg')
    response.header('Content-Type', 'application/octet-stream')
    response.header('Content-Disposition', `inline; filename="${audio.name}"`)

    return response.stream(createReadStream(filePath))
  }
}
