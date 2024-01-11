<template>
  <div :class="$style['label-group']">
    <div :class="$style['label-group__left-accessory']">
      <slot name="left-accessory" />
    </div>
    <div :class="$style['label-group__content']">
      <slot />
    </div>
  </div>
</template>
<style module>
.label-group {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
}
.label-group__left-accessory {
    color: var(--folder-icon-fill);
    margin-right: var(--spacing);
    min-width: var(--spacing-xl);
}

.label-group__content {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    width: 100%;
}

</style>
