<template>
  <div>
    <ActionBar>
      <ActionButton color="cta" :icon="IconAdd" @click="showDialog = true">
        Toevoegen
      </ActionButton>
      <ActionButton color="filled" :icon="IconDelete" @click="deleteSelection()">
        Verwijderen
      </ActionButton>
    </ActionBar>

    <Dialog v-if="showDialog" @close="showDialog = false">
      <template #top>
        <IconAdd style="color: var(--folder-icon-fill)" />Nieuwe setlijst toevoegen
      </template>

      <form @submit.prevent="addSetlist(); showDialog = false">
        <TextInput v-model="name" v-focus placeholder="Naam setlijst" />
      </form>
      <template #bottom>
        <Button @click="showDialog = false">
          Annuleren
        </Button>
        <Button color="cta" @click="addSetlist(); showDialog = false">
          Maken
        </Button>
      </template>
    </Dialog>

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
        <TableRow v-for="list in lists" :key="list.id" :selected="selected.includes(list.id)" @dblclick="goto(list.id)" @click.stop="toggleElement(list.id, true)">
          <TableCell small>
            <Checkbox :checked="selected.includes(list.id)" @click.stop="toggleElement(list.id)" />
          </TableCell>
          <TableCell>
            {{ list.name }}
          </TableCell>
          <TableCell>
            {{ list.updatedAt.toDate().toLocaleString() }}
          </TableCell>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconShare from 'remixicon/icons/System/share-2-line.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'

const router = useRouter()
const showDialog: Ref<boolean> = ref(false)
const name: Ref<string | undefined> = ref()
const selected: Ref<Array<string>> = ref([])

const { add, remove, lists, getAll } = useSetlists()

const addSetlist = async () => {
  await add({ name: name.value } as SetlistItem)
  await getAll()
}

const goto = id => {
  router.push({ name: 'setlists-id', params: { id } })
}

const toggleElement = (id: string, single:boolean = false) => {
  if (single) {
    selected.value = [id]
    return
  }
  selected.value = selected.value.includes(id) ? selected.value.filter((item: string) => item !== id) : [...selected.value, id]
}

const deleteSelection = async () => {
  const jobs: Array<any> = []
  selected.value.forEach((id: string) => {
    jobs.push(remove(id))
  })
  await Promise.all(jobs)
  await getAll()
  selected.value = []
}

await getAll()
</script>
