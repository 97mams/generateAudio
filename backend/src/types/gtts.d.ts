declare module 'gtts' {
  import { Readable } from 'node:stream'

  class GTTS {
    constructor(text: string, lang?: string, slow?: boolean)

    save(filepath: string, callback?: (error?: Error) => void): void

    stream(): Readable
  }

  export = GTTS
}
