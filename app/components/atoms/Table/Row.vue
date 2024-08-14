<template>
  <tr :class="[$style['table-row'], {[$style['table-row--head']]: head}, , {[$style['table-row--selected']]: selected}]">
    <slot />
  </tr>
</template>
<script setup lang="ts">
defineProps<{
  head?: boolean,
  selected?: boolean
}>()
</script>
<style lang="scss" module>
.table-row {
    border-bottom: 1px solid var(--border-subtle);
    cursor: pointer;

    &:not(.table-row--head):not(.table-row--selected):hover {
        background-color: var(--background-subtle);
    }

    &--selected {
        background-color: var(--opacity-surface);
    }
}
</style>
