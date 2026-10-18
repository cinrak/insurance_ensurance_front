<script setup>
import { ref, watch, onMounted } from 'vue'
import { useTypingEffect } from '../composables/useTypingEffect.js'

const { displayText } = useTypingEffect([
  'Ask about your insurance document',
  'What is my deductible?',
  'Is flood damage covered?',
  'What is the claim limit?',
  'How do I file a claim?'
])

const question = ref('')
const answer = ref('')
const loading = ref(false)
const error = ref('')
const apiKey = ref('')
const showKey = ref(false)

// Keep the OpenRouter key in this browser only, so it survives a reload.
onMounted(() => {
  const saved = localStorage.getItem('openrouter_api_key')
  if (saved) apiKey.value = saved
})

watch(apiKey, (value) => {
  const trimmed = (value || '').trim()
  if (trimmed) localStorage.setItem('openrouter_api_key', trimmed)
  else localStorage.removeItem('openrouter_api_key')
})

async function ask() {
  if (!question.value.trim() || loading.value) return
  loading.value = true
  error.value = ''
  answer.value = ''
  const payload = { question: question.value.trim() }
  const key = apiKey.value.trim()
  if (key) payload['api_key'] = key
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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

    <label class="field-label" for="api-key">OpenRouter API key</label>
    <div class="key-row">
      <input
        id="api-key"
        v-model="apiKey"
        :type="showKey ? 'text' : 'password'"
        placeholder="Paste your OpenRouter key"
        class="key-input"
        autocomplete="off"
        spellcheck="false"
      />
      <button type="button" class="toggle-btn" @click="showKey = !showKey">
        {{ showKey ? 'Hide' : 'Show' }}
      </button>
    </div>
    <p class="field-hint">Kept in this browser only, sent to the server with each question.</p>

    <label class="field-label" for="question">Ask about your document</label>
    <input
      id="question"
      type="text"
      v-model="question"
      :placeholder="displayText"
      class="home-input"
      @keyup.enter="ask"
      :disabled="loading"
    />
    <button @click="ask" :disabled="loading">
      {{ loading ? 'Loading...' : 'Ask' }}
    </button>

    <p v-if="loading" class="status">Thinking...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <section v-if="answer" class="answer-block">
      <h2 class="answer-title">Answer</h2>
      <div class="answer">{{ answer }}</div>
    </section>
  </main>
</template>

<style scoped>
.field-label {
  display: block;
  align-self: flex-start;
  margin: 20px 0 6px;
  font-size: 14px;
  color: var(--text-muted);
}

.field-hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.key-row {
  display: flex;
  gap: 8px;
  width: 400px;
  max-width: 100%;
}

.key-input {
  flex: 1;
  font-size: 16px;
  padding: 12px 14px;
  height: 48px;
}

.toggle-btn {
  padding: 0 14px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}

.toggle-btn:hover {
  color: var(--text);
}

.home-input {
  font-size: 18px;
  padding: 14px 16px;
  height: 56px;
  width: 400px;
  max-width: 100%;
}

.status {
  color: var(--text-muted);
  margin-top: 20px;
}

.error {
  color: var(--error);
  margin-top: 20px;
  max-width: 400px;
  text-align: center;
}

.answer-block {
  margin-top: 28px;
  width: 400px;
  max-width: 100%;
}

.answer-title {
  font-size: 16px;
  color: var(--text-muted);
  text-align: left;
  margin-bottom: 8px;
}

.answer {
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.04);
  text-align: left;
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>
