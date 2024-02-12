<template>
  <td :class="[$style['table-cell'], {[$style['table-cell--small']]: small}]">
    <div :class="$style['table-cell__inner']">
      <slot />
    </div>
  </td>
</template>
<script setup lang="ts">
defineProps<{
    small?: boolean
}>()
</script>
  <style lang="scss" module>
  .table-cell {
      &__inner {
          display: flex;
          align-items: center;
          min-height: var(--spacing-xxxxl);
          padding-left: var(--spacing-l);
          user-select: none;
      }

      &--small {
        max-width: var(--spacing-xxxl);
        width: var(--spacing-xxxl);
      }
  }
  </style>
