<template>
  <div :class="$style['layout']">
    <header :class="$style['layout__header']">
      <TopBar />
    </header>
    <aside
      ref="aside"
      :class="[
        $style['layout__aside'],
        {[$style['layout__aside--mobile-show']]: sidebarShouldShow},
      ]">
      <div :class="$style['layout__aside__logo']">
        <Logo />
      </div>
      <Navigation />
      <Resizer />
    </aside>
    <main :class="$style['layout__main']">
      <div :class="$style['layout__wrapper']">
        <slot />
      </div>
    </main>
    <footer v-if="audioPlayerShouldShow" :class="$style['layout__footer']">
      <AudioPlayer v-if="audioPlayerShouldShow" :src="file" :title="fileName" />
      <IconButton :icon="IconClose" @click="close" />
    </footer>
  </div>
</template>
<script setup>
import IconClose from 'remixicon/icons/System/close-fill.svg'
const { cursorType } = useLayout()
const { sidebarShouldShow } = useLayout()
const { audioPlayerShouldShow, file, fileName, close } = useAudioPlayer()
const { width, setTarget } = useResizer()
const sidebarWidth = computed(() => `${width.value}px`)
const aside = ref(null)

onMounted(() => {
  setTarget(aside.value)
})
</script>
<style  lang="scss" module>
.layout {
    cursor: v-bind(cursorType);
    display: grid;
    grid-template-columns: v-bind(sidebarWidth) 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        'left-nav top-bar'
        'left-nav main'
        'left-nav footer';
    height: 100dvh;
    max-height: 100dvh;

    @media screen and (max-width: 800px) {
        grid-template-columns: auto auto;
        grid-template-areas:
        'top-bar top-bar'
        'main main'
        'footer footer';
    }

    &__header {
        background-color: var(--background-base);
        grid-area: top-bar;
        display: flex;
        align-items: center;
        padding: 1rem 2rem;

        @media screen and (max-width: 800px) {
            padding: .5rem;
            z-index: 10;
        }
    }

    &__aside {
        background-color: var(--background-subtle);
        border-right: 1px solid var(--border-subtle);
        grid-area: left-nav;
        position: relative;

        @media screen and (max-width: 800px) {
            box-shadow: var(--box-shadow-elevation-1);
            padding-top: var(--spacing-xxxxl);
            position: absolute;
            left: 0;
            width: 240px;
            height: 100%;
            z-index: 3;
            transform: translateX(-100%);
            transition: transform var(--duration-micro-normal) var(--easing-transition);
        }

        &__logo {
            display: flex;
            align-items: center;
            height: 82px;
            padding: 0 var(--spacing-l);

        }

        &--mobile-show {
            transform: translateX(0)
        }
    }

    &__main {
        grid-area: main;
        overflow-y: auto;
        height: 100%;

        padding: 0 2rem;

        @media screen and (max-width: 800px) {
            padding: 0 1rem;
        }
    }

    &__footer {
        background-color: var(--secondary-surface);
        color: var(--secondary-on-surface);
        box-shadow: var(--box-shadow-elevation-1);
        display: flex;
        gap: var(--spacing-l);
        align-items: center;
        grid-area: footer;
        width: 100%;
        padding: 1rem;

    }

    &__wrapper {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
}

</style>
