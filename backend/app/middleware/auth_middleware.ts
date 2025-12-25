import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { createHash } from 'node:crypto'

export default class AudioMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const userAgent = ctx.request.header('user-agent') || 'unknown'
    const fingerPrint = createHash('sha256').update(userAgent).digest('hex')

    const stored = ctx.session.get('audio_finger_print', fingerPrint)
    if (!stored) {
      ctx.session.put('audio_finger_print', fingerPrint)
      return next()
    }

    console.log('ito', stored)

    if (stored !== fingerPrint) {
      ctx.session.clear()
      return ctx.response.unauthorized({
        message: 'session expired',
      })
    }

    return await next()
  }
}
