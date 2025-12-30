import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import GTTS from 'gtts'
import fs from 'node:fs'

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
        } else resolve(folder + name)
      })
    )
  }
}
