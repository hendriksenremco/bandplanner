import { createUserWithEmailAndPassword, User, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuth = () => {
  const { $auth } = useNuxtApp()

  const loaded = useState<boolean>('loading', () => ref(false))
  const user = useState<User | null>('user', () => ref(null))

  onAuthStateChanged($auth, (authUser: User) => {
    if (authUser) {
      user.value = authUser
    }
    loaded.value = true
  })

  const register = async (email: string, password: string): Promise<boolean> => {
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
    await signOut($auth)
    user.value = null
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
