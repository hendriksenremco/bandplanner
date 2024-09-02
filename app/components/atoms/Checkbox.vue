<template>
  <div :class="$style['checkbox']">
    <input :checked="checked" type="checkbox" :class="$style['checkbox__input']" tabindex="-1">
    <div :class="$style['checkbox__icon']">
      <IconCheck />
    </div>
  </div>
</template>
<script setup lang="ts">
import IconCheck from 'remixicon/icons/System/check-line.svg'

defineProps<{
  checked?: boolean
}>()
</script>
<style lang="scss" module>
.checkbox {
    background-color: var(--background-base);
    border: 1px solid var(--text-base);
    border-radius: var(--border-radius-s);
    display: inline-block;
    width: var(--spacing-xl);
    height: var(--spacing-xl);
    position: relative;

    &[disabled] {
        opacity: .5;
        pointer-events: none;
    }

    &:hover {
        background-color: var(--background-subtle);
    }

    &:has(:checked) {
        background-color: var(--primary-cta-base);
        border-color: var(--primary-cta-base);
        color: var(--background-base);
        .checkbox__icon {
            opacity: 1;
        }
    }

    &__input {
        border: 1px solid #f00;
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 1;
    }

    &__icon {
        opacity: 0;
    }
}
</style>
