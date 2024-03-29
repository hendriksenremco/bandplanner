import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: runtimeConfig.public.firebaseApiKey,
    authDomain: 'bandplanner-a1ef4.firebaseapp.com',
    projectId: 'bandplanner-a1ef4',
    storageBucket: 'bandplanner-a1ef4.appspot.com',
    messagingSenderId: '763371772910',
    appId: '1:763371772910:web:c66743048b999e8ebaccff',
    measurementId: 'G-0DB3L41SGM'
  }
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  const analytics = getAnalytics(app)

  setPersistence(auth, browserLocalPersistence)

  return {
    provide: {
      auth,
      db,
      storage,
      analytics
    }
  }
})
