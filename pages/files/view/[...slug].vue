<template>
  <div>
    <h1>File</h1>
    <iframe
      :src="`${url}`"
      style="width:100vw; height:100vh;"
      frameborder="0" />
  </div>
</template>
<script setup>
import { ref as fileRef, getDownloadURL } from 'firebase/storage'
definePageMeta({
  layout: 'viewer',
  requiresAuth: true
})
const { $storage } = useNuxtApp()
const { user } = useAuth()
const route = useRoute()
const file = fileRef($storage, `/${user.value.uid}/files/${route.params.slug}`)
const url = await getDownloadURL(file)

console.log(url)
</script>
