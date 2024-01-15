<template>
  <div :class="$style['topbar']">
    <div :class="$style['topbar__search']">
      <IconButton :class="$style['topbar__nav-button']" :icon="IconMenu" color="transparent" @click="toggleSidebar" />
      <TextInput :class="$style['topbar__search__input']" placeholder="Search for people, keywords or tags" />
    </div>
    <div :class="$style['topbar__actions']">
      <SplitButton>
        <template #first>
          <Button color="transparent">
            Harmonie Wierden
          </Button>
        </template>
        <template #second>
          <Menu>
            <List>
              <ListItem>Test</ListItem>
              <ListItem>Test</ListItem>
              <ListItem>Test</ListItem>
              <ListItem>Test</ListItem>
            </List>
          </Menu>
        </template>
      </SplitButton>
      <Menu>
        <template #icon>
          <IconButton color="transparent">
            <Avatar src="https://picsum.photos/200" />
          </IconButton>
        </template>
        <List>
          <ListItem>Profiel</ListItem>
          <ListItem>Instellingen</ListItem>
          <ListItem>Uitloggen</ListItem>
        </List>
      </Menu>
    </div>
  </div>
</template>
<script setup>
import IconMenu from 'remixicon/icons/System/menu-fill.svg'

const { toggleSidebar } = useLayout()
</script>
<style lang="scss" module>
.topbar {
    display: flex;
    width: 100%;

    &__nav-button {
        --icon-size: 18px;
        @media screen and (min-width: 800px) {
            display: none;
        }
    }
}
.topbar__search {
    align-items: center;
    display: flex;
    gap: var(--spacing);
    width: 100%;
}
.topbar__search__input {
    max-width: 520px;
    flex: 1;
}
.topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
}
</style>
