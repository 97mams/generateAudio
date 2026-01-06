import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AudioController = () => import('#controllers/audio_controller')

router
  .group(() => {
    router.get('audio', [AudioController, 'index'])
    router.get('audio/:id', [AudioController, 'download'])
    router.post('audio', [AudioController, 'store'])
    router.get('audio/stream/:id', [AudioController, 'stream'])
  })
  .prefix('/api')
  .use(middleware.auth())
