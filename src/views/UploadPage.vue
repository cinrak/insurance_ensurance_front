<template>
  <div class="page upload-page">
    <h1>Upload Insurance Documents</h1>
    <p class="subtitle">Upload your insurance-related files securely</p>
    <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
      <input type="file" multiple class="file-input" @change="handleFileSelect" ref="fileInput" />
      <div class="upload-icon">📁</div>
      <p>Drag & drop files here or <span class="browse-link" @click="fileInput?.click()">browse</span></p>
      <p class="file-hint">Supported formats: PDF</p>
    </div>
    <div v-if="files.length" class="file-list">
      <h3>Selected files ({{ files.length }})</h3>
      <ul>
        <li v-for="(file, index) in files" :key="index" class="file-item">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatSize(file.size) }}</span>
          <button class="remove-btn" @click="removeFile(index)">✕</button>
        </li>
      </ul>
    </div>
    <button class="upload-btn" :disabled="!files.length || uploading" @click="uploadFiles">
      {{ uploading ? 'Uploading...' : 'Upload files' }}
    </button>
    <router-link to="/">← Back to home</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
const uploading = ref(false)
const fileInput = ref(null)

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function removeFile(index) {
  files.value.splice(index, 1)
}

function handleFileSelect(event) {
  const selected = Array.from(event.target.files)
  files.value = [...files.value, ...selected]
  event.target.value = ''
}

function handleDrop(event) {
  const dropped = Array.from(event.dataTransfer.files)
  files.value = [...files.value, ...dropped]
}

async function uploadFiles() {
  uploading.value = true
  const formData = new FormData()
  for (const file of files.value) {
    formData.append('documents', file)
  }
  try {
    await fetch('/api/upload', { method: 'POST', body: formData })
    files.value = []
  } catch (err) {
    console.error('Upload failed', err)
  }
  uploading.value = false
}
</script>

<style scoped>
.upload-page {
  padding-top: 40px;
}

.subtitle {
  color: var(--text-muted);
  margin-bottom: 24px;
}

.upload-area {
  border: 2px dashed var(--border);
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
  margin-bottom: 16px;
}

.upload-area:hover {
  border-color: var(--accent);
}

.file-input {
  display: none;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.browse-link {
  color: var(--accent);
  text-decoration: underline;
  cursor: pointer;
}

.file-hint {
  color: var(--text-muted);
  font-size: 14px;
}

.file-list {
  margin-bottom: 16px;
}

.file-list h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.file-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  color: var(--text-muted);
  font-size: 14px;
  white-space: nowrap;
}

.remove-btn {
  font-size: 16px;
  color: var(--text-muted);
  padding: 4px 8px;
}

.remove-btn:hover {
  color: var(--error);
}

.upload-btn {
  padding: 10px 20px;
  font-size: 16px;
  background: var(--accent);
  color: var(--text);
  border-radius: var(--radius);
  cursor: pointer;
  margin-bottom: 16px;
  width: 100%;
}

.upload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
