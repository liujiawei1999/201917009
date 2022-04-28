import { watch } from 'vue'
import store from '@/store'

export const watching = (...cbs1) => {
  watch(
    () => store.getters.lang,
    () => {
      cbs1.forEach(cb1 => console.log(cb1))
    },
    { deep: true }
  )
}
