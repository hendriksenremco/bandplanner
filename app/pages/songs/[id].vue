<template>
  <div :class="$style['layout']">
    <div :class="$style['layout__form']">
      <Button :to="{name: 'songs'}" :icon="IconBack">
        Back
      </Button>
      <h1>{{ song.name }}</h1>
      <form :class="$style['form']" @submit.prevent="save">
        <div>
          <FormLabel for="name">
            Naam
          </FormLabel>
          <TextInput id="name" v-model="song.name" placeholder="Naam" />
        </div>
        <div>
          <FormLabel for="labels">
            Labels
          </FormLabel>
          <TextInput id="labels" v-model="song.labels" placeholder="Voeg labels toe" />
        </div>
        <Button size="big" color="cta" :class="$style['form-submit']" type="submit">
          Opslaan
        </Button>
      </form>
    </div>
    <div :class="$style['layout__extra']">
      <h3>Bladmuziek</h3>
      <FileGrid :empty="!sheetMusic?.length" @update="event => addAttachment(event, `${song.id}/sheetmusic`)">
        <Table v-if="sheetMusic?.length">
          <tbody>
            <TableRow
              v-for="sheetFile in sheetMusic"
              :key="sheetFile.fullPath">
              <TableCell>{{ sheetFile.name }}</TableCell>

              <TableCell small>
                <IconButton :icon="IconDelete" color="transparent" @click="deleteAttachment(sheetFile)" />
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </FileGrid>

      <h3>Audio</h3>
      <FileGrid :empty="!audio?.length" @update="event => addAttachment(event, `${song.id}/audio`)">
        <Table v-if="audio?.length">
          <tbody>
            <TableRow
              v-for="audioFile in audio"
              :key="audioFile.fullPath">
              <TableCell @click="playAudio(audioFile.name, audioFile.fullPath)">
                {{ audioFile.name }}
              </TableCell>

              <TableCell small>
                <IconButton :icon="IconDelete" color="transparent" @click="deleteAttachment(audioFile)" />
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </FileGrid>
    </div>
  </div>
</template>
<script setup>
import IconBack from 'remixicon/icons/Arrows/arrow-left-s-line.svg'
import IconDelete from 'remixicon/icons/System/delete-bin-2-line.svg'

const route = useRoute()
const { getSong, getAttachments, editSong, addFile } = useSongs()
const { deleteFile, getUrl } = useFiles()
const { confirm } = useConfirm()
const { play } = useAudioPlayer()

const sheetMusic = ref()
const audio = ref()
const song = await getSong(route.params.id)

const fetchAttachments = async () => {
  sheetMusic.value = await getAttachments(route.params.id, 'sheetmusic')
  audio.value = await getAttachments(route.params.id, 'audio')
}

const addAttachment = async (event, path) => {
  await addFile(event, path)
  await fetchAttachments()
}

const deleteAttachment = async file => {
  if (await confirm('Deze file verwijderen?', { resolveButtonText: 'Ja,verwijder', rejectButtonText: 'Nee' })) {
    await deleteFile(file.parent.fullPath, file.name)
    await fetchAttachments()
  }
}

const save = async () => {
  await editSong({
    id: route.params.id,
    ...song.value
  })
}

const playAudio = async (fileName, filePath) => {
  const fullPath = await getUrl(filePath)
  if (fullPath) {
    play(fileName, fullPath)
  }
}

onMounted(async () => {
  await fetchAttachments()
})
</script>
<style lang="scss" module>
.layout {
    display: grid;
    grid-template-areas: 'main extra';
    grid-template-columns: 1fr 400px;
    grid-gap: var(--spacing-xxl);
    height: 100%;

    @media screen and (max-width: 1024px) {
        grid-template-areas:
        'main'
        'extra';
        grid-template-columns: auto;
        grid-template-rows: 1fr;
    }

    &__extra {
        background-color: var(--secondary-surface);
        box-shadow: var(--box-shadow-elevation-1);
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
        padding: var(--spacing-xl);
        justify-content: space-between;
        place-content: flex-start;
        height: auto;
    }
}

.form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    width: 100%;
    max-width: 30rem;
}

.form-submit {
    max-width: 10rem;
}
</style>
