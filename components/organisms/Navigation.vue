<template>
  <nav>
    <List>
      <ListItem v-for="item in items" :key="item.label" :class="$style['navigation-item-list']">
        <NuxtLink :class="$style['navigation-item-link']" :to="item.route">
          <component :is="{...item.icon}" :class="$style['navigation-item-icon']" />
          <Text color="inherit">
            {{ item.label }}
          </Text>
        </NuxtLink>
      </ListItem>
    </List>
  </nav>
</template>

<script setup>
import IconList from 'remixicon/icons/Editor/list-ordered-2.svg'
import IconFolderMusic from 'remixicon/icons/Document/folder-music-line.svg'
import IconCalendar from 'remixicon/icons/Business/calendar-schedule-line.svg'
import IconDashboard from 'remixicon/icons/System/dashboard-line.svg'
import IconSettings from 'remixicon/icons/System/settings-4-line.svg'
import IconFlask from 'remixicon/icons/Health & Medical/flask-line.svg'

const items = reactive([
  {
    label: 'Dashboard',
    icon: IconDashboard,
    route: {
      name: 'index'
    }
  },

  {
    label: 'Repertoire',
    icon: IconFolderMusic,
    route: {
      name: 'songs'
    }
  },
  {
    label: 'Planning',
    icon: IconCalendar,
    route: {
      name: 'planning'
    }
  },
  {
    label: 'Setlijsten',
    icon: IconList,
    route: {
      name: 'setlists'
    }
  },
  {
    label: 'Instellingen',
    icon: IconSettings,
    route: {
      name: 'settings'
    }
  },
  {
    label: 'Styleguide',
    icon: IconFlask,
    route: {
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
.navigation-item-link {
    align-items: center;
    color: var(--text-subtle);
    display: flex;
    gap: var(--spacing-m);
    height: auto;
    padding: var(--spacing) 0;
    width: 100%;

    &:hover {
        color: var(--text-base);
    }

    :global(&.router-link-active) {
        color: var(--text-base);
    }
}

.navigation-item-icon {
    height: var(--spacing-l);
    width: var(--spacing-l);
    stroke-width: 1.5
}
</style>
