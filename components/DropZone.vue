<template>
  <div
    ref="dropzone"
    :class="[
      $style['dropzone'],
      {[$style['dropzone__highlight']]: highlight}
    ]" />
</template>

<script setup>
const emit = defineEmits(['update'])
const dropzone = ref(null)
const highlight = ref(false)

const onDragEnter = event => {
  highlight.value = true
  event.preventDefault()
  event.stopPropagation()
}
const onDragLeave = event => {
  highlight.value = false
  event.preventDefault()
  event.stopPropagation()
}
const onDragOver = event => {
  highlight.value = true
  event.preventDefault()
  event.stopPropagation()
}
const onDrop = event => {
  emit('update', { files: event.dataTransfer.files })
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
.dropzone {
    border: 2px dotted transparent;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: auto;
    height: auto;
    pointer-events: none;

    &__highlight {
        border-color: var(--primary-cta-base);

    }
}
</style>
