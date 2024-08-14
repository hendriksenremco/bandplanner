export default defineNuxtRouteMiddleware(() => {
  const { hideSidebar } = useLayout()
  hideSidebar()
})
