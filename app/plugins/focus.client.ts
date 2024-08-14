export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('focus', {
    mounted (el) {
      if (el.querySelector('input')) {
        return el.querySelector('input').focus()
      }

      return el.focus()
    }
  })
})
