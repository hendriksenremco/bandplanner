export const useLayout = () => {
  const sidebarShouldShow = useState('sidebar', () => ref(false))

  const showSidebar = () => {
    sidebarShouldShow.value = true
  }
  const hideSidebar = () => {
    sidebarShouldShow.value = false
  }
  const toggleSidebar = () => {
    sidebarShouldShow.value = !sidebarShouldShow.value
  }
  return { sidebarShouldShow, showSidebar, hideSidebar, toggleSidebar }
}
