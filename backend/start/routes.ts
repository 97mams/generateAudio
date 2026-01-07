import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AudioController = () => import('#controllers/audio_controller')

router
  .group(() => {
    router.get('audio', [AudioController, 'index'])
    router.post('audio', [AudioController, 'store'])
    router.get('audio/:id/download', [AudioController, 'download'])
    router.get('audio/:id/stream', [AudioController, 'stream'])
    router.delete('audio/:id', [AudioController, 'destroy'])
  })
  .prefix('/api')
  .use(middleware.auth())
