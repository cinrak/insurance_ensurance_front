<script setup>
import { ref } from 'vue'
import { useTypingEffect } from '../composables/useTypingEffect.js'

const { displayText } = useTypingEffect([
  'Enter a new item',
  'Phone',
  'Laptop',
  'Desktop'
])

const question = ref('')
const answer = ref('')
const loading = ref('')
const error = ref('')

async function ask() {
    if (!question.value.trim() || loading.value) return
    loading.value = true
    error.value = ''
    answer.value = ''
    try {
        const res = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: question.value })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
        answer.value = data.answer
    } catch (err) {
      error.value = err.message
    }
    loading.value = false
}
</script>

<template>
  <main class="page page-centered">
    <h1>Insurance App</h1>
    <input
      type="text"
      v-model="question"
      :placeholder="displayText"
      class="home-input"
      @keyup.enter="ask"
    />
    <button @click="ask" :disabled="loading">
      {{ loading ? 'Loading...' : 'Ask' }}
    </button>
  </main>
</template>

<style scoped>
.home-input {
  font-size: 18px;
  padding: 14px 16px;
  height: 56px;
  width: 400px;
  max-width: 100%;
}
</style>
