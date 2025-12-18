import Audio from '#models/audio'
import type { HttpContext } from '@adonisjs/core/http'

export default class AudioController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const audios = await Audio.all()
    return audios
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const audio = await Audio.findOrFail(params.id)
    return audio
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
    const audio = await Audio.findOrFail(params.id)
    return audio
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const audio = await Audio.findOrFail(params.id)
    const data: { title: string; path: string } = request.only(['title', 'path'])
    audio.merge(data)
    await audio.save()
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
