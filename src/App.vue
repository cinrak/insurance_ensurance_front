<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="app">
    <button class="hamburger" @click="sidebarOpen = !sidebarOpen">☰</button>

    <Transition name="slide">
      <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false">
        <nav class="sidebar">
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/download">Download insurance documents</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>

    <router-view />
  </div>
</template>

<style scoped>
.app {
  position: relative;
}

.hamburger {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  font-size: 24px;
  background: var(--text-h, #111);
  color: var(--text, #fff);
  border: none;
  border-radius: 6px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: var(--bg, #0f0022);
  border-left: 1px solid var(--border, #ccc);
  padding: 20px;
  z-index: 100;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li a {
  color: var(--text, #fff);
  text-decoration: none;
  font-size: 16px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
