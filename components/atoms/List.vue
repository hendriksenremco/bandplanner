<template>
  <div :class="$style['list']" role="list">
    <slot />
  </div>
</template>
<style module>
.list {
    line-height: var(--line-height-base);
    color: var(--text-base);
}
</style>
