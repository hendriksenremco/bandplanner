<template>
  <label v-bind="$attrs" :class="$style['form-label']">
    <slot />
  </label>
</template>
<style module>
.form-label {
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-small);
    height: var(--line-height-small);
    margin-bottom:var(--spacing-s);
}
</style>
