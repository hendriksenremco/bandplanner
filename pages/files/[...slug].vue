<template>
  <div :class="$style['wrapper']">
    <Dialog v-if="showFolderDialog" @close="showFolderDialog = false">
      <template #top>
        <IconFolder style="color: var(--folder-icon-fill)" />Nieuwe folder
      </template>

      <form @submit.prevent="createFolder(folderName); showFolderDialog = false">
        <TextInput v-model="folderName" v-focus placeholder="Folder naam" />
      </form>
      <template #bottom>
        <Button @click="showFolderDialog = false">
          Annuleren
        </Button>
        <Button color="cta" @click="createFolder(folderName); showFolderDialog = false;">
          Maken
        </Button>
      </template>
    </Dialog>

    <div :class="$style['wrapper__actions']">
      <ActionBar>
        <ActionButton color="cta" :icon="IconAdd">
          Toevoegen
        </ActionButton>
        <ActionButton color="filled" :icon="IconFolderAdd" @click="showFolderDialog = true">
          Folder maken
        </ActionButton>
        <!-- <ActionButton color="filled" :icon="IconFileMove">
          Verplaatsen
        </ActionButton> -->
        <ActionButton :disabled="!selected.length" color="filled" :icon="IconDelete" @click="deleteItems()">
          Verwijderen
        </ActionButton>
        <!-- <ActionButton color="filled" :icon="IconShare">
          Delen
        </ActionButton> -->
      </ActionBar>
    </div>
    <div :class="$style['wrapper__files']">
      <Breadcrumbs />
      <h1>{{ currentFolder }}</h1>
      <FileGrid :name="currentFolder" @update="event => onUpload(event)">
        <FileCard
          v-for="file in files"
          :key="file.name"
          :name="file.type !=='file' ? file.name : null"
          :type="file.type"
          :title="file.name"
          :subtitle="file.fullPath"
          :selected="selected.includes(file)"
          :icon="getExtensionByFileName(file.name)"
          @click="selectFile(file)"
          @dblclick="goTo(file)">
          <template #icon>
            <span v-if="file.type === 'file'" class="fiv-viv" :class="`fiv-icon-${getExtensionByFileName(file.name)}`" />
            <IconFolder v-else />
          </template>
        </FileCard>
      </FileGrid>
    </div>
  </div>
</template>
<script setup>
import IconFolder from 'remixicon/icons/Document/folder-fill.svg'
import IconFolderAdd from 'remixicon/icons/Document/folder-add-line.svg'
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'

const router = useRouter()
const { onUpload, selectFile, getFiles, createFolder, deleteFiles, getExtensionByFileName, currentFolder, files, selected } = useFiles()
const { confirm } = useConfirm()
const showFolderDialog = ref(false)
const folderName = ref(null)

useHead({
  title: currentFolder.value
})
definePageMeta({
  requiresAuth: true
})

const deleteItems = async () => {
  if (await confirm('Weet je het zeker?')) {
    deleteFiles()
  }
}

const goTo = file => {
  const path = file.fullPath.substr(file.fullPath.indexOf('/'))
  router.push({ path })
}
onMounted(async () => {
  await getFiles()
})
</script>
  <style lang="scss" module>
  .wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
      height: 100%;

      &__actions {
          flex: 0;
      }

      &__files {
        height: 100%;
        // flex: 1;
      }
  }
  </style>
