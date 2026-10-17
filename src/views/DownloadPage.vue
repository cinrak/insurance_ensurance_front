<template>
  <div class="download-page">
    <h1>Download Insurance Documents</h1>
    <button class="download-btn">Download all documents</button>
    <router-link to="/">← Back to home</router-link>
  </div>
</template>

<style scoped>
.download-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  margin-bottom: 16px;
}

.download-btn {
  padding: 10px 20px;
  font-size: 16px;
  background: var(--text-h, #111);
  color: var(--text, #fff);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 16px;
}

a {
  color: var(--text-h, #111);
  text-decoration: underline;
}
</style>
