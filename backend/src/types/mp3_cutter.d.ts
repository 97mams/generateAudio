declare module 'mp3-cutter' {
  interface Mp3CutterOptions {
    /**
     * Chemin du fichier mp3 source
     */
    src: string

    /**
     * Chemin du fichier mp3 de sortie
     */
    target: string

    /**
     * Temps de début en secondes
     */
    start: number

    /**
     * Temps de fin en secondes
     */
    end: number
  }

  /**
   * Découpe un fichier MP3
   */
  function cut(options: Mp3CutterOptions): Promise<void>

  export = {
    cut,
  }
}
