import Audio from '#models/audio'
import { AudioService } from '#services/audio_service'
import { createAudioValidator } from '#validators/audio_validate'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AudioController {
  constructor(private service: AudioService) {}
  /**
   * Display a list of resource
   */
  async index() {
    const service = new AudioService()
    return service.allAudio()
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const validatedData = await createAudioValidator.validate(data)
    // const gtts = await this.service.createAudio(validatedData)
    const espeak = await this.service.TextToSpeechGenerate(validatedData)

    return { data: espeak }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const audio = await Audio.findOrFail(params.id)
    return audio
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const audio = await Audio.findOrFail(params.id)
    await audio.delete()
    return { message: 'Audio deleted successfully' }
  }
}
