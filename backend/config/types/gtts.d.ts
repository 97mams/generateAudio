declare module 'gtts' {
  import { Readable } from 'node:stream'

  type Language =
    | 'af'
    | 'sq'
    | 'ar'
    | 'hy'
    | 'ca'
    | 'zh'
    | 'zh-cn'
    | 'zh-tw'
    | 'hr'
    | 'cs'
    | 'da'
    | 'nl'
    | 'en'
    | 'en-au'
    | 'en-uk'
    | 'en-us'
    | 'eo'
    | 'fi'
    | 'fr'
    | 'de'
    | 'el'
    | 'ht'
    | 'hi'
    | 'hu'
    | 'is'
    | 'id'
    | 'it'
    | 'ja'
    | 'ko'
    | 'la'
    | 'lv'
    | 'mk'
    | 'no'
    | 'pl'
    | 'pt'
    | 'pt-br'
    | 'ro'
    | 'ru'
    | 'sr'
    | 'sk'
    | 'es'
    | 'es-es'
    | 'es-us'
    | 'sw'
    | 'sv'
    | 'ta'
    | 'th'
    | 'tr'
    | 'vi'

  class GTTS {
    constructor(text: string, lang?: Language, slow?: boolean)

    /**
     * Génère un fichier mp3
     */
    save(filepath: string, callback?: (error?: Error) => void): void

    /**
     * Retourne un stream audio (Node.js)
     */
    stream(): Readable
  }

  export = GTTS
}
