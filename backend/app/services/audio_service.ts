import db from '@adonisjs/lucid/services/db'

export class AudioService {
  async allAudio() {
    const audio = await db.from('audio').select('title', 'path')
    return audio
  }
}
