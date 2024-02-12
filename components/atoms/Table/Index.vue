<template>
  <table :class="$style['table']">
    <slot />
  </table>
</template>
<style lang="scss" module>
.table {
border-collapse: collapse;
width: 100%;
}
</style>
