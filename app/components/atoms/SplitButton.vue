<template>
  <div :class="$style['split-button']">
    <div :class="$style['split-button__first']">
      <slot name="first" />
    </div>
    <div
      :class="$style['split-button__second']">
      <slot name="second" />
    </div>
  </div>
</template>
<style module>
.split-button {
    display: flex;
    gap: 1px;
}
.split-button__first {
    /* flex: 1; */
}
.split-button__second {
    /* flex: 0 */
}
</style>
