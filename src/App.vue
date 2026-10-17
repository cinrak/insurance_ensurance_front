<script setup>
import { ref } from 'vue'

const inputText = ref('')
</script>

<template>
  <main class="page">
    <h1>Insurance App</h1>
    <input
      type="text"
      v-model="inputText"
      placeholder="Enter text..."
    />
  </main>
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid var(--border, #ccc);
  border-radius: 6px;
  box-sizing: border-box;
}
</style>