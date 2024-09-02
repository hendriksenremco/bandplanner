<template>
  <div :class="$style['table']">
    <slot />
  </div>
</template>
<style lang="scss" module>
.table {
border-collapse: collapse;
display: table;
width: 100%;
}
</style>
