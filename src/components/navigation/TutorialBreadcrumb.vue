<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <RouterLink :to="{ name: 'home' }" class="breadcrumb-link">
          Home
        </RouterLink>
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.label"
        class="breadcrumb-item"
      >
        <span class="breadcrumb-separator" aria-hidden="true">&#9656;</span>
        <RouterLink
          v-if="index < crumbs.length - 1"
          :to="crumb.to"
          class="breadcrumb-link"
        >
          {{ crumb.label }}
        </RouterLink>
        <span
          v-else
          class="breadcrumb-current"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  crumbs: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every((c) => typeof c.label === 'string'),
  },
})
</script>

<style scoped>
.breadcrumb {
  padding: var(--space-sm) 0;
  font-family: var(--font-sans);
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.breadcrumb-separator {
  color: var(--color-gold-muted);
  font-size: 0.65rem;
  line-height: 1;
}

.breadcrumb-link {
  font-size: 0.8125rem;
  color: var(--color-ink-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-gold);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.breadcrumb-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.breadcrumb-current {
  font-size: 0.8125rem;
  color: var(--color-ink);
  font-weight: 600;
}

@media (max-width: 600px) {
  .breadcrumb-link,
  .breadcrumb-current {
    font-size: 0.75rem;
  }
}
</style>
