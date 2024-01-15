<template>
  <div :class="$style['wrapper']">
    <div :class="$style['wrapper__actions']">
      <ActionBar>
        <ActionButton color="cta" :icon="IconAdd">
          Toevoegen
        </ActionButton>
        <ActionButton color="filled" :icon="IconFolderAdd">
          Folder maken
        </ActionButton>
        <ActionButton color="filled" :icon="IconShare">
          Delen
        </ActionButton>
      </ActionBar>
    </div>
    <div :class="$style['wrapper__files']">
      <DropZone @update="onUpload" />
      <Card v-for="file in files">
        <template #media>
          <span class="fiv-viv" :class="`fiv-icon-pdf`" />
          <!-- <IconMv /> -->
        </template>
        <LabelGroup>
          <template #left-accessory>
            <IconFolder />
          </template>
          <Text ellipsis>
            {{ file.name }}
          </Text>
          <Text size="small" color="subtle">
            {{ file.fullPath }}
          </Text>
        </LabelGroup>
      </Card>
    </div>
  </div>
</template>
<script setup>
import { ref as fileRef, uploadBytes, listAll } from 'firebase/storage'
import IconFolder from 'remixicon/icons/Document/folder-fill.svg'
import IconFolderAdd from 'remixicon/icons/Document/folder-add-line.svg'
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconShare from 'remixicon/icons/System/share-2-line.svg'

const { $storage } = useNuxtApp()
const { user } = useAuth()
const files = ref([])

definePageMeta({
  requiresAuth: true
})

const listRef = fileRef($storage, `/${user.value.uid}/files/`)
const res = await listAll(listRef)

if (res) {
  files.value = res.items.map(item => {
    return {
      name: item.name,
      fullPath: item.fullPath
    }
  })
}

const onUpload = event => {
  const tempFileRef = fileRef($storage, `${user.value.uid}/files/${event.files[0].name}`)
  uploadBytes(tempFileRef, event.files[0]).then(snapshot => {
    console.log('uploaded', snapshot)
  })
}
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
        display: flex;
        flex-direction: row;
        gap: var(--spacing-l);
        height: 100%;
        flex: 1;
        position: relative;
    }
}
</style>
