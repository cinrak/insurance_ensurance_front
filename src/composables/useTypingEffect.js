import { ref, onMounted, onUnmounted } from 'vue'

export function useTypingEffect(strings, options = {}) {
  const displayText = ref('')
  const isDeleting = ref(false)
  let timeout = null

  const {
    typingSpeed = 120,
    deletingSpeed = 60,
    pauseBetween = 1500,
    loop = true
  } = options

  let index = 0

  function type() {
    const current = strings[index]
    const partial = current.slice(0, displayText.value.length + (isDeleting.value ? -1 : 1))

    displayText.value = partial

    if (!isDeleting.value && partial === current) {
      timeout = setTimeout(() => {
        isDeleting.value = true
        type()
      }, pauseBetween)
      return
    }

    if (isDeleting.value && partial === '') {
      isDeleting.value = false
      index++
      if (loop && index >= strings.length) {
        index = 0
      }
    }

    const speed = isDeleting.value ? deletingSpeed : typingSpeed
    timeout = setTimeout(type, speed)
  }

  function stop() {
    clearTimeout(timeout)
  }

  onMounted(type)
  onUnmounted(stop)

  return { displayText, stop }
}
