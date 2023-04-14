<script setup lang="ts">
import { useNotesStore } from '@/stores/storeNotes'
import { defineAsyncComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWatchCharacters } from '@/composables/useWatchCharacters'

const AddEditNote = defineAsyncComponent(() => import('@/components/Notes/AddEditNote.vue') as any)

const router = useRouter()
const route = useRoute()
const notesStore = useNotesStore()
const noteId: string = route.params.id as string
const noteContent = ref<string>(notesStore.getNoteContent(noteId) || '')

const handleSaveClicked = () => {
  notesStore.updateNote(noteId, noteContent.value)
  router.push('/')
}

useWatchCharacters(noteContent, 500)
</script>

<template>
  <div class="edit-note">
    <add-edit-note v-model="noteContent" bgColor="link" label="Edit Note">
      <template #buttons>
        <button @click="$router.push('/')" class="button is-link is-light mr-3">Cancel</button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </add-edit-note>
  </div>
</template>
