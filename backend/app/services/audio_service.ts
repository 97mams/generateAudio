import Audio from '#models/audio'
import app from '@adonisjs/core/services/app'
import GTTS from 'gtts'
import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

type AudioData = {
  text: string
  langauge: string
}

export class AudioService {
  async createAudio(data: AudioData | any) {
    //252 mots max
    console.log('length:', data.text.length)
    const g = new GTTS(data.text, data.language)
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

  private splitTextIntoChunks(text: string, maxWords: number): string[] {
    const words = text.split(' ')
    const chunks: string[] = []
    for (let i = 0; i < words.length; i += maxWords) {
      const chunk = words.slice(i, i + maxWords).join(' ')
      chunks.push(chunk)
    }
    return chunks
  }

  private concatAudioFiles(fileList: string[], outputFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileListPath = 'filelist.txt'
      const fileContent = fileList.map((file) => `file '${file}'`).join('\n')
      fs.writeFileSync(fileListPath, fileContent)

      const command = `ffmpeg -f concat -safe 0 -i ${fileListPath} -c copy ${outputFile}`
      exec(command, (error) => {
        fs.unlinkSync(fileListPath)
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
