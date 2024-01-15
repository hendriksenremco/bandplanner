export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()
  const { user, loaded } = useAuth()

  router.beforeResolve(async to => {
    if (to.meta.requiresAuth) {
      await new Promise(resolve => {
        watchEffect(() => {
          if (loaded.value && user.value) {
            resolve(to.path)
          }
        })
      })
    }
  })

  router.beforeEach((to, from, next) => {
    watchEffect(() => {
      if (!to.meta.requiresAuth || to.name === 'auth-login' || user.value) {
        next()
      } else if (!user.value && loaded.value) {
        next({ path: '/auth/login', query: { redirect: to.path } })
      }
    })
  })
})
