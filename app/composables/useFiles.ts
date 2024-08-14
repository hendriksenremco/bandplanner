// @ts-nocheck
import { ref as fileRef, uploadBytes, uploadString, listAll, deleteObject, getDownloadURL } from 'firebase/storage'

export const useFiles = () => {
  const { $storage } = useNuxtApp()
  const { user } = useAuth()
  const route = useRoute()
  const selected = ref([])
  const files = ref([])

  const currentFolder = computed(() => {
    return route.params.slug ? route.params.slug[route.params.slug.length - 1] : 'Bestanden'
  })

  const getExtensionByFileName = name => {
    if (!name) { return }
    return name.split('.').pop()
  }

  const selectFile = file => {
    if (selected.value.includes(file)) {
      selected.value = selected.value.filter(item => item !== file)
      return
    }
    selected.value.push(file)
  }

  const rootPath = computed(() => `/${user.value.uid}/`)
  const currentPath = computed(() => `/${user.value.uid}/files/${route.params.slug ? route.params.slug.join('/') : ''}`)

  const getFiles = async () => {
    const listRef = fileRef($storage, currentPath.value)
    const res = await listAll(listRef)
    if (res) {
      const folders = res.prefixes.map(item => {
        return {
          name: item.name,
          fullPath: item.fullPath,
          type: 'folder'
        }
      })
      const filesTemp = res.items.map(item => {
        return {
          name: item.name,
          path: item.parent.fullPath,
          fullPath: item.fullPath,
          type: 'file'
        }
      }).filter(item => item.name !== '.ghostfile')

      files.value = [...folders, ...filesTemp]
    }
  }

  const createFolder = async name => {
    const newRef = fileRef($storage, `${currentPath.value}/${name}/.ghostfile`)
    const result = await uploadString(newRef, 'temp')
    if (result) {
      await getFiles()
    }
  }

  const deleteFile = async (path, fileName) => {
    const deleteRef = fileRef($storage, path + '/' + fileName)
    return await deleteObject(deleteRef)
  }

  const deleteFolder = async folderPath => {
    const deleteRef = await fileRef($storage, folderPath)

    const dir = await listAll(deleteRef)
    if (dir) {
      const jobs = []
      dir.items.forEach(fileRef => jobs.push(deleteFile(deleteRef.fullPath, fileRef.name)))
      dir.prefixes.forEach(folderRef => jobs.push(deleteFolder(folderRef.fullPath)))
      return Promise.all(jobs)
    }
  }

  const deleteFiles = async () => {
    if (!selected.value.length) { return }

    const jobs = []
    selected.value.forEach(file => {
      if (file.type === 'folder') {
        jobs.push(deleteFolder(file.fullPath))
      } else {
        jobs.push(deleteFile(file.path, file.name))
      }
    })

    await Promise.all(jobs)
    await getFiles()
    selected.value = []
  }

  const onUpload = async (event, target) => {
    const uploadDir = target ? `${rootPath.value}/${target}` : currentPath.value
    const jobs = []
    Array.from(event.files).forEach(file => {
      const tempFileRef = fileRef($storage, `${uploadDir}/${file.name}`)
      jobs.push(uploadBytes(tempFileRef, file).then(() => {
        getFiles()
      }))
    })

    await Promise.all(jobs)
  }

  const getUrl = async (file: string) => {
    const fileRef2 = await fileRef($storage, file)
    return await getDownloadURL(fileRef2)
  }

  return { onUpload, selectFile, getFiles, createFolder, deleteFile, deleteFolder, deleteFiles, getExtensionByFileName, getUrl, currentFolder, files, selected }
}
