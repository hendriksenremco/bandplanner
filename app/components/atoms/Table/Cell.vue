<template>
  <div :class="[$style['table-cell'], {[$style['table-cell--small']]: small}, {[$style['table-cell--align-end']]: end}]">
    <div :class="$style['table-cell__inner']">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
    small?: boolean
    end?: boolean
}>()
</script>
  <style lang="scss" module>
  .table-cell {
    display: table-cell;
    vertical-align: middle;
      &__inner {
          display: flex;
          align-items: center;
          min-height: var(--spacing-xxxxl);
          padding-left: var(--spacing);
          padding-right: var(--spacing);
          user-select: none;
      }

      &--small {
        max-width: var(--spacing-xxxl);
        width: var(--spacing-xxxl);
      }

      &--align-end {
        .table-cell__inner {
            justify-content: flex-end;
        }
      }
  }
  </style>
