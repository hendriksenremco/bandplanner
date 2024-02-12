import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth'
import type { User } from 'firebase/auth'
export const useAuth = () => {
  const { $auth } = useNuxtApp()

  const loaded = useState<boolean>('loading', () => ref(false))
  const user = useState<User | null>('user', () => ref(null))

  onAuthStateChanged($auth, authUser => {
    if (authUser) {
      user.value = authUser
    }
    loaded.value = true
  })

  const register = async ({ email, password, name } : { email: string, password: string, name?: string}): Promise<boolean> => {
    try {
      const credentials = await createUserWithEmailAndPassword($auth, email, password)
      if (credentials) {
        user.value = credentials.user
        return true
      }
    } catch (error: any) {
      throw new Error(error.code)
    }
    return false
  }

  const logout = async () => {
    const router = useRouter()
    await signOut($auth)
    user.value = null
    router.push({ name: 'auth-login' })
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentials = await signInWithEmailAndPassword($auth, email, password)
      if (credentials) {
        user.value = credentials.user
        return true
      }
    } catch (error: any) {
      throw new Error(error.code)
    }
    return false
  }

  return {
    user,
    loaded,
    register,
    login,
    logout
  }
}
