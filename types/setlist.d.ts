import type { Timestamp, FieldValue } from 'firebase/firestore'

global {
    interface SetlistItem {
        id: string
        name: string
        userId: string
        createdAt: Timestamp | FieldValue
        updatedAt: Timestamp | FieldValue,
        songs: array
    }

}