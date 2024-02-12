<template>
  <nav :class="$style['breadcrumbs']">
    <NuxtLink v-if="route.params.slug" :class="$style['breadcrumbs__link']" :to="{path: rootRoute.path}">
      <span :class="$style['breadcrumbs__name']">Bestanden</span>
    </NuxtLink>
    <NuxtLink v-for="item in items" :key="item.name" :class="$style['breadcrumbs__link']" :to="{path: item.link}">
      / <span :class="$style['breadcrumbs__name']">{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>
<script setup>
const route = useRoute()
const { resolve } = useRouter()

const rootRoute = resolve({ name: 'files-slug' })

const items = computed(() => {
  if (!route.params.slug) { return }

  return route.params.slug
    .filter((item, index) => {
      return index < route.params.slug.length - 1
    })
    .map((item, index) => {
      const link = route.params.slug.slice(0, index + 1)
      return {
        name: item,
        link: `${rootRoute.path}/${link.join('/')}`
      }
    })
})

</script>
<style lang="scss" module>
.breadcrumbs {
    display: flex;
    align-items: center;
    gap:  var(--spacing);

    &__link {
        color: var(--text-subtle);
        display: inline-flex;
        gap: var(--spacing);

        &:hover .breadcrumbs__name{
            color: var(--text-base);
            text-decoration: underline;
        }
    }
}
</style>
