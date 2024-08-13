export const useAudioPlayer = () => {
  const audioPlayerShouldShow: Ref<boolean> = useState('audio-player-should-show', () => ref(false))
  const file: Ref<string | null> = useState('audio-player-file', () => ref(null))
  const fileName: Ref<string | null> = useState('audio-player-name', () => ref(null))

  const play = (name: string, filePath: string) => {
    file.value = filePath
    fileName.value = name
    audioPlayerShouldShow.value = true
  }

  const stop = () => {
    file.value = null
    audioPlayerShouldShow.value = false
  }

  const close = () => {
    stop()
  }

  return {
    play,
    stop,
    close,
    audioPlayerShouldShow,
    file,
    fileName
  }
}
