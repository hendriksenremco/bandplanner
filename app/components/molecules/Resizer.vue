<template>
  <div :class="$style['resizer']" @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseover="onMouseOver" @mouseout="onMouseOut" />
</template>
<script setup>
const { onMouseDown, onMouseUp, onMouseOver, onMouseOut } = useResizer()
</script>
<style lang="scss" module>
.resizer {
    position: absolute;
    right: 0px;
    top: 0;
    height: 100%;
    width: 6px;

    &:hover {
        background-color: var(--background-raised);
    }
}
</style>
