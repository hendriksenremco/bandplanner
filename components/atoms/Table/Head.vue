<template>
  <th :class="$style['table-head']">
    <div><slot /></div>
  </th>
</template>
<style lang="scss" module>
.table-head {
    div {
        display: flex;
        align-items: center;
        min-height: var(--spacing-xxxxl);
        padding-left: var(--spacing-l);
    }
}
</style>
