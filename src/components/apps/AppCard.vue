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
  <RouterLink :to="app.route" class="app-card ui-surface-link">
    <div class="app-card__dot" :style="{ backgroundColor: app.accent }" />
    <div class="app-card__content">
      <p class="app-card__status ui-eyebrow">{{ app.statusLabel }}</p>
      <h2 class="app-card__title">{{ app.name }}</h2>
      <p class="app-card__tagline">{{ app.tagline }}</p>
      <p class="app-card__description">{{ app.description }}</p>
      <ul class="app-card__features">
        <li v-for="feature in app.features.slice(0, 3)" :key="feature">{{ feature }}</li>
      </ul>
      <p class="app-card__action">Open app page</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.app-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1.2rem;
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
