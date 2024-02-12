<template>
  <div :class="$style['layout']">
    <div :class="$style['layout__form']">
      <Button :to="{name: 'songs'}" :icon="IconBack">
        Back
      </Button>
      <h1>{{ song.name }}</h1>
      <FormLabel for="name">
        Naam
      </FormLabel>
      <TextInput id="name" v-model="song.name" placeholder="Naam" />

      <FormLabel for="labels">
        Labels
      </FormLabel>
      <TextInput id="labels" v-model="song.labels" placeholder="Voeg labels toe" />

      <Button size="big" color="cta">
        Opslaan
      </Button>
    </div>
    <div :class="$style['layout__extra']">
      <h3>Bladmuziek</h3>
      <Button :icon="IconAdd">
        Toevoegen
      </Button>

      <h3>Audio</h3>
      <Button :icon="IconAdd">
        Toevoegen
      </Button>
    </div>
  </div>
</template>
<script setup>
import IconBack from 'remixicon/icons/Arrows/arrow-left-s-line.svg'
import IconAdd from 'remixicon/icons/System/add-fill.svg'
const route = useRoute()
const { getSong } = useSongs()

const song = await getSong(route.params.id)
</script>
<style lang="scss" module>
.layout {
    display: grid;
    grid-template-areas: 'main extra';
    grid-template-columns: 1fr 400px;
    grid-gap: var(--spacing-xxl);

    @media screen and (max-width: 1024px) {
        grid-template-areas:
        'main'
        'extra';
        grid-template-columns: auto;
        grid-template-rows: 1fr;
    }
}
</style>
