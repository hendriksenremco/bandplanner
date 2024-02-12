import { doc, setDoc } from 'firebase/firestore'

export const useProfile = () => {
  const { $db } = useNuxtApp()
  const { user } = useAuth()

  const updateUser = async ({ name }: {name: String}) => {
    if (!user.value) { return }
    await setDoc(doc($db, 'users', user.value.uid), { name })
  }

  return { updateUser }
}
