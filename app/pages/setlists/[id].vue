<template>
  <ActionBar>
    <ActionButton color="cta" :icon="IconAdd" @click="showDialog = true">
      Toevoegen
    </ActionButton>
    <ActionButton color="filled" :icon="IconDelete" @click="deleteSelection()">
      Verwijderen
    </ActionButton>
    <ActionButton color="filled" :icon="IconShare">
      Delen
    </ActionButton>
  </ActionBar>
  <Dialog v-if="showDialog" @close="showDialog = false">
    <template #top>
      <IconAdd style="color: var(--folder-icon-fill)" />Song toevoegen
    </template>
    <Button v-for="song in songs" :key="song.id" @click="async () => { await addToList(list.id, song); await update(list.id) }">
      {{ song.name }}
    </Button>
  </Dialog>
  <div v-if="list">
    <h1>{{ list.name }}</h1><Button :icon="IconPencil" />

    <!-- <Form @submit.prevent="save">
      <TextInput v-model="list.name" full-width placeholder="Naam" @input="save" />
    </Form> -->

    <Table ref="table">
      <TableRow v-for="song in list.songs" :key="song.id">
        <TableCell>{{ song.name }}</TableCell>
        <TableCell end>
          <Button @click="async () => { await removeFromList(list.id, song); await update(list.id)}">
            Verwijder
          </Button>
        </TableCell>
      </TableRow>
    </Table>
  </div>
</template>
<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { useDebounceFn } from '@vueuse/core'
import IconPencil from 'remixicon/icons/Design/pencil-fill.svg'
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconShare from 'remixicon/icons/System/share-2-line.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'
const { get, addToList, removeFromList, edit } = useSetlists()
const { songs, getSongs } = useSongs()
const route = useRoute()
const list = ref()
const showDialog = ref(false)
const table = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (typeof route.params.id === 'string') {
    list.value = await get(route.params.id)
  }
  await getSongs()
  useSortable(table, list.value.songs, {
    animation: 250,
    forceFallback: true,
    onSort: async () => {
      await nextTick()
      await save()
    }
  })
})

const save = useDebounceFn(async () => {
  await edit({
    id: route.params.id,
    ...list.value
  })
}, 1000)

const update = async (listId: string) => {
  list.value = await get(listId)
}
</script>
