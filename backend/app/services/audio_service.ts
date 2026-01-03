import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import GTTS from 'gtts'
import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

type AudioData = {
  text: string
  langauge: string
}

export class AudioService {
  async allAudio() {
    const audio = await db.from('audio').select('title', 'path')
    return audio
  }

  async createAudio(data: AudioData | any) {
    const g = new GTTS(data.text, data.langauge)
    const name = Date.now() + '.mp3'
    const folder = app.publicPath(path.join('uploads'), name)
    fs.mkdirSync(app.publicPath(path.join('uploads')), { recursive: true, mode: 0o755 })

    return new Promise((resolve, reject) =>
      g.save(folder, (error) => {
        if (error) {
          reject(error)
        } else resolve(folder)
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
}
