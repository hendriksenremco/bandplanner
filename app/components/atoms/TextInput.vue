<template>
  <div :class="[$attrs.class, $style['text-input-container']]">
    <input
      :id="$attrs.id"
      ref="input"
      v-model="text"
      :class="$style['text-input']"
      :type="$attrs.type"
      :placeholder="$attrs.placeholder">
  </div>
</template>
<script setup>
const text = defineModel()
const input = ref(null)
defineOptions({
  inheritAttrs: false
})

</script>
<style  module>
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
