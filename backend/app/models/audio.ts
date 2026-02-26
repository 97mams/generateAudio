import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Agent from './agent.js'

export default class Audio extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Agent)
  declare agent: BelongsTo<typeof Agent>
}
