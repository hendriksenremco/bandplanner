<template>
  <div :class="$style['layout']">
    <Dialog v-if="showSongDialog" @close="showSongDialog = false">
      <template #top>
        <IconAdd style="color: var(--folder-icon-fill)" />Nieuwe song
      </template>

      <form @submit.prevent="addSong({name: songName}); showSongDialog = false">
        <TextInput v-model="songName" v-focus placeholder="Song naam" />
      </form>
      <template #bottom>
        <Button @click="showSongDialog = false">
          Annuleren
        </Button>
        <Button color="cta" @click="addSong({name: songName}); showSongDialog = false">
          Maken
        </Button>
      </template>
    </Dialog>

    <ActionBar>
      <ActionButton color="cta" :icon="IconAdd" @click="showSongDialog = true">
        Toevoegen
      </ActionButton>
      <ActionButton color="filled" :icon="IconDelete" :disabled="!selected.length" @click="deleteSelection">
        Verwijderen
      </ActionButton>
      <ActionButton color="filled" :icon="IconShare">
        Delen
      </ActionButton>
    </ActionBar>

    <div>
      <h1>Repertoire</h1>

      <Table>
        <thead>
          <TableRow head>
            <TableHead small />
            <TableHead>
              Naam
            </TableHead>
            <TableHead>
              Aangepast
            </TableHead>
          </TableRow>
        </thead>
        <tbody>
          <TableRow v-for="song in songs" :key="song.id" :selected="selected.includes(song.id)" @click="goto(song.id)">
            <TableCell small>
              <Checkbox :checked="selected.includes(song.id)" @click.stop="toggleElement(song.id)" />
            </TableCell>
            <TableCell>
              {{ song.name }}
            </TableCell>
            <TableCell>
              {{ song.updatedAt.toDate().toLocaleString() }}
            </TableCell>
          </TableRow>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconShare from 'remixicon/icons/System/share-2-line.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'

definePageMeta({
  requiresAuth: true
})

const { addSong, deleteSong, getSongs, songs } = useSongs()
const router = useRouter()

const showSongDialog = ref(false)
const selected = ref([])
const songName = ref(null)
await getSongs()

const toggleElement = (id, single = false) => {
  if (single) {
    selected.value = [id]
    return
  }
  selected.value = selected.value.includes(id) ? selected.value.filter(item => item !== id) : [...selected.value, id]
}

const deleteSelection = async () => {
  const jobs = []
  selected.value.forEach(id => {
    jobs.push(deleteSong(id))
  })
  await Promise.all(jobs)
  await getSongs()
}

const goto = id => {
  router.push({ name: 'songs-id', params: { id } })
}

</script>
<style module>
.layout {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}
</style>
