import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Audio from './audio.js'

export default class Agent extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Audio)
  public audio: HasMany<typeof Audio>
}
