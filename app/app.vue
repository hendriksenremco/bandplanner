<template>
  <NuxtLayout>
    <Confirm />
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>

useHead({
  titleTemplate: titleChunk => titleChunk ? `${titleChunk} - Bandplanner` : 'Bandplanner'
})
</script>
<style module>
@import url("~/css/main.css");
</style>
