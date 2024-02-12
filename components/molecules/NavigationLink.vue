<template>
  <component :is="to ? nuxtLink : 'div'" :class="$style['navigation-link']" :to="to">
    <component :is="{...icon}" v-if="icon" :class="$style['navigation-link__icon']" />
    <Text color="inherit">
      {{ label }}
    </Text>
  </component>
</template>
<script setup lang="ts">
import type { NuxtLinkProps } from 'nuxt/app'
const nuxtLink = resolveComponent('nuxtLink')
defineProps<{
    label: String
    to?: NuxtLinkProps
    icon: typeof defineNuxtComponent
}>()

</script>
<style lang="scss" module>
.navigation-link {
    align-items: center;
    color: var(--text-subtle);
    cursor: pointer;
    display: flex;
    gap: var(--spacing-m);
    height: auto;
    padding: var(--spacing) var(--spacing-l);
    width: 100%;

    &:hover {
        color: var(--text-base);
    }

    :global(&.router-link-active) {
        color: var(--text-base);
    }

    &__icon {
        height: var(--spacing-l);
        width: var(--spacing-l);
        stroke-width: 1.5
    }
}
</style>
