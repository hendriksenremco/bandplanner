<template>
  <component
    :is="to ? nuxtLink :'button'"
    :to="to"
    :class="[$style['button'],
             {[$style[`button--${color}`]]: color},
             {[$style[`button--text-${textColor}`]]: textColor},
             {[$style[`button--${size}`]]: size},
             {[$style[`button--disabled`]]: disabled},
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
  </component>
</template>
<script setup>
const nuxtLink = resolveComponent('nuxt-link')
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
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    type: Object,
    default: false
  }
})

</script>
<style module>
@import url('~/css/components/_button.css');
</style>
