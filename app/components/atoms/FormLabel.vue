<template>
  <label
    v-bind="$attrs"
    :class="[
      $style['form-label'],
      {[$style[`form-label--${color}`]]: color}
    ]">
    <slot />
  </label>
</template>
<script setup lang="ts">
interface Props {
    color?: 'error'
}

const props = defineProps<Props>()
</script>
<style module>
.form-label {
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-small);
    height: var(--line-height-small);
    margin-bottom:var(--spacing-s);
}
.form-label--error {
    color: var(--error-base);
}
</style>
