import Audio from '#models/audio'
import { AudioService } from '#services/audio_service'
import { createAudioValidator } from '#validators/audio_validate'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { createReadStream } from 'node:fs'

@inject()
export default class AudioController {
  constructor(private service: AudioService) {}
  /**
   * Display a list of resource
   */
  async index() {
    const audios = await Audio.all()

    return audios.map((audio) => ({
      id: audio.id,
      name: audio.name,
      url: `public/uploads/${audio.name}`,
      download: `/audio/download/${audio.name}`,
      stream: `/audio/stream/${audio.name}`,
    }))
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const validatedData = await createAudioValidator.validate(data)
    const espeak = await this.service.createAudio(validatedData)

    return { data: espeak }
  }

  async download({ params, response }: HttpContext) {
    const audio = await Audio.find(params.id)

    if (!audio) {
      return response.notFound()
    }

    return response.download(app.makePath('public/uploads', audio.name))
  }

  async stream({ params, response }: HttpContext) {
    const audio = await Audio.find(params.id)

    if (!audio) {
      return response.notFound()
    }

    const filePath = app.makePath('public/uploads', audio.name)

    response.header('Content-Type', 'audio/mpeg')
    response.header('Content-Disposition', `inline; filename="${audio.name}"`)

    return response.stream(createReadStream(filePath))
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
