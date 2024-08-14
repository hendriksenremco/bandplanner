<template>
  <div :class="$style['register']">
    <Button :icon="iconBack" :class="$style['register__back']">
      Terug
    </Button>
    <h1>Registreer je gratis</h1>
    <RegisterForm :class="$style['register__form']" />
  </div>
</template>
<script setup>
import iconBack from 'remixicon/icons/Arrows/arrow-left-line.svg'
definePageMeta({
  layout: 'minimal'
})
</script>
<style lang="scss" module>
.register {
    max-width: 400px;
    margin: 0 auto;

    &__form {
        margin-top: var(--spacing-xl)
    }

    &__back {
        margin-bottom: var(--spacing-xxl);
    }
}
</style>
