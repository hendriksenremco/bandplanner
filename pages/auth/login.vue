<template>
  <div :class="$style['login']">
    <Button :icon="iconBack" :class="$style['login__back']">
      Terug
    </Button>
    <h1>Inloggen</h1>
    <LoginForm :class="$style['login__form']" />
  </div>
</template>
<script setup>
import iconBack from 'remixicon/icons/Arrows/arrow-left-line.svg'
definePageMeta({
  layout: 'minimal'
})
</script>
  <style lang="scss" module>
  .login {
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
