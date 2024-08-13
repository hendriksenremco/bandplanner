export const useConfirm = () => {
  const confirmText: Ref<string> = useState(() => ref(''))
  const resolveText: Ref<string | undefined> = useState(() => ref('Ok'))
  const rejectText: Ref<string | undefined> = useState(() => ref('Annuleren'))
  const resolveStatus: Ref<string | null> = useState(() => ref(null))
  const shouldShow: Ref<boolean> = useState(() => ref(false))

  const resolveFn = async () => {
    resolveStatus.value = 'resolved'
    await nextTick()
    resolveStatus.value = null
    shouldShow.value = false
  }

  const rejectFn = async () => {
    resolveStatus.value = 'rejected'
    await nextTick()
    resolveStatus.value = null
    shouldShow.value = false
  }

  const confirm = (text: string, { resolveButtonText, rejectButtonText } : { resolveButtonText?: string, rejectButtonText?: string} = {}) => {
    if (resolveButtonText) {
      resolveText.value = resolveButtonText
    }
    if (rejectButtonText) {
      rejectText.value = rejectButtonText
    }
    confirmText.value = text
    shouldShow.value = true
    return new Promise(resolve => {
      watch(resolveStatus, value => {
        if (value === 'resolved') {
          resolve('ok')
        }
      }, { once: true })
    })
  }

  return { resolveText, rejectText, resolveFn, rejectFn, shouldShow, confirm, confirmText }
}
