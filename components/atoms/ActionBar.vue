<template>
  <menu :class="$style['action-bar']">
    <slot />
  </menu>
</template>
<style module>
.action-bar {
    display: flex;
    padding: 0;
    gap: var(--spacing-m);
}
</style>
