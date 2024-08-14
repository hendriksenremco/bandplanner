<template>
  <div>Setlist</div>

  <div v-if="list">
    <h1>{{ list.name }}</h1>
    <Button v-for="song in songs" :key="song.id" @click="async () => { await addToList(list.id, song);await update(list.id) }">
      {{ song.name }}
    </Button>
    <Table>
      <TableRow v-for="song in list.songs">
        <TableCell>{{ song.name }}</TableCell>
        <TableCell>
          <Button @click="async () => { await removeFromList(list.id, song); await update(list.id)}">
            Verwijder
          </Button>
        </TableCell>
      </TableRow>
    </Table>
  </div>
</template>
<script setup lang="ts">
const { get, addToList, removeFromList } = useSetlists()
const { songs, getSongs } = useSongs()
const route = useRoute()
const list = ref()

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    list.value = await get(route.params.id)
  }
  await getSongs()
})

const update = async (listId: string) => {
  list.value = await get(listId)
}
</script>
