// @ts-nocheck
import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD7e_H6hYNPeuKqfYXtSiNR235yZRcdnaM',
  authDomain: 'bandplanner-a1ef4.firebaseapp.com',
  projectId: 'bandplanner-a1ef4',
  storageBucket: 'bandplanner-a1ef4.appspot.com',
  messagingSenderId: '763371772910',
  appId: '1:763371772910:web:c66743048b999e8ebaccff',
  measurementId: 'G-0DB3L41SGM'
}

export default defineNuxtPlugin(nuxtApp => {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  const analytics = getAnalytics(app)

  setPersistence(auth, browserLocalPersistence)

  nuxtApp.provide('analytics', analytics)
  nuxtApp.vueApp.provide('analytics', analytics)

  nuxtApp.provide('auth', auth)
  nuxtApp.vueApp.provide('auth', auth)

  nuxtApp.provide('db', db)
  nuxtApp.vueApp.provide('db', db)

  nuxtApp.provide('storage', storage)
  nuxtApp.vueApp.provide('storage', storage)
})
