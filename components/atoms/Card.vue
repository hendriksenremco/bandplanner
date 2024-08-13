<template>
  <div
    :class="[
      $style['card'],
      {[$style[`card--${border}`]]: border}
    ]">
    <div v-if="$slots.media" :class="$style['card__media']">
      <slot name="media" />
    </div>
    <div :class="$style['card__content']">
      <slot />
    </div>
  </div>
</template>
<script setup>
defineProps({
  border: {
    type: String,
    default: null
  }
})
</script>
<style lang="scss" module>
.card {
    --background-color: var(--background-subtle);

    outline: 2px solid transparent;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 100%;

    * {
        pointer-events: none;
    }

    &:hover {
        --background-color: var(--background-raised)
    }

    &--dotted {
        outline-style: dotted;
        outline-color: var(--primary-cta-base);
    }
    &--solid {
        outline-color: var(--primary-cta-base);
    }

    &__content {

        display: flex;
        align-items: center;
        padding-top: var(--spacing);
        height: var(--spacing-xxxxl);
    }

    &__media {
        aspect-ratio: 1 / 1;
        border-radius: var(--border-radius-l);
        align-items: center;
        justify-content: center;
        display: flex;
        background-color: var(--background-color);
        padding: var(--spacing-xxxl);
        width: 100%;

        :global(.fiv-viv) {
            width: 100%;
            height: 100%;
            max-width: 100%;
            position: relative;
        }
        svg {
             width: 100%;
             height: 100%;
             stroke-width: 1;
             position: relative;
        }

        path {
            fill: var(--folder-icon-fill);
        }
    }
}

</style>
