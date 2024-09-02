import { documentId, query, where, collection, addDoc, getDocs, serverTimestamp, arrayUnion, deleteDoc, doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'

const converter = {
  toFirestore: (data: SetlistItem) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as SetlistItem
}

export const useSetlists = () => {
  const { $db } = useNuxtApp()
  const { user } = useAuth()
  const { organizationId } = useOrganization()
  const lists: Ref<Array<SetlistItem>> = ref([])

  const add = async (item: Omit<SetlistItem, 'id'>) => {
    if (!user.value?.uid) { return }
    item.userId = user.value.uid
    item.createdAt = serverTimestamp()
    item.updatedAt = serverTimestamp()
    item.organizationId = [organizationId.value]
    item.songs = []
    await addDoc(collection($db, 'setlists'), item)
    await getAll()
  }

  const edit = async (item: SetlistItem) => {
    if (!item.id) { return }
    const docRef = doc($db, 'setlists', item.id).withConverter(converter)
    item.songs = item.songs.map(song => song.id)
    return await updateDoc(docRef, item)
  }
  const getAll = async () => {
    if (!user.value?.uid) { return }

    const q = query(collection($db, 'setlists').withConverter(converter), where('organizationId', 'array-contains', organizationId.value))
    const snapshot = await getDocs(q)
    lists.value = []
    snapshot.forEach(doc => {
      lists.value.push({ id: doc.id, ...doc.data() as Omit<SetlistItem, 'id'> })
    })
  }

  const get = async (listId: string) => {
    const docRef = doc($db, 'setlists', listId)
    const snapshot = await getDoc(docRef)
    const data = snapshot.data()

    // Get songs for this list
    if (!data?.songs.length) {
      return { id: snapshot.id, ...data }
    }
    const q = query(
      collection($db, 'songs'),
      where(
        documentId(),
        'in',
        data.songs
      )
    )

    const songsSnapshot = await getDocs(q)
    const songs = songsSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    }).sort((a, b) => {
      return data.songs.indexOf(a.id) > data.songs.indexOf(b.id) ? 1 : -1
    })

    return { id: snapshot.id, ...data, songs }
  }

  const remove = async (id: any) => {
    return await deleteDoc(doc($db, 'setlists', id))
  }

  const addToList = async (listId: string, song: SongItem) => {
    const docRef = doc($db, 'setlists', listId).withConverter(converter)
    return await updateDoc(docRef, {
      songs: arrayUnion(song.id)
    })
  }

  const removeFromList = async (listId: string, song: SongItem) => {
    const docRef = doc($db, 'setlists', listId).withConverter(converter)
    return await updateDoc(docRef, {
      songs: arrayRemove(song.id)
    })
  }

  return { add, edit, getAll, get, remove, addToList, removeFromList, lists }
}
