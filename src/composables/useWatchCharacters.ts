import { watch } from 'vue'

export function useWatchCharacters(value: any, maxLenght: number) {
  watch(value, (newValue) => {
    if (newValue.length === maxLenght) alert(`Only ${maxLenght} characters allowed gosh darnit !`)
  })
}
