import type { Timestamp, FieldValue } from 'firebase/firestore'

global {
    interface SongItem {
        id?: string
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
        organizationId: Array<string>
    }
}