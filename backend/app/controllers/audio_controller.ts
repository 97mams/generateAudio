import Audio from '#models/audio'
import { createAudioValidator } from '#validators/audio_validate'
import type { HttpContext } from '@adonisjs/core/http'

export default class AudioController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const audios = await Audio.all()
    return audios
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const validatedData = await createAudioValidator.validate(data)

    const audio = await Audio.create(validatedData)
    return audio
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
