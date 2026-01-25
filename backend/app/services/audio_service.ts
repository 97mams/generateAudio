import Audio from '#models/audio'
import app from '@adonisjs/core/services/app'
import ffmpegPath from 'ffmpeg-static'
import GTTS from 'gtts'
import fs from 'node:fs'
import path from 'node:path'

import ffmpeg from 'fluent-ffmpeg'
import { parseFile } from 'music-metadata'

ffmpeg.setFfmpegPath(ffmpegPath as unknown as string)

type AudioData = {
  text: string
  language: string
}

export class AudioService {
  async createAudio(data: AudioData | any) {
    const audio1: string = (await this.generateAudio(data.text, data.language)) as string

    const duration = this.getAudioDuration(audio1)

    console.log(duration)
  }

  async removeAudioFile(id: number): Promise<boolean> {
    const audio = await Audio.findOrFail(id)
    const fileName = audio.name
    const filePath = app.publicPath(path.join('uploads', fileName))
    if (fs.existsSync(filePath)) {
      console.log('deleted')
      fs.unlinkSync(filePath)
      return true
    }
    return false
  }

  private async generateAudio(text: string, language: string) {
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
          resolve(await this.getAudio(name))
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

  private mixAudio(audio1: string, audio2: string, output: string) {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(audio1)
        .input(audio2)
        .on('error', (err: any) => {
          reject(err)
        })
        .output(output)
        .on('end', () => {
          resolve(output)
        })
        .run()
    })
  }

  private async getAudioDuration(filePath: string) {
    const metadata = await parseFile(filePath)
    return metadata.format.duration
  }

  private formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }
}
