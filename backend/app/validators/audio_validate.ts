import vine from '@vinejs/vine'

export const createAudioValidator = vine.compile(
  vine.object({
    text: vine.string().minLength(3),
    language: vine.string(),
  })
)
