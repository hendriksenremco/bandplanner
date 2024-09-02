<template>
  <ActionBar>
    <ActionButton color="cta" :icon="IconAdd" @click="showDialog = true">
      Toevoegen
    </ActionButton>
    <ActionButton color="filled" :icon="IconDelete" :disabled="!selected.length" @click="deleteSelection()">
      Verwijderen
    </ActionButton>
  </ActionBar>
  <h1>Organization</h1>

  <Dialog v-if="showDialog" @close="showDialog = false">
    <template #top>
      <IconAdd style="color: var(--folder-icon-fill)" />Nieuwe band toevoegen
    </template>

    <form @submit.prevent="addOrganization(); showDialog = false">
      <TextInput v-model="name" v-focus placeholder="Naam band" />
    </form>
    <template #bottom>
      <Button @click="showDialog = false">
        Annuleren
      </Button>
      <Button color="cta" @click="addOrganization(); showDialog = false">
        Maken
      </Button>
    </template>
  </Dialog>

  <Table>
    <thead>
      <TableRow head>
        <TableHead>
          Naam
        </TableHead>
        <TableHead>
          Aangepast
        </TableHead>
      </TableRow>
    </thead>
    <tbody>
      <TableRow v-for="organization in organizations" :key="organization.id" :selected="selected.includes(organization.id)" @click="goto(organization.id)">
        <TableCell>
          {{ organization.name }}
        </TableCell>
        <TableCell>
          {{ organization.updatedAt.toDate().toLocaleString() }}
        </TableCell>
      </TableRow>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'
const router = useRouter()
const { organizations, organizationId, getAll, add, remove } = useOrganization()
const showDialog = ref(false)
const name = ref()
const selected: Ref<Array<string>> = ref([])

const addOrganization = async () => {
  await add({ name: name.value } as OrganizationItem)
  await getAll()
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

const goto = id => {
  router.push({ name: 'organizations-id', params: { id } })
}

onMounted(async () => {
  await getAll()
})
await getAll()
</script>
