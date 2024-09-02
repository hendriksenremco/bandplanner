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
      <TextInput id="password" v-model="password" type="password" :color="!!error ? 'error' : null" />
      <FormLabel color="error">
        {{ error }}
      </FormLabel>
    </div>
    <div :class="$style['login-form__row']">
      <Button size="big" type="submit" color="cta" text-color="white">
        Inloggen
      </Button>
    </div>
  </form>

  <Button v-if="user" @click="logout">
    Uitloggen
  </Button>
</template>
<script setup>

import messages from '~/assets/messages'

const { user, login, logout } = useAuth()
const email = ref('remco@remcohendriksen.nl')
const password = ref('12345678')
const error = ref(null)
const route = useRoute()
const router = useRouter()

const submit = async () => {
  try {
    await login(email.value, password.value)
    router.push({ path: route.query.redirect || '/' })
  } catch (e) {
    error.value = messages[e.message] || e.message
  }
}
</script>
<style lang="scss" module>
  .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
  }
  </style>
