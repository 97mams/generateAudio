import Audio from '#models/audio'
import app from '@adonisjs/core/services/app'
import GTTS from 'gtts'
import fs from 'node:fs'
import path from 'node:path'

type AudioData = {
  text: string
  language: string
}

export class AudioService {
  createAudio(data: AudioData | any) {
    return this.generateAudio(data.text, data.language)
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
}
