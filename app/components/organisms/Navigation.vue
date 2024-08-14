<template>
  <nav>
    <List>
      <ListItem v-for="item in items" :key="item.label">
        <NavigationLink :to="item.to" :label="item.label" :icon="item.icon" />
      </ListItem>
    </List>
  </nav>
</template>

<script setup>
import IconList from 'remixicon/icons/Editor/list-ordered-2.svg'
import IconFolder from 'remixicon/icons/Document/folder-line.svg'
import IconMusic from 'remixicon/icons/Media/music-2-line.svg'
import IconCalendar from 'remixicon/icons/Business/calendar-schedule-line.svg'
import IconDashboard from 'remixicon/icons/System/dashboard-line.svg'
import IconSettings from 'remixicon/icons/System/settings-4-line.svg'
import IconFlask from 'remixicon/icons/Health & Medical/flask-line.svg'

const items = reactive([
  {
    label: 'Dashboard',
    icon: IconDashboard,
    to: {
      name: 'index'
    }
  },
  {
    label: 'Repertoire',
    icon: IconMusic,
    to: {
      name: 'songs'
    }
  },
  {
    label: 'Setlijsten',
    icon: IconList,
    to: {
      name: 'setlists'
    }
  },
  {
    label: 'Bestanden',
    icon: IconFolder,
    to: {
      name: 'files-slug'
    }
  },
  //   {
  //     label: 'Planning',
  //     icon: IconCalendar,
  //     to: {
  //       name: 'planning'
  //     }
  //   },
  {
    label: 'Instellingen',
    icon: IconSettings,
    to: {
      name: 'settings'
    }
  },
  {
    label: 'Styleguide',
    icon: IconFlask,
    to: {
      name: 'styleguide'
    }
  }
])
</script>
<style module>
.navigation-item-list {
    background-color: #0000;

    &:hover {
        background-color: var(--secondary-surface);
    }
    :global(&:has(.router-link-active)) {
        background-color: var(--secondary-surface);
    }
    :global(&:hover:has(.router-link-active)) {
        background-color: var(--secondary-surface-state-1);
    }
}
</style>
