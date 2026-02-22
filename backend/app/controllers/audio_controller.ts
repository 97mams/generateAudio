import Audio from '#models/audio'
import { AudioService } from '#services/audio_service'
import { createAudioValidator } from '#validators/audio_validate'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

@inject()
export default class AudioController {
  constructor(private service: AudioService) {}
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    request.header('user-agent')
    const audios = await Audio.all()

    return audios.map((audio) => ({
      id: audio.id,
      name: audio.name,
      url: `public/uploads/${audio.name}`,
      download: `/audio/${audio.id}/download`,
      stream: `/audio/${audio.id}/stream`,
    }))
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const validatedData = await createAudioValidator.validate(data)
    return await this.service.createAudio(validatedData)
  }

  async download({ params, response }: HttpContext) {
    const audio = await Audio.find(params.id)

    if (!audio) {
      return response.notFound()
    }

    return response.attachment(
      app.makePath('public/mixedAudio', 'mixed_' + audio.name + '.wav'),
      audio.name
    )
  }

  async stream({ params, response }: HttpContext) {
    return await this.service.streamAudio(params.id, response)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const deleted = await this.service.removeAudioFile(params.id)
    console.log(deleted)
    if (deleted) {
      return { type: 'success', message: 'Audio deleted successfully' }
    }
    return { type: 'error', message: 'Audio file does not exist' }
  }
}
