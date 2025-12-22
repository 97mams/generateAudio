import Audio from '#models/audio'

export class AudioService {
  async allAudio() {
    const audio = await Audio.all()
    return audio
  }
}
