import stringHelpers from '@adonisjs/core/helpers/string'
import db from '@adonisjs/lucid/services/db'
import { createAudioFile } from 'simple-tts-mp3
import { request } from 'node:http'
import { mkdir } from 'node:fs'

export class AudioService {
  async allAudio() {
    const audio = await db.from('audio').select('title', 'path')
    return audio
  }

  async createAudio(text: string) {
    const file = await createAudioFile(text, 'test', 'en')
      const newName = stringHelpers.generateRandom(32) + '.mp3'

      mkdir()

    // const audio = await Audio.create(validatedData)
    return audio
  }
}
