<template>
  <div ref="dropzone" :class="[$style['file-grid'], {[$style['file-grid__highlight']]: highlight}]">
    <div v-if="empty">
      Voeg bestanden toe door ze te slepen
    </div>

    <slot />
  </div>
</template>
<script setup>
const slots = useSlots()

const { target } = useDragInfo()
const props = defineProps({
  name: {
    type: String,
    default: null
  },
  empty: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update'])
const dropzone = ref(null)
const highlight = ref(false)

const onDragEnter = event => {
  highlight.value = true
  event.preventDefault()
  event.stopPropagation()
}
const onDragLeave = event => {
  target.value = null
  highlight.value = false
  event.preventDefault()
  event.stopPropagation()
}
const onDragOver = event => {
  target.value = props.name
  highlight.value = true
  event.preventDefault()
  event.stopPropagation()
}
const onDrop = event => {
  emit('update', { files: event.dataTransfer.files, items: event.dataTransfer.items })
  highlight.value = false
  event.preventDefault()
  event.stopPropagation()
}
onMounted(() => {
  dropzone.value.addEventListener('dragenter', onDragEnter, null)
  dropzone.value.addEventListener('dragleave', onDragLeave, null)
  dropzone.value.addEventListener('dragover', onDragOver, null)
  dropzone.value.addEventListener('drop', onDrop, null)
})
</script>
<style lang="scss" module>
.file-grid {
    border: 2px dotted transparent;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    align-content: start;
    justify-items: center;
    gap: var(--spacing-xl);
    height: auto;
    min-height: 3rem;
    flex-wrap: wrap;
    position: relative;

    &__highlight {
        border-color: var(--primary-cta-base);
        z-index: 1000;
    }
}
</style>
