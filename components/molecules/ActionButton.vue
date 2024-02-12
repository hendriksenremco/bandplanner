<template>
  <Button styleless>
    <div :class="$style['action-button']">
      <component :is="icon" v-if="icon" :class="$style['action-button__icon']" />
      <slot />
    </div>
  </Button>
</template>
<script setup>
defineProps({
  icon: {
    type: Object,
    default: null
  }
})
</script>
<style module>
.action-button {
    align-items: flex-start;
    display: flex;
    height: 100%;
    flex-direction: column;;
    padding: var(--spacing-m);
    gap: var(--spacing-m);
    min-width: 120px;
    width: auto;
}
.action-button__icon {
    flex-grow: 0;
    width: var(--spacing-xl);
}
</style>
