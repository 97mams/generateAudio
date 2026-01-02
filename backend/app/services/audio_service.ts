import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import GTTS from 'gtts'
import { executionAsyncId } from 'node:async_hooks'
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
    const folder = app.publicPath() + '/uploads'
    fs.mkdirSync(folder, { recursive: true, mode: 0o755 })

    return new Promise((resolve, reject) =>
      g.save(folder + name, (error) => {
        if (error) {
          console.log(error)
          reject(error)
        } else resolve(folder + name)
      })
    )
  }

  async TextToSpeechGenerate(data: AudioData | any) {
    const timestamp = Date.now()
    const pathWav = app.publicPath(path.join('wav', timestamp + 'wav'))
    const pathMp3 = app.publicPath(path.join('mp3', timestamp + 'mp3'))

    console.log(data)

    executionAsyncId

    exec(`mkdir -p "${path.dirname('uploads')}`)

    // await execSync(`mkdir -p "${path.dirname('uploads')}`)

    // await execSync(`espeak "${data.text.replace(/"/g, '\\"')}" --stdout > "${pathWav}"`)

    // Convertit WAV → MP3 avec ffmpeg
    // await execSync(`ffmpeg -y -i "${pathWav}" -vn -ar 44100 -ac 2 -b:a 192k "${pathMp3}"`)

    return pathMp3
  }
}
