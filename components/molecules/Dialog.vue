<template>
  <Teleport to="body">
    <div :class="$style['dialog']">
      <div :class="$style['dialog__bg']" @click="$emit('close')" />
      <div :class="$style['dialog__wrapper']">
        <div :class="$style['dialog__top']">
          <slot name="top" />
          <IconButton :class="$style['dialog__close']" color="transparent" :icon="IconClose" @click="$emit('close')" />
        </div>
        <div :class="$style['dialog__content']">
          <slot />
        </div>
        <div :class="$style['dialog__bottom']">
          <slot name="bottom" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import IconClose from 'remixicon/icons/System/close-fill.svg'
defineEmits(['close', 'submit'])
</script>
<style lang="scss" module>
.dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;

    &__bg {
        background-color: var(--curtain);
        backdrop-filter: blur(0px);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
    }

    &__wrapper {
        background-color: var(--background-base);
        border: 0;
        box-shadow: --box-shadow-elevation-1;
        color: var(--text-base);
        display: flex;
        flex-direction: column;
        min-width: 20rem;
        min-height: 10rem;
        position: relative;
        z-index: 2;
    }

    &__top {
        border-bottom: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        font-size: var(--font-size-large);
        gap: 1rem;
        padding: 1rem;

        svg {
            height: 2rem;
            width: 2rem;
        }
    }

    &__content {
        color: var(--text-base);
        padding: 1rem;
    }

    &__bottom {
        justify-content: flex-end;
        display: flex;
        padding: 1rem;
        padding-top: 0;
        gap: .5rem;
    }

    &__close {
        margin-left: auto;

        svg {
            width: 1rem;
        }
    }
}
</style>
