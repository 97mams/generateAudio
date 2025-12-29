import db from '@adonisjs/lucid/services/db'
import { createAudioFile } from 'simple-tts-mp3'

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
    const name = Date.now() + 'mptreo'
    // const g = new GTTS(data.text, data.langauge)
    // await g.save('.app/public')
    const file = await createAudioFile(data.text, name, 'en')
    console.log('file', file)
    //   const newName = stringHelpers.generateRandom(32) + '.mp3'

    //   mkdir()

    // const audio = await Audio.create(validatedData)
    return { status: 'ok' }
  }
}
