import { useStorage } from '@vueuse/core'
import type { VNode } from 'vue'
export const useResizer = () => {
  const { cursorType } = useLayout()
  const startOffset: Ref<number> = ref(0)
  const active: Ref<boolean> = ref(false)
  const target: Ref<VNode> = useState('target')
  const width: Ref<number> = useStorage('width', 300, localStorage)

  const setTarget = (element: VNode) => {
    target.value = element
  }

  const onMouseUp = (event: any) => {
    active.value = false
    startOffset.value = 0
  }

  const onMouseDown = (event: any) => {
    active.value = true
    startOffset.value = event.clientX
  }
  const onMouseMove = (event: any) => {
    if (!active.value) { return false }
    if (event.clientX < 200 || event.clientX > 400) { return }
    width.value = event.clientX + 3
  }

  const onMouseOver = () => {
    cursorType.value = 'ew-resize'
  }

  const onMouseOut = () => {
    if (active.value) { return }
    cursorType.value = 'default'
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseup', onMouseUp, { passive: true })
  })

  watch(active, () => {
    cursorType.value = active.value ? 'ew-resize' : 'default'
  })

  return { active, width, setTarget, onMouseUp, onMouseDown, onMouseMove, onMouseOver, onMouseOut }
}
