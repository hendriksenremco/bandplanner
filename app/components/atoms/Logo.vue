<template>
  <NuxtLink :to="{path: '/'}" :class="$style['logo']">
    Band<span :class="$style['logo__part']">planner</span>
  </NuxtLink>
</template>
<style lang="scss" module>
.logo {
    color: var(--text-base);
    display: inline-flex;
    font-size: 1.5rem;
    font-weight: var(--font-weight-normal);

    &__part {
        color: var(--primary-cta-base);
        font-weight: var(--font-weight-bold);
    }
}
</style>
