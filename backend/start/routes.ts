import router from '@adonisjs/core/services/router'
const AudioController = () => import('#controllers/audio_controller')

router
  .group(() => {
    router.get('audio', [AudioController, 'index'])
    router.get('audio/:id', [AudioController, 'show'])
    router.post('audio', [AudioController, 'store'])
  })
  .prefix('/api')
