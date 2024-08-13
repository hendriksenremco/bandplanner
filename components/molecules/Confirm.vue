<template>
  <Dialog v-if="shouldShow" @close="rejectFn">
    <template #top>
      {{ confirmText }}
    </template>

    <template #bottom>
      <Button @click="rejectFn">
        {{ rejectText }}
      </Button>
      <Button color="cta" @click="resolveFn">
        {{ resolveText }}
      </Button>
    </template>
  </Dialog>
</template>
<script setup>
const { confirmText, resolveText, rejectText, resolveFn, rejectFn, shouldShow } = useConfirm()
</script>
