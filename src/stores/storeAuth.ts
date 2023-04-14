import { defineStore } from 'pinia'
import { auth } from '@/config/db/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'
import type { Router } from 'vue-router'

import { useNotesStore } from '@/stores/storeNotes'

type Credentials = {
  email: string
  password: string
}

type State = {
  user: User | null
  router: Router | null
}

export const useStoreAuth = defineStore({
  id: 'auth',
  state: (): State => ({
    user: null,
    router: null
  }),
  actions: {
    registerUser({ email, password }: Credentials): void {
      createUserWithEmailAndPassword(auth, email, password).then().catch(console.error)
    },
    logoutUser(): void {
      signOut(auth)
        .then(() => console.log('User signed out'))
        .catch(console.log)
    },
    loginUser({ email, password }: Credentials): void {
      signInWithEmailAndPassword(auth, email, password).then().catch(console.error)
    },
    init() {
      const storeNotes = useNotesStore()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
          this.router?.push('/')
          storeNotes.init()
        } else {
          this.user = null
          this.router?.replace('/auth')
          storeNotes.clearNotes()
        }
      })
    }
  }
})
