import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AudioController = () => import('#controllers/audio_controller')

router
  .group(() => {
    router.get('audio', [AudioController, 'index'])
    router.get('audio/:id', [AudioController, 'show'])
    router.post('audio', [AudioController, 'store'])
  })
  .prefix('/api')
  .use(middleware.auth())
