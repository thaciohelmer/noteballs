import type Note from '@/types/note.type'
import { defineStore } from 'pinia'
import { uuid } from 'vue3-uuid'

import {
  CollectionReference,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  type DocumentData,
  Query
} from 'firebase/firestore'

import { db } from '@/config/db/firebase'

type stateShape = {
  notes: Note[]
  notesLoaded: boolean
}

import { useStoreAuth } from '@/stores/storeAuth'
import type { Unsubscribe } from 'firebase/auth'

let notesCollectionRef: CollectionReference<DocumentData>
let notesCollectionQuery: Query<DocumentData>
let getNotesSnapshot: Unsubscribe

export const useNotesStore = defineStore({
  id: 'notes',
  state: (): stateShape => ({
    notes: [],
    notesLoaded: false
  }),
  actions: {
    init() {
      const storeAuth = useStoreAuth()
      notesCollectionRef = collection(db, 'users', storeAuth.user?.uid ?? '', 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('createdAt', 'desc'))
      this.getNotes()
    },
    async addNote(noteContent: string): Promise<void> {
      await setDoc(doc(notesCollectionRef, uuid.v4()), {
        content: noteContent,
        createdAt: Date.now()
      })
    },
    async deleteNote(id: string): Promise<void> {
      await deleteDoc(doc(notesCollectionRef, id))
    },
    async updateNote(id: string, content: string): Promise<void> {
      await updateDoc(doc(notesCollectionRef, id), { content })
    },
    async getNotes(): Promise<void> {
      getNotesSnapshot = onSnapshot(
        notesCollectionQuery,
        (querySnapshot: any) => {
          this.notes = querySnapshot.docs.map((doc: any) => {
            const { content, createdAt } = doc.data()
            return { id: doc.id, content, createdAt }
          })

          this.notesLoaded = true
        },
        (error) => {
          console.log(error.message)
        }
      )
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot()
    }
  },
  getters: {
    getNoteContent:
      (state): Function =>
      (id: string): string =>
        state.notes.find((nt) => nt.id === id)?.content || '',
    getNotesCount: (state): number => state.notes.length,
    getCharactersAmout: (state): number =>
      state.notes.reduce((acc, curr) => acc + curr.content, '').length
  }
})
