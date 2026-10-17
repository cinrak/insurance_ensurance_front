# Sidebar + Download Page Plan

## Goal
Add a slide-in sidebar (hamburger trigger, top-right) with a "Download all insurance documents" link that navigates to a new `/download` view. Set up Vue Router for future pages.

## Files to create/modify

### 1. Install Vue Router
```bash
npm install vue-router
```

### 2. `src/router/index.js` — **new file**
```js
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import DownloadPage from '../views/DownloadPage.vue'

const routes = [
  { path: '/', component: App },
  { path: '/download', component: DownloadPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 3. `src/main.js` — **modify**
Add router setup:
```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

### 4. `src/App.vue` — **modify**
- Keep existing title + input
- Add hamburger button (`☰`) in top-right corner
- Add sidebar panel with transition (slide from right)
- Sidebar has one list item: "Download insurance documents" → `<router-link to="/download">`
- Click outside sidebar (backdrop) closes it
- Add `<router-view />` inside App so routes render within the same layout

### 5. `src/views/DownloadPage.vue` — **new file**
- Simple page with heading "Download Insurance Documents"
- Single "Download all documents" button
- `<router-link to="/">← Back to home</router-link>` to return
- Minimal styling consistent with existing design

## Design decisions
- **Sidebar:** slides from right, 280px wide, backdrop overlay (click to close)
- **Hamburger button:** fixed top-right, visible on all pages
- **Vue Router:** `createWebHistory()` (not hash mode)
- **Routes:** `/` (home), `/download` (download page) — ready to add more
- **No external icon library:** use `☰` text character for hamburger

## Validation
- `npm run dev` starts without errors
- Hamburger button opens/closes sidebar
- Clicking outside sidebar closes it
- "Download insurance documents" link navigates to `/download`
- Back button works in browser
- Download page has return link to home
