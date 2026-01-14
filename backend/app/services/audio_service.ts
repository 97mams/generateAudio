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
    const g = new GTTS(data.text, data.language)
    const name = Date.now() + '.mp3'
    const folder = app.publicPath(path.join('uploads'), name)
    fs.mkdirSync(app.publicPath(path.join('uploads')), { recursive: true, mode: 0o755 })
    const audio = await Audio.create({ name: name })
    return new Promise((resolve, reject) =>
      g.save(folder, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve(audio)
        }
      })
    )
  }

  async TextToSpeechGenerate(data: AudioData | any) {
    const timestamp = Date.now()

    const publicP = app.publicPath()
    const pathWav = app.publicPath(path.join('wav'))
    const pathMp3 = app.publicPath(path.join('mp3'))

    await exec(`mkdir -p "${pathWav}"`)
    await exec(`mkdir -p "${pathMp3}"`)

    await exec(`espeak "${data.text.replace(/"/g, '\\"')}" --stdout > "${pathWav + timestamp}.wav"`)

    // Convertit WAV → MP3 avec ffmpeg
    const m = await exec(
      `ffmpeg -y -i "${publicP + timestamp}.wav" -vn -ar 44100 -ac 2 -b:a 192k "${pathMp3 + timestamp}.mp3"`
    )

    console.log(m)

    return pathMp3
  }

  async removeAudioFile(id: number): Promise<String> {
    const audio = await Audio.findOrFail(id)
    const fileName = audio.name
    const filePath = app.publicPath(path.join('uploads', fileName))
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return 'Audio deleted successfully'
    }
    return 'Audio file does not exist'
  }
}
