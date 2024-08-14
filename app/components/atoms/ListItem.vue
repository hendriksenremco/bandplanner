<template>
  <div :class="$style['list-item']" role="listitem">
    <slot />
  </div>
</template>
<style module lang="scss">
.list-item {
    display: flex;
    align-items: stretch;
    min-height: var(--spacing-xxxl);
}
</style>
