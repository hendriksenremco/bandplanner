<template>
  <div ref="wrapper" :class="$style['menu']">
    <IconButton ref="button" color="filled" :icon="IconDropDown" @click="toggle" />
  </div>
  <Teleport v-if="show" to="body">
    <menu ref="menu" :class="$style['menu-overlay']">
      <slot />
    </menu>
  </Teleport>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import IconDropDown from 'remixicon/icons/Arrows/arrow-down-s-line.svg'
const show = ref(false)
const x = ref(null)
const y = ref(null)
const button = ref(null)
const menu = ref(null)
const wrapper = ref(null)

const toggle = async () => {
  show.value = !show.value
  if (!show.value) { return }

  await nextTick()
  const buttonRect = button.value.$el.getBoundingClientRect()
  const menuRect = menu.value.getBoundingClientRect()
  x.value = buttonRect.right - menuRect.width
  y.value = buttonRect.bottom + 4
}

onClickOutside(wrapper, () => { show.value = false })
</script>
<style module>
.menu {
    display: inline-flex;
}
.menu-overlay {
    background-color: var(--background-raised);
    box-shadow: var(--box-shadow-elevation-1);
    outline: 1px solid var(--border-subtle);
    position: absolute;
    top: 0px;
    left: 0px;
    min-width: 90px;
    transform: translate3d(v-bind(`${x}px`), v-bind(`${y}px`), 0);
    z-index: 10;
}
</style>
