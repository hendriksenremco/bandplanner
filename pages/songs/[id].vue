<template>
  <div>
    <Button :to="{name: 'songs'}" :icon="IconBack">
      Back
    </Button>
    <h1>{{ song.name }}</h1>
    <FormLabel for="name">
      Naam
    </FormLabel>
    <TextInput id="name" v-model="song.name" placeholder="Naam" />

    <FormLabel for="tempo">
      Tempo
    </FormLabel>
    <TextInput id="tempo" v-model="song.tempo" placeholder="Tempo" />

    <FormLabel for="key">
      Toonsoort
    </FormLabel>
    <TextInput id="key" v-model="song.key" placeholder="Toonsoort" />

    <FormLabel for="signature">
      Maatsoort
    </FormLabel>
    <TextInput id="signature" v-model="song.signature" placeholder="Maatsoort" />

    <FormLabel for="difficulty">
      Moeilijkheid
    </FormLabel>
    <TextInput id="difficulty" v-model="song.difficulty" placeholder="Moeilijkheidsgraad van deze song" />

    <FormLabel for="labels">
      Labels
    </FormLabel>
    <TextInput id="labels" v-model="song.labels" placeholder="Voeg labels toe" />

    <Button size="big" color="cta">
      Opslaan
    </Button>
  </div>
</template>
<script setup>
import IconBack from 'remixicon/icons/Arrows/arrow-left-s-line.svg'
const route = useRoute()
const { getSong } = useSongs()

const song = await getSong(route.params.id)
</script>
