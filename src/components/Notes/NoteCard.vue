<script setup lang="ts">
import type Note from '@/types/note.type'
import { useDateFormat } from '@vueuse/core'
import { computed, defineAsyncComponent, reactive, type DefineComponent } from 'vue'

type Props = {
  note: Note
}

type PropsDeleteNoteModal = {
  modelValue: boolean
  noteId: string
}

const DeleteNoteModal = defineAsyncComponent<DefineComponent<PropsDeleteNoteModal>>(
  () => import('@/components/Notes/DeleteNoteModal.vue') as any
)

const props = defineProps<Props>()

const characterLength = computed<string>(() =>
  props.note.content.length > 1
    ? `${props.note.content.length} characters`
    : `${props.note.content.length} charcater`
)

const modals = reactive<{ deleteNote: boolean }>({
  deleteNote: false
})

const noteDate = useDateFormat(props.note.createdAt, 'DD/MM/YYYY - HH:mm')
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        <p>{{ note.content }}</p>
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ noteDate }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/editNote/${note.id}`" class="card-footer-item">Edit</router-link>
      <a @click.prevent="modals.deleteNote = true" class="card-footer-item" href="#">Delete</a>
    </footer>
    <delete-note-modal v-model="modals.deleteNote" :noteId="note.id"></delete-note-modal>
  </div>
</template>
