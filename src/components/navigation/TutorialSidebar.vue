<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: 'Lessons',
  },
  backLink: {
    type: Object,
    default: null,
  },
})

const mobileOpen = ref(false)
const route = useRoute()
const router = useRouter()

function resolveItem(item) {
  return router.resolve(item.to)
}

function itemKey(item, index) {
  return `${resolveItem(item).fullPath}-${item.label}-${index}`
}

function isActive(item) {
  if (typeof item.active === 'boolean') {
    return item.active
  }

  const resolved = resolveItem(item)

  if (resolved.path !== route.path) {
    return false
  }

  if (resolved.hash) {
    return resolved.hash === route.hash
  }

  return true
}

function scrollToHash(hash) {
  window.requestAnimationFrame(() => {
    const element = document.querySelector(hash)
    if (!element) return

    const top = element.getBoundingClientRect().top + window.scrollY - 104
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    window.scrollTo({ top, behavior })
  })
}

async function handleLinkClick(item, event) {
  mobileOpen.value = false

  const resolved = resolveItem(item)
  if (resolved.path !== route.path || !resolved.hash) {
    return
  }

  event.preventDefault()

  if (route.hash !== resolved.hash) {
    await router.replace({ path: route.path, hash: resolved.hash }).catch(() => {})
  }

  scrollToHash(resolved.hash)
}
</script>

<template>
  <aside class="tutorial-sidebar" :class="{ open: mobileOpen }">
    <button
      class="sidebar-toggle"
      @click="mobileOpen = !mobileOpen"
      :aria-expanded="mobileOpen"
      aria-label="Toggle lesson navigation"
    >
      <span class="sidebar-toggle-icon" :class="{ open: mobileOpen }">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span class="sidebar-toggle-text">{{ title }}</span>
    </button>

    <div class="sidebar-content ui-surface-card">
      <RouterLink
        v-if="backLink"
        :to="backLink.to"
        class="sidebar-back ui-chip ui-chip--soft"
      >
        <span class="sidebar-back-arrow" aria-hidden="true">&larr;</span>
        {{ backLink.label }}
      </RouterLink>

      <h2 class="sidebar-title">{{ title }}</h2>

      <nav aria-label="Lesson navigation">
        <ol class="sidebar-list">
          <li
            v-for="(item, index) in props.items"
            :key="itemKey(item, index)"
            class="sidebar-item"
            :class="{ active: isActive(item) }"
          >
            <RouterLink
              :to="item.to"
              class="sidebar-link"
              :class="{ active: isActive(item) }"
              :aria-current="isActive(item) ? 'page' : undefined"
              @click="handleLinkClick(item, $event)"
            >
              <span class="sidebar-number" aria-hidden="true">
                {{ item.number }}
              </span>
              <span class="sidebar-label">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ol>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.tutorial-sidebar {
  width: 100%;
  min-width: 0;
  font-family: var(--font-serif);
}

.sidebar-toggle {
  display: none;
}

.sidebar-content {
  position: sticky;
  top: var(--space-lg);
  max-height: calc(100vh - (var(--space-lg) * 2));
  overflow-y: auto;
  padding: 1rem;
}

.sidebar-back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  margin-bottom: 0.95rem;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-ink-soft);
}

.sidebar-back:hover {
  color: var(--color-primary-strong);
}

.sidebar-back:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.sidebar-back-arrow {
  font-size: 0.95rem;
}

.sidebar-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-ink);
  margin: 0 0 0.95rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.sidebar-link {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0.8rem;
  text-decoration: none;
  border-radius: 16px;
  transition:
    background var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
  color: var(--color-ink-soft);
  position: relative;
  border: 1px solid transparent;
}

.sidebar-link:hover {
  background: rgba(255, 250, 242, 0.9);
  border-color: var(--color-border-light);
  color: var(--color-ink);
}

.sidebar-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.sidebar-link.active {
  background: rgba(255, 252, 246, 0.96);
  border-color: var(--color-border-light);
  color: var(--color-ink);
  font-weight: 600;
}

.sidebar-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: var(--space-xs);
  bottom: var(--space-xs);
  width: 3px;
  background: var(--color-gold);
  border-radius: 2px;
}

.sidebar-number {
  flex-shrink: 0;
  width: 1.9rem;
  height: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-ink-muted);
  background: var(--color-parchment-dark);
  border-radius: var(--radius-round);
  line-height: 1;
}

.sidebar-link.active .sidebar-number {
  background: var(--color-gold);
  color: var(--color-parchment);
}

.sidebar-label {
  font-size: 0.96rem;
  line-height: 1.42;
  padding-top: 2px;
}

@media (max-width: 768px) {
  .tutorial-sidebar {
    width: 100%;
    position: relative;
    z-index: var(--z-dropdown);
  }

  .sidebar-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    padding: 0.85rem 1rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.28), transparent 56%),
      var(--color-panel);
    border: 1px solid var(--color-border-light);
    border-radius: 18px;
    cursor: pointer;
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--color-ink);
  }

  .sidebar-toggle:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .sidebar-toggle-icon {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 18px;
  }

  .sidebar-toggle-icon span {
    display: block;
    height: 2px;
    background: var(--color-ink);
    border-radius: 1px;
    transition:
      transform var(--transition-fast),
      opacity var(--transition-fast);
  }

  .sidebar-toggle-icon.open span:nth-child(1) {
    transform: translateY(5px) rotate(45deg);
  }

  .sidebar-toggle-icon.open span:nth-child(2) {
    opacity: 0;
  }

  .sidebar-toggle-icon.open span:nth-child(3) {
    transform: translateY(-5px) rotate(-45deg);
  }

  .sidebar-content {
    position: static;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0 var(--space-md);
    border: none;
    transition:
      max-height var(--transition-base),
      opacity var(--transition-fast),
      padding var(--transition-base);
  }

  .tutorial-sidebar.open .sidebar-content {
    max-height: 70vh;
    overflow-y: auto;
    opacity: 1;
    padding: var(--space-md);
    border: 1px solid var(--color-border-strong);
    border-top: none;
    border-radius: 0 0 22px 22px;
    margin-top: -1px;
  }

  .sidebar-title {
    font-size: 1.08rem;
  }

  .sidebar-label {
    font-size: 0.92rem;
  }
}
</style>
