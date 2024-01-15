<template>
  <div :class="$style['card']">
    <div v-if="$slots.media" :class="$style['card__media']">
      <slot name="media" />
    </div>
    <div :class="$style['card__content']">
      <slot />
    </div>
  </div>
</template>

<style  module>
.card {
    --background-color: var(--background-subtle);
    cursor: pointer;
    max-width: 200px;

    &:hover {
        --background-color: var(--background-raised)
    }
}

    .card__content {
        display: flex;
        align-items: center;
        padding-top: var(--spacing);
        height: var(--spacing-xxxxl);
    }

    .card__media {
        aspect-ratio: 1 / 1;
        object-fit: cover;
        align-items: center;
        justify-content: center;
        display: flex;
        background-color: var(--background-color);
        padding: var(--spacing-xl);

        :global(.fiv-viv) {
            width: 100%;
            height: 100%;
        }
        svg {
             width: 100%;
             height: 100%;
             stroke-width: 1;
        }

        path {
            fill: var(--folder-icon-fill);
        }
    }

</style>
