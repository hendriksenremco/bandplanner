import type { Timestamp, FieldValue } from 'firebase/firestore'

global {
    interface OrganizationItem {
        id?: string
        name: string
        admins: array<string>
        members:array<string>
        createdAt: Timestamp | FieldValue
        updatedAt: Timestamp | FieldValue,
    }

}