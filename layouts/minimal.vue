<template>
  <div :class="$style['layout']">
    <header :class="$style['layout__header']">
      <Logo />
    </header>

    <main :class="$style['layout__main']">
      <div :class="$style['layout__wrapper']">
        <slot />
      </div>
    </main>
  </div>
</template>
<style lang="scss" module>
.layout {
    display: grid;
    grid-template-rows: auto 1fr;

    &__header {
        background-color: var(--background-subtle);
        // border-bottom: 1px solid var(--border-subtle);
        padding: 1rem;
    }

    &__main {
        padding: 1rem;
        padding-top: 7rem;

    }

    &__wrapper {
        max-width: 800px;
        margin: 0 auto;
    }
}
</style>
