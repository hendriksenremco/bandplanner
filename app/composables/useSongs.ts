import { query, where, collection, addDoc, getDocs, serverTimestamp, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { ref as fileRef, uploadBytes, uploadString, listAll, deleteObject } from 'firebase/storage'

const converter = {
  toFirestore: (data: SongItem) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as SongItem
}

export const useSongs = () => {
  const { $db, $storage } = useNuxtApp()
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

  const addFile = async (event: Event, target: string) => {
    const { onUpload } = useFiles()
    await onUpload(event, `attachements/${target}`)
    // Add file to song. E.g. Audio-file or sheet music
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

  const getSong = async (songId: string) => {
    const docRef = doc($db, 'songs', songId)
    const snapshot = await getDoc(docRef)

    return snapshot.data()
  }

  const getAttachments = async (songId: string, subFolder: string) => {
    const listRef = fileRef($storage, `/${user.value?.uid}/attachements/${songId}/${subFolder}`)
    const res = await listAll(listRef)
    return res.items
  }

  const deleteSong = async (id: any) => {
    return await deleteDoc(doc($db, 'songs', id))
  }

  return { addSong, editSong, getSong, getSongs, deleteSong, addFile, getAttachments, songs }
}
