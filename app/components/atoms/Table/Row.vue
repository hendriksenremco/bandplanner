<template>
  <div :class="[$style['table-row'], {[$style['table-row--head']]: head}, , {[$style['table-row--selected']]: selected}]">
    <slot />
  </div>
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
    display: table-row;
    cursor: pointer;

    &:not(.table-row--head):not(:global(.sortable-ghost)):not(.table-row--selected):hover {
        background-color: var(--background-subtle);
    }

    &--selected {
        background-color: var(--opacity-surface);
    }

    &:global{
        &.sortable-fallback.sortable-drag {
            opacity: 1 !important;
        }
        &.sortable-chosen.sortable-ghost{

            opacity: 0.2;
        }
        &.sortable-drag{
            background-color: var(--background-raised);
            box-shadow: var(--box-shadow-elevation-1);
            border: 0;
            display: table;
            opacity: 1;
            width: 100%;
        }
    }
}
</style>
