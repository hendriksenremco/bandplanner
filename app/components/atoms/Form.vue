<template>
  <form :class="$style['form']">
    <slot />
  </form>
</template>
<style module>
.form {

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-l);
    width: 100%;
}
</style>
