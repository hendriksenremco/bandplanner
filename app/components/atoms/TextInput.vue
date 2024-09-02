<template>
  <div
    :class="[
      $attrs.class,
      $style['text-input-container'],
      { [$style[`text-input-container--${color}`]]: !!color},
      { [$style['text-input-container--full-width']]: !!fullWidth}
    ]">
    <input
      :id="$attrs.id"
      ref="input"
      v-model="text"
      :class="$style['text-input']"
      :type="$attrs.type"
      :placeholder="$attrs.placeholder"
      @input="event => $emit('input', event)"
      @blur="event => $emit('blur', event)">
  </div>
</template>
<script setup lang="ts">
const text = defineModel()
const input = ref(null)
defineEmits(['blur', 'input'])
defineOptions({
  inheritAttrs: false
})

interface Props {
    color?: 'error',
    fullWidth?: boolean
}

defineProps<Props>()

</script>
<style module>
.text-input-container {
    border: 1px solid var(--border-subtle);
    border-radius: var(--border-radius-l);
    display: flex;
    align-items: center;
    height: var(--spacing-xxxl);
    padding: 0 var(--spacing-l);
    transition: all var(--duration-micro-fast) var(--easing-transition);

    &:focus-within {
        background-color: var(--background-raised);

    }

    &:hover:not(:focus-within) {
        border-color: var(--secondary-base);
    }
}
.text-input-container--error {
    border-color: var(--error-base);
}
.text-input-container--full-width {
    width: 100%;

}
.text-input {
    background-color: transparent;
    border: 0;
    color: var(--text-base);
    appearance: none;
    font-size: var(--font-size-large);
    height: var(--spacing-xl);
    flex: 1;

    &:focus {
        outline: none;
    }
}
</style>
