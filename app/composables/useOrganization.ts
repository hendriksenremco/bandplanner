import { documentId, query, where, collection, addDoc, getDocs, serverTimestamp, arrayUnion, deleteDoc, doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'

const converter = {
  toFirestore: (data: OrganizationItem) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as OrganizationItem
}

export const useOrganization = () => {
  const organizationId = ref('pnpkazx3wrE7Yx6VbNGU')
  const { $db } = useNuxtApp()
  const { user } = useAuth()
  const organizations: Ref<Array<OrganizationItem>> = ref([])

  const getAll = async () => {
    if (!user.value) { return }
    const q = query(collection($db, 'organization').withConverter(converter), where('admins', 'array-contains', user.value.uid))
    const snapshot = await getDocs(q)
    organizations.value = []
    snapshot.forEach(doc => {
      organizations.value.push({ id: doc.id, ...doc.data() } as OrganizationItem)
    })
  }

  const add = async (item: Omit<OrganizationItem, 'id'>) => {
    if (!user.value?.uid) { return }
    item.createdAt = serverTimestamp()
    item.updatedAt = serverTimestamp()
    item.admins = [user.value.uid]
    item.members = []
    await addDoc(collection($db, 'organization'), item)
    await getAll()
  }

  const edit = async (item: OrganizationItem) => {
    if (!item.id) { return }
    const docRef = doc($db, 'organization', item.id).withConverter(converter)
    return await updateDoc(docRef, item)
  }

  const get = async (id: string) => {
    const docRef = doc($db, 'organization', id)
    const snapshot = await getDoc(docRef)
    return snapshot.data()
  }

  const remove = async (id: any) => {
    if (id === organizationId.value) { return }
    return await deleteDoc(doc($db, 'organization', id))
  }
  return { organizationId, organizations, getAll, add, get, remove, edit }
}
