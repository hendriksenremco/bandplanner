<template>
  <div :class="$style['avatar']">
    <img :src="src" :alt="alt">
  </div>
</template>
<script setup>
defineProps({
  src: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: null
  }
})
</script>
<style module>
.avatar {
    background-color: var(--secondary-surface);
    border-radius: 100%;
    display: flex;
    object-fit: cover;
    width: var(--spacing-xl);
    height: var(--spacing-xl);
    overflow: hidden;
}
</style>
