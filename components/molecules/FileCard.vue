<template>
  <Card ref="card" :border="highlight ? 'dotted' : selected ? 'solid' : null">
    <template #media>
      <slot name="icon" />
    </template>
    <LabelGroup>
      <template #left-accessory>
        <slot name="icon" />
      </template>
      <Text ellipsis>
        {{ title }}
      </Text>
      <Text size="small" color="subtle" ellipsis>
        {{ subtitle }}
      </Text>
    </LabelGroup>
  </Card>
</template>
<script setup>
const { childTarget } = useDragInfo()
const props = defineProps({
  icon: {
    type: String,
    default: 'pdf'
  },
  title: {
    type: String,
    default: null
  },
  subtitle: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'file'
  },
  name: {
    type: String,
    default: null
  },
  selected: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Boolean],
    default: null
  }
})

const card = ref(null)
const highlight = ref(false)

const onDragStart = event => {
  event.dataTransfer.setData('text', props.name)
}

const onDragEnter = event => {
  highlight.value = true
  event.preventDefault()
}
const onDragLeave = event => {
  childTarget.value = null
  highlight.value = false
  event.preventDefault()
}
const onDragOver = event => {
  childTarget.value = props.name
  highlight.value = true
  event.preventDefault()
}
const onDrop = event => {
  highlight.value = false
  event.preventDefault()
}
onMounted(() => {
  if (props.type === 'folder') {
    card.value.$el.addEventListener('dragenter', onDragEnter, null)
    card.value.$el.addEventListener('dragleave', onDragLeave, null)
    card.value.$el.addEventListener('dragover', onDragOver, null)
    card.value.$el.addEventListener('drop', onDrop, null)
  }
})
</script>
