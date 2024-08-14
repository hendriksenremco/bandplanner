export const useLayout = () => {
  const sidebarShouldShow: Ref<boolean> = useState('sidebar', () => ref(false))
  const cursorType: Ref<string> = useState('cursorType', () => ref('default'))

  const showSidebar = () => {
    sidebarShouldShow.value = true
  }
  const hideSidebar = () => {
    sidebarShouldShow.value = false
  }
  const toggleSidebar = () => {
    sidebarShouldShow.value = !sidebarShouldShow.value
  }
  return { sidebarShouldShow, showSidebar, hideSidebar, toggleSidebar, cursorType }
}
