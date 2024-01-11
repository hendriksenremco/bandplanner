<template>
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

  <h1>Home</h1>
  <Card>
    <template #media>
      <IconMv />
    </template>
    <LabelGroup>
      <template #left-accessory>
        <IconFolder />
      </template>
      <Text ellipsis>
        Flight of the bumblebee
      </Text>
      <Text size="small" color="subtle">
        Folder &bull; 6 items
      </Text>
    </LabelGroup>
  </Card>
</template>
<script setup>
import IconMv from 'remixicon/icons/Media/mv-fill.svg'
import IconFolder from 'remixicon/icons/Document/folder-fill.svg'
import IconFolderAdd from 'remixicon/icons/Document/folder-add-line.svg'
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconShare from 'remixicon/icons/System/share-2-line.svg'

</script>
