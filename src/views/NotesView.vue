<script setup lang="ts">
import { defineAsyncComponent, ref, type DefineComponent } from 'vue'
import type Note from '@/types/note.type'
import { useNotesStore } from '@/stores/storeNotes'
import { useWatchCharacters } from '@/composables/useWatchCharacters'

type NoteCardProps = {
  note: Note
}

const NoteCard = defineAsyncComponent<DefineComponent<NoteCardProps>>(
  () => import('@/components/Notes/NoteCard.vue') as any
)
const AddEditNote = defineAsyncComponent(() => import('@/components/Notes/AddEditNote.vue') as any)

const newNote = ref<string>('')
const addEditNoteRef = ref()

const notesStore = useNotesStore()

const addNote = () => {
  notesStore.addNote(newNote.value)
  newNote.value = ''
  addEditNoteRef.value.focusTextarea()
}

const textMaxLength: number = 500

useWatchCharacters(newNote, textMaxLength)
</script>

<template>
  <div class="notes">
    <add-edit-note v-model="newNote" placeholder="Add a new note..." ref="addEditNoteRef">
      <template #buttons>
        <button @click="addNote" :disabled="!newNote" class="button is-link has-background-success">
          Add New Note
        </button>
      </template>
    </add-edit-note>
    <div v-if="notesStore.notesLoaded">
      <note-card v-for="note in notesStore.notes" :key="note.id" :note="note" />
    </div>
    <progress class="progress is-small is-primary" max="100" v-else>15%</progress>
    <div
      v-if="notesStore.notesLoaded && !notesStore.notes.length"
      class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
    >
      No notes here ye...
    </div>
  </div>
</template>
