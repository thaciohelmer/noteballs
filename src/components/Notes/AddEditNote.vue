<script setup lang="ts">
import { computed, ref } from 'vue'

import { vAutofocus } from '@/directives/vAutofocus'

type Props = {
  modelValue: string
  bgColor?: string
  placeholder?: string
  label?: string
}

const props = defineProps<Props>()

const textAreaValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue)
})

const emit = defineEmits(['update:modelValue'])

const textAreaRef = ref<HTMLElement>()

const focusTextarea = () => {
  textAreaRef.value?.focus()
}

defineExpose({
  focusTextarea
})
</script>

<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor || 'success'}-dark`">
    <div class="field">
      <div class="control">
        <label class="label has-text-white" v-if="label">{{ label }}</label>
        <textarea
          v-model="textAreaValue"
          v-autofocus
          :placeholder="placeholder || 'Type something...'"
          class="textarea"
          ref="textAreaRef"
          maxlength="500"
        ></textarea>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>
