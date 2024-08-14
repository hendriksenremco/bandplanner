<template>
  <div :class="$style['topbar']">
    <div :class="$style['topbar__search']">
      <IconButton :class="$style['topbar__nav-button']" :icon="IconMenu" color="transparent" @click="toggleSidebar" />
      <!-- <TextInput :class="$style['topbar__search__input']" placeholder="Search for people, keywords or tags" /> -->
    </div>
    <div :class="$style['topbar__actions']">
      <SplitButton>
        <template #first>
          <Button color="transparent">
            Hengelose Revue
          </Button>
        </template>
        <template #second>
          <Menu>
            <List>
              <ListItem>
                <NavigationLink label="Vereniging X" />
              </ListItem>
              <ListItem>
                <Button color="transparent" :icon="IconAdd">
                  Vereniging toevoegen
                </Button>
              </ListItem>
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
          <ListItem><NavigationLink label="Profiel" /></ListItem>
          <ListItem><NavigationLink label="Instellingen" /></ListItem>
          <ListItem><NavigationLink label="Uitloggen" @click="logout" /></ListItem>
        </List>
      </Menu>
    </div>
  </div>
</template>
<script setup>
import IconAdd from 'remixicon/icons/System/add-fill.svg'
import IconMenu from 'remixicon/icons/System/menu-fill.svg'
const { toggleSidebar } = useLayout()
const { logout } = useAuth()
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
    width: 100%;
    flex: 1;
}
.topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
}
</style>
