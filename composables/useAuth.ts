// @ts-nocheck
import { createUserWithEmailAndPassword, User, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

export default function () {
  const { $auth } = useNuxtApp()

  const user = useState<User | null>('user', () => null)

  onMounted(() => {
    onAuthStateChanged($auth, authUser => {
      if (authUser) {
        user.value = authUser
      }
    })
  })

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentials = await createUserWithEmailAndPassword($auth, email, password)
      if (credentials) {
        user.value = credentials.user
        return true
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
      }
      return false
    }
    return false
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentials = await signInWithEmailAndPassword($auth, email, password)
      if (credentials) {
        user.value = credentials.user
        return true
      }
    } catch (error : unkown) {
      return false
    }
    return false
  }

  return {
    user,
    register,
    login
  }
}
