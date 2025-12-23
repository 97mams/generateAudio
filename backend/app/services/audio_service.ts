import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export class AudioService {
  async allAudio(ctx: HttpContext) {
    const usesession = ctx.session.get('audio_finger_print')
    console.log('session', usesession)
    const audio = await db.from('audio').select('title', 'path')
    return audio
  }
}
