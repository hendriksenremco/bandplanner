import { query, where, collection, addDoc, getDocs, serverTimestamp, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import type { QueryDocumentSnapshot, Timestamp, FieldValue } from 'firebase/firestore'
interface SongItem {
    id: string
    name: string
    tempo?: string
    rating?: 1|2|3|4|5
    difficulty?: 1|2|3|4|5
    key?: string
    signature?: string,
    userId: string,
    createdAt: Timestamp | FieldValue
    updatedAt: Timestamp | FieldValue,
    labels?: Array<string>
}

const converter = {
  toFirestore: (data: SongItem) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as SongItem
}

export const useSongs = () => {
  const { $db } = useNuxtApp()
  const { user } = useAuth()
  const songs: Ref<Array<SongItem>> = ref([])

  const addSong = async (item: Omit<SongItem, 'id'>) => {
    if (!user.value?.uid) { return }
    item.userId = user.value.uid
    item.createdAt = serverTimestamp()
    item.updatedAt = serverTimestamp()
    await addDoc(collection($db, 'songs'), item)
    await getSongs()
  }

  const editSong = async (item: SongItem) => {
    const docRef = doc($db, 'songs', item.id).withConverter(converter)
    return await updateDoc(docRef, item)
  }

  const getSongs = async () => {
    if (!user.value?.uid) { return }

    const q = query(collection($db, 'songs').withConverter(converter), where('userId', '==', user.value.uid))
    const snapshot = await getDocs(q)
    songs.value = []
    snapshot.forEach(doc => {
      songs.value.push({ id: doc.id, ...doc.data() as Omit<SongItem, 'id'> })
    })
  }

  const getSong = async (id: string) => {
    const docRef = doc($db, 'songs', id)
    const snapshot = await getDoc(docRef)
    return snapshot.data()
  }

  const deleteSong = async (id: any) => {
    return await deleteDoc(doc($db, 'songs', id))
  }

  return { addSong, editSong, getSong, getSongs, deleteSong, songs }
}
