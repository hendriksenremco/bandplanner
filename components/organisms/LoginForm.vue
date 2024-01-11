<template>
  <form :class="$style['login-form']" @submit.prevent="submit">
    <div :class="$style['login-form__row']">
      <FormLabel for="email">
        E-mailadres
      </FormLabel>
      <TextInput id="email" v-model="email" type="email" />
    </div>

    <div :class="$style['login-form__row']">
      <FormLabel for="password">
        Wachtwoord
      </FormLabel>
      <TextInput id="password" v-model="password" type="password" />
    </div>
    <div :class="$style['login-form__row']">
      <Button size="big" type="submit" color="cta" text-color="white">
        Inloggen
      </Button>
    </div>
  </form>
</template>
<script setup>
const { user, login } = useAuth()
const email = ref(null)
const password = ref(null)

const submit = async () => {
  login(email.value, password.value)
}
</script>
<style lang="scss" module>
  .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
  }
  </style>
