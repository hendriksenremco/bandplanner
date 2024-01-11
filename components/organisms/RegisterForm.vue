<template>
  <form :class="$style['register-form']" @submit.prevent="submit">
    {{ user }}
    <div :class="$style['register-form__row']">
      <FormLabel for="email">
        E-mailadres
      </FormLabel>
      <TextInput id="email" v-model="email" type="email" />
    </div>
    <div :class="$style['register-form__row']">
      <FormLabel for="name">
        Volledige naam
      </FormLabel>
      <TextInput id="name" v-model="name" type="text" />
    </div>
    <div :class="$style['register-form__row']">
      <FormLabel for="password">
        Wachtwoord
      </FormLabel>
      <TextInput id="password" v-model="password" type="password" />
    </div>
    <div :class="$style['register-form__row']">
      <Button size="big" type="submit" color="cta" text-color="white">
        Volgende
      </Button>
    </div>
  </form>
</template>
<script setup>
const { user, register } = useAuth()
const email = ref(null)
const password = ref(null)
const name = ref(null)

const submit = async () => {
  await register(email.value, password.value)
}
</script>
<style lang="scss" module>
.register-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
}
</style>
