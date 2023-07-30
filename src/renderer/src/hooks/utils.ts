import { computed } from 'vue'
export const useVModelProp = <T, K extends keyof T>(
  props: T,
  key: K,
  emit: (emitEventName: string, value: T[K]) => void
) => {
  const emitEventName = `update:${key as string}`
  const proxy = computed<T[K]>({
    get() {
      return props[key]
    },
    set(newValue) {
      emit(emitEventName, newValue)
    }
  })
  return proxy
}
