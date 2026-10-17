# Sidebar Hamburger Toggle Plan

## Goal
Make the hamburger button toggle the sidebar open/closed instead of only opening it.

## Current behavior
- Hamburger: `@click="sidebarOpen = true"` — always opens, never closes
- Sidebar overlay (outside area): `@click="sidebarOpen = false"` — always closes

## Desired behavior
- Hamburger: toggles sidebar (open → close, close → open)
- Sidebar overlay: still closes (unchanged)

## Files to modify

### `src/App.vue` line 9

```vue
<!-- Before -->
<button class="hamburger" @click="sidebarOpen = true">☰</button>

<!-- After -->
<button class="hamburger" @click="sidebarOpen = !sidebarOpen">☰</button>
```

## Validation
- Hamburger closed → click → sidebar opens
- Hamburger open → click → sidebar closes
- Click outside sidebar → sidebar closes
- Sidebar links navigate correctly
