<template>
  <NuxtLayout>
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
