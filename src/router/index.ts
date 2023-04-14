import { createRouter, createWebHistory } from 'vue-router'
import NotesView from '@/views/NotesView.vue'
import NoteEditView from '@/views/NoteEditView.vue'
import StatsView from '@/views/StatsView.vue'
import AuthView from '@/views/AuthView.vue'

import { useStoreAuth } from '@/stores/storeAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: NotesView
    },
    {
      path: '/editNote/:id',
      name: 'edit-note',
      component: NoteEditView
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    }
  ],
  linkActiveClass: 'is-active'
})

router.beforeEach(async (to) => {
  const authStore = useStoreAuth()
  if (!authStore.user?.uid && to.name !== 'auth') return { name: 'auth' }
  if (authStore.user?.uid && to.name === 'auth') return false
})

export default router
