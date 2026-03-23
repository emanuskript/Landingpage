<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  app: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="app.route" class="app-card">
    <div class="app-card__dot" :style="{ backgroundColor: app.accent }" />
    <div class="app-card__content">
      <p class="app-card__status">{{ app.statusLabel }}</p>
      <h2 class="app-card__title">{{ app.name }}</h2>
      <p class="app-card__tagline">{{ app.tagline }}</p>
      <p class="app-card__description">{{ app.description }}</p>
      <ul class="app-card__features">
        <li v-for="feature in app.features.slice(0, 3)" :key="feature">{{ feature }}</li>
      </ul>
      <p class="app-card__action">
        {{ app.type === 'download' ? 'Open download page' : 'Open launch page' }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.app-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 24px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-panel);
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.app-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 38px rgba(69, 49, 23, 0.13);
  border-color: var(--color-branch);
}

.app-card__dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  margin-top: 0.3rem;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.55);
}

.app-card__status {
  margin: 0 0 0.35rem;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.app-card__title {
  margin: 0;
  font-size: 1.5rem;
}

.app-card__tagline {
  margin: 0.35rem 0 0;
  color: var(--color-ink-soft);
  font-family: var(--font-sans);
}

.app-card__description {
  margin: 1rem 0 0;
  color: var(--color-ink-soft);
}

.app-card__features {
  margin: 1rem 0 0;
  padding-left: 1.15rem;
}

.app-card__action {
  margin: 1rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary);
}
</style>
