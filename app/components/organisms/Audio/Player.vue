<template>
  <div :class="$style['audio-player']">
    <div :class="$style['controls']">
      <IconButton :icon="IconSkipBack" @click="replay()" />
      <IconButton :icon="playing ? IconPause : IconPlay" @click="playing ? player.pause() : player.play()" />
      <IconButton :icon="IconReplay10" @click="skipBack()" />
      <IconButton :icon="IconForward10" @click="skipForward()" />
    </div>
    <div :class="$style['info']">
      <audio ref="player">
        <source :src="src" type="audio/mpeg">
      </audio>
      <h4 :class="$style['info-title']">
        {{ title }}
      </h4>
      <time :class="$style['info-time']">
        {{ currentMinutes }}:{{ currentSeconds }} / {{ totalMinutes }}:{{ totalSeconds }}
      </time>
    </div>
    <div ref="visualizer" :class="$style['visualizer']" />
  </div>
</template>
<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import IconPlay from 'remixicon/icons/Media/play-fill.svg'
import IconPause from 'remixicon/icons/Media/pause-fill.svg'
import IconSkipBack from 'remixicon/icons/Media/skip-back-fill.svg'
import IconReplay10 from 'remixicon/icons/Media/replay-10-fill.svg'
import IconForward10 from 'remixicon/icons/Media/forward-10-fill.svg'

interface Props {
    src: string,
    title: string,
}
const props = defineProps<Props>()

const visualizer = ref()
const player = ref()
const playing = ref(false)
const currentSeconds = ref('00')
const currentMinutes = ref('00')
const totalSeconds = ref('00')
const totalMinutes = ref('00')

watch(() => props.src, () => {
  if (!player.value) { return }
  playing.value = false
  initPlayer()
})

const zeroPad = number => {
  return number < 10 ? `0${number}` : number
}

const replay = () => {
  player.value.currentTime = 0
}
const skipBack = () => {
  player.value.currentTime -= 10
}

const skipForward = () => {
  player.value.currentTime += 10
}

const setCurrentTime = time => {
  player.value.currentTime = time
}

const initPlayer = () => {
  player.value.addEventListener('play', () => {
    playing.value = true
  })
  player.value.addEventListener('pause', () => {
    playing.value = false
  })
  player.value.addEventListener('timeupdate', () => {
    const currentTime = player.value.currentTime
    const duration = player.value.duration
    currentMinutes.value = zeroPad(Math.floor(currentTime / 60))
    currentSeconds.value = zeroPad(Math.floor(currentTime % 60))
    totalMinutes.value = zeroPad(Math.floor(duration / 60))
    totalSeconds.value = zeroPad(Math.floor(duration % 60))
  })
  player.value.addEventListener('loadedmetadata', event => {
    const duration = event.target.duration
    totalMinutes.value = zeroPad(Math.floor(duration / 60))
    totalSeconds.value = zeroPad(Math.floor(duration % 60))
  })

  const wavesurfer = WaveSurfer.create({
    container: visualizer.value,
    waveColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-surface-state-2'),
    progressColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-cta-base'),
    cursorColor: getComputedStyle(document.documentElement).getPropertyValue('--text-base'),
    media: player.value,
    dragToSeek: true,
    url: props.src,
    height: 30,
    sampleRate: 3000,
    plugins: [
      Hover.create({
        lineColor: getComputedStyle(document.documentElement).getPropertyValue('--text-base'),
        lineWidth: 2,
        labelBackground: '#555',
        labelColor: '#fff',
        labelSize: '0.8rem'
      })
    ]
  })

  wavesurfer.on('interaction', () => {
    wavesurfer.play()
  })
}
onMounted(initPlayer)
</script>
<style module>

.audio-player {
    display: flex;
    align-items: center;
    flex-direction:row;
    gap: var(--spacing-l);
    max-width: 40rem;
    width: 100%;
    padding-top: var(--spacing);
    padding-bottom: var(--spacing-xxl);
    position: relative;
}
.controls {
    display: flex;
    gap: var(--spacing);
    position: relative;
    z-index: 2;
}
.info {
    display: flex;
    flex-direction: column;
    font-family: monospace;
    gap: var(--spacing);
    position: relative;
    z-index: 2;
}

.seekbar {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: auto;
    z-index: 2;
}

.visualizer {
    cursor: pointer;
    display: inline-block;
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0;
    z-index: 1;
}
</style>
