export const useDragInfo = () => {
  const target = useState(() => ref(null))
  const childTarget = useState(() => ref(null))
  return { target, childTarget }
}
