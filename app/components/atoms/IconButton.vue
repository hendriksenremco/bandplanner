<template>
  <button :class="[$style['button'], {[$style[`button--${color}`]]: color}]">
    <span :class="$style['button__content']">
      <span :class="$style['button__icon']">
        <component :is="icon" />
        <slot />
      </span>
    </span>
  </button>
</template>
<script setup>
defineProps({
  color: {
    type: String,
    default: null
  },
  icon: {
    type: Object,
    default: null
  }
})
</script>
<style module>
@import url('~/css/components/_button.css');

.button__content {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
</style>
