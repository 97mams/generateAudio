import vine from '@vinejs/vine'

export const createAudioValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255),
    path: vine.string(),
  })
)
