import type { HttpContext } from '@adonisjs/core/http'
import { Audio } from '#models/audio'

export default class AudioController {
  async index(ctx: HttpContext) {
    const audios = await Audio.all()
    return audios
  }

  async show(ctx: HttpContext) {
    const audio = await Audio.findOrFail(ctx.params.id)
    return audio
  }

  async store(ctx: HttpContext) {
    const audio = await Audio.create(ctx.request.body())
    return audio
  }

  async update(ctx: HttpContext) {
    const audio = await Audio.findOrFail(ctx.params.id)
    await audio.merge(ctx.request.body()).save()
    return audio
  }

  async destroy(ctx: HttpContext) {
    const audio = await Audio.findOrFail(ctx.params.id)
    await audio.delete()
    return audio
  }

  async restore(ctx: HttpContext) {
    const audio = await Audio.restore(ctx.params.id)
    return audio
  }
}
