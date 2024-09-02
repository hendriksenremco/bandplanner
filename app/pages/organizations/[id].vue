<template>
  <ActionBar>
    <ActionButton color="cta" :icon="IconAdd" @click="showDialog = true">
      Toevoegen
    </ActionButton>
    <ActionButton color="filled" :icon="IconDelete" @click="deleteSelection()">
      Verwijderen
    </ActionButton>
    <ActionButton color="filled" :icon="IconShare">
      Uitnodigen
    </ActionButton>
  </ActionBar>

  <Form @submit.prevent="save">
    <div>
      <FormLabel for="name">
        Naam
      </FormLabel>
      <TextInput id="name" v-model="organization.name" placeholder="Naam" />
    </div>

    <Button size="big" color="cta" type="submit">
      Opslaan
    </Button>
  </Form>
</template>
<script setup>
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconShare from 'remixicon/icons/System/share-2-line.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'
const { get, edit } = useOrganization()
const route = useRoute()
const organization = ref()

organization.value = await get(route.params.id)
const save = async () => {
  await edit({
    id: route.params.id,
    ...organization.value
  })
}
</script>
