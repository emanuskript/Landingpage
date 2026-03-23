<template>
  <nav
    v-if="prev || next"
    class="prev-next"
    aria-label="Previous and next pages"
  >
    <RouterLink
      v-if="prev"
      :to="prev.to"
      class="prev-next-card prev-next-card--prev"
    >
      <span class="prev-next-arrow" aria-hidden="true">&larr;</span>
      <span class="prev-next-body">
        <span class="prev-next-direction">Previous</span>
        <span class="prev-next-label">{{ prev.label }}</span>
      </span>
    </RouterLink>
    <span v-else class="prev-next-spacer"></span>

    <RouterLink
      v-if="next"
      :to="next.to"
      class="prev-next-card prev-next-card--next"
    >
      <span class="prev-next-body">
        <span class="prev-next-direction">Next</span>
        <span class="prev-next-label">{{ next.label }}</span>
      </span>
      <span class="prev-next-arrow" aria-hidden="true">&rarr;</span>
    </RouterLink>
    <span v-else class="prev-next-spacer"></span>
  </nav>
</template>

<script setup>
defineProps({
  prev: {
    type: Object,
    default: null,
  },
  next: {
    type: Object,
    default: null,
  },
})
</script>

<style scoped>
.prev-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-2xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border-light);
  font-family: var(--font-sans);
}

.prev-next-spacer {
  display: block;
}

.prev-next-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-ink);
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background var(--transition-fast);
}

.prev-next-card:hover {
  border-color: var(--color-gold-muted);
  background: var(--color-panel-hover);
  box-shadow: 0 0 12px rgba(184, 150, 12, 0.12);
}

.prev-next-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.prev-next-card--next {
  text-align: right;
  justify-content: flex-end;
}

.prev-next-arrow {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: var(--color-gold);
  transition: transform var(--transition-fast);
  line-height: 1;
}

.prev-next-card--prev:hover .prev-next-arrow {
  transform: translateX(-3px);
}

.prev-next-card--next:hover .prev-next-arrow {
  transform: translateX(3px);
}

.prev-next-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.prev-next-direction {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-ink-muted);
  font-weight: 600;
}

.prev-next-label {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 1.3;
  color: var(--color-ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .prev-next {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .prev-next-card--next {
    text-align: left;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }

  .prev-next-card {
    padding: var(--space-sm) var(--space-md);
  }

  .prev-next-label {
    font-size: 0.875rem;
  }
}
</style>
