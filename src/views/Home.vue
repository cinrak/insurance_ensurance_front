<script setup>
import { useTypingEffect } from '../composables/useTypingEffect.js'

const { displayText } = useTypingEffect([
  'Enter a new item',
  'Phone',
  'Laptop',
  'Desktop'
])
</script>

<template>
  <main class="page page-centered">
    <h1>Insurance App</h1>
    <input
      type="text"
      :placeholder="displayText"
      class="home-input"
    />
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
