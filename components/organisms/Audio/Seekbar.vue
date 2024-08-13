<template>
  <div :class="$style['progress']">
    <div
      :class="$style['track']">
      <div :class="$style['current-time']" :style="{width: `${progress * 100}%`}" />
      <input
        ref="seekbar"
        v-model.number="currentValue"
        :class="$style['seekbar']"
        step="0.1"
        type="range"
        min="0"
        :max="duration"
        @pointerdown="() => isScrubbing = true"
        @pointerup="() => isScrubbing = false"
        @change="onChange">
    </div>
  </div>
</template>
<script setup lang="ts">
 interface Props {
    current: number
    duration: number
}
const props = defineProps<Props>()
const emit = defineEmits(['update'])
const seekbar = ref()
const currentValue = ref(0)
const isScrubbing = ref(false)

const progress = computed(() => {
  return props.current / props.duration
})

const onChange = event => {
  if (isScrubbing.value) { return }
  emit('update', currentValue.value)
}

watch(() => props.current, () => {
  if (isScrubbing.value) { return }

  currentValue.value = props.current
})

</script>
<style module>
.progress {
    --seekbar-opacity: 0;
    height: var(--spacing-m);
    margin-top: var(--spacing);
    position: relative;
}
.progress:hover {
    --seekbar-opacity: 1;
}

.track {
    background-color: var(--background-subtle);
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--spacing-m);
    padding: 2px;
    width: 100%;

}
.current-time {
    background-color: var(--text-base);
    border-radius: 999px;
    height: 100%;
    width: 0%;
}
.seekbar {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: var(--spacing-m);
    opacity: var(--seekbar-opacity);
    appearance: none;
    background: transparent;
    border-radius: 999px;
    overflow: hidden;

}
.seekbar::-webkit-slider-runnable-track {
    background: transparent;
}
.seekbar::-webkit-slider-thumb {
  appearance: none;
  height: var(--spacing-m);
  width: var(--spacing-m);
  background-color: var(--text-base);
  border-radius: 50%;
  border: 2px solid var(--primary-cta-base);

  box-shadow: -807px 0 0 800px var(--primary-cta-base);;
}
</style>
