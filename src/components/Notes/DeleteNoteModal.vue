<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useNotesStore } from '@/stores/storeNotes'

type Props = {
  modelValue: boolean
  noteId: string
}

const emit = defineEmits(['update:modelValue'])

const props = defineProps<Props>()

const isActiveModal = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue)
})

const deleteModalRef = ref<HTMLElement>()
const notesStore = useNotesStore()

const closeModal = () => (isActiveModal.value = false)
const closeModalKeyBoard = (event: KeyboardEvent) => event.key === 'Escape' && closeModal()

onMounted(() => document.addEventListener('keyup', closeModalKeyBoard))
onUnmounted(() => document.removeEventListener('keyup', closeModalKeyBoard))

onClickOutside(deleteModalRef, closeModal)
</script>

<template>
  <div class="modal p-2" :class="{ 'is-active': isActiveModal }">
    <div class="modal-background"></div>
    <div class="modal-card" ref="deleteModalRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note ?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note ?</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-danger" @click="notesStore.deleteNote(noteId)">Delete</button>
      </footer>
    </div>
  </div>
</template>
