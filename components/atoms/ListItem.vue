<template>
  <div :class="$style['list-item']" role="listitem">
    <slot />
  </div>
</template>
<style module>
.list-item {
    display: flex;
    align-items: center;
    min-height: var(--spacing-xxxl);
    padding: 0 var(--spacing-l);
}
</style>
