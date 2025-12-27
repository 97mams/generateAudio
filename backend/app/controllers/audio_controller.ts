import Audio from '#models/audio'
import { AudioService } from '#services/audio_service'
import { createAudioValidator } from '#validators/audio_validate'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'

export default class AudioController {
  /**
   * Display a list of resource
   */
  async index() {
    const service = new AudioService()
    return service.allAudio()
  }

  async store(ctx: HttpContext) {
    const data = ctx.request.all()
    const file = ctx.request.file('audio_file')
    if (file) {
      const newName = stringHelpers.generateRandom(32) + '.' + file.extname
      file.move('./', { name: newName })
    }
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
