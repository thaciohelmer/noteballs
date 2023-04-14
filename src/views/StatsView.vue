<script setup lang="ts">
import { useNotesStore } from '@/stores/storeNotes'
import { vAutofocus } from '@/directives/vAutofocus'
import { ref } from 'vue'
import { useWatchCharacters } from '@/composables/useWatchCharacters'

const notesStore = useNotesStore()

const loveNoteBolls = ref<string>('')
useWatchCharacters(loveNoteBolls, 50)
</script>

<template>
  <div class="status">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ notesStore.getNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ notesStore.getCharactersAmout }}</td>
        </tr>
      </tbody>
    </table>

    <input
      v-model="loveNoteBolls"
      v-autofocus
      class="input"
      placeholder="Do you love noteballs??"
      type="text"
    />
  </div>
</template>
