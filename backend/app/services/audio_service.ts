import Audio from '#models/audio'
import app from '@adonisjs/core/services/app'
import GTTS from 'gtts'
import fs from 'node:fs'
import path from 'node:path'

import ffmpeg from 'fluent-ffmpeg'
import mp3Cutter from 'mp3-cutter'
import { parseFile } from 'music-metadata'

ffmpeg.setFfmpegPath('ffmpeg')

type AudioData = {
  text: string
  language: string
}

export class AudioService {
  async createAudio(data: AudioData | any) {
    const folder: { folder: string; name: string } = await this.generateAudio(
      data.text,
      data.language
    )
    const durationInSeconds = await this.getAudioDuration(folder.folder as string)
    this.audiCutte(durationInSeconds, '1', folder.name)
    const mix = await this.mixAudio(folder.name)
    console.log('mix', mix)
    // return this.getAudio(mix)
  }

  async removeAudioFile(id: number): Promise<boolean> {
    const audio = await Audio.findOrFail(id)
    const fileName = audio.name
    const filePath = app.publicPath(path.join('uploads', fileName))
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  }

  private async generateAudio(
    text: string,
    language: string
  ): Promise<{ folder: string; name: string }> {
    const g = new GTTS(text, language)
    const name = Date.now() + '.mp3'
    const folder = app.publicPath(path.join('uploads'), name)
    fs.mkdirSync(app.publicPath(path.join('uploads')), { recursive: true, mode: 0o755 })
    await Audio.create({ name: name })
    return new Promise((resolve, reject) =>
      g.save(folder, async (error) => {
        if (error) {
          reject(error)
        } else {
          resolve({ folder, name })
        }
      })
    )
  }

  private async getAudio(name: string) {
    const audio = await Audio.findBy('name', name)
    return {
      id: audio?.id,
      name: audio?.name,
      url: `public/uploads/${audio?.name}`,
      download: `/audio/${audio?.id}/download`,
      stream: `/audio/${audio?.id}/stream`,
    }
  }

  private mixAudio(audio: string): Promise<string> {
    const splintNameAudio = audio.split('.')
    const audio1 = app.publicPath(path.join('uploads', audio))
    const audio2 = app.publicPath(path.join('cutte', audio))
    const outputDir = app.publicPath('mixedAudio')
    const output = path.join(outputDir, `mixed_${splintNameAudio[0]}.wav`)

    const delayMs = 500

    if (!fs.existsSync(audio1)) {
      throw new Error(`Audio1 introuvable: ${audio1}`)
    }

    if (!fs.existsSync(audio2)) {
      throw new Error(`Audio2 introuvable: ${audio2}`)
    }

    fs.mkdirSync(outputDir, { recursive: true, mode: 0o755 })

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(audio1)
        .input(audio2)

        // 🎚 audio2 plus faible
        .complexFilter([
          { filter: 'volume', options: '1.0', inputs: '0:a', outputs: 'a1' },
          { filter: 'volume', options: '0.2', inputs: '1:a', outputs: 'a2' },
          {
            filter: 'adelay',
            options: `${delayMs}|${delayMs}`,
            inputs: ['voice', 'bg'],
          },
          {
            filter: 'amix',
            options: { inputs: 2, dropout_transition: 0 },
            inputs: ['a1', 'a2'],
          },
        ])

        .outputOptions('-c:a pcm_s16le')

        .output(output)

        .on('end', () => resolve(audio))
        .on('error', (err) => reject(new Error('Erreur lors du mix audio: ' + err.message)))

        .run()
    })
  }

  private async getAudioDuration(filePath: string) {
    if (fs.existsSync(filePath)) {
      const metadata = await parseFile(filePath)
      return metadata.format.duration
    }
    return 0
  }

  private audiCutte(duration?: number, name?: string, nameFile?: string) {
    if (name && duration && nameFile) {
      const bgAudio = app.publicPath(`backgroundAudio/${name}.mp3`)
      console.log('duration', bgAudio)
      const folder = app.publicPath(path.join('cutte', nameFile))
      fs.mkdirSync(app.publicPath(path.join('cutte')), { recursive: true, mode: 0o755 })
      mp3Cutter.cut({
        src: bgAudio,
        target: folder,
        start: 0,
        end: duration,
      })
    }
  }
}
