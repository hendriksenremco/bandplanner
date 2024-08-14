<template>
  <span
    :class="[
      $style['text'],
      {[$style[`text--ellipsis`]]: ellipsis},
      {[$style[`text--${size}`]]: size},
      {[$style[`text--${color}`]]: color}
    ]"><slot /></span>
</template>
<script setup>
defineProps({
  size: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  ellipsis: {
    type: Boolean,
    default: false
  }
})
</script>
<style module>
.text {
    color: var(--text-base);
    line-height: var(--line-height-base);
}
.text--subtle {
    color: var(--text-subtle);
}

.text--inherit {
    color: inherit;
    height: var(--line-height-base);
}

.text--small {
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
}

.text--ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis ellipsis;
    height: var(--line-height-base);
    width: 100%;
}

</style>
