<template>
  <button
    :class="[$style['button'],
             {[$style[`button--${color}`]]: color},
             {[$style[`button--text-${textColor}`]]: textColor},
             {[$style[`button--${size}`]]: size},
             {[$style[`button--styleless`]]: styleless}
    ]">
    <span :class="$style['button__content']">
      <span v-if="icon && iconPos ==='left'" :class="$style['button__icon']">
        <component :is="icon" />
      </span>
      <slot />

      <span v-if="icon && iconPos === 'right'" :class="$style['button__icon']">
        <component :is="icon" />
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
  textColor: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  iconPos: {
    type: String,
    default: 'left'
  },
  icon: {
    type: Object,
    default: null
  },
  styleless: {
    type: Boolean,
    default: false
  }
})

</script>
<style module>
@import url('~/css/components/_button.css');
</style>
