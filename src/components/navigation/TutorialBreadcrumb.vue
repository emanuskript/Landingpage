<script setup>
import { routePaths } from '../../config/siteLinks'

defineProps({
  crumbs: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every((c) => typeof c.label === 'string'),
  },
})
</script>

<template>
  <nav class="breadcrumb ui-surface-card" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <RouterLink :to="routePaths.landing" class="breadcrumb-link">
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
          class="breadcrumb-current ui-chip ui-chip--soft"
          aria-current="page"
        >
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 1.1rem;
  padding: 0.95rem 1.15rem;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.55rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.breadcrumb-separator {
  color: var(--color-branch);
  font-size: 0.82rem;
  line-height: 1;
  opacity: 0.82;
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.2rem 0;
  font-family: var(--font-serif);
  font-size: 0.98rem;
  line-height: 1.3;
  color: var(--color-ink-soft);
  text-decoration: none;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.breadcrumb-link:hover {
  color: var(--color-primary-strong);
  text-decoration: underline;
  text-decoration-color: rgba(57, 89, 120, 0.4);
  text-underline-offset: 0.18em;
  transform: translateY(-1px);
}

.breadcrumb-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.breadcrumb-current {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  font-family: var(--font-display);
  font-size: 0.98rem;
  letter-spacing: 0.01em;
  color: var(--color-ink);
  font-weight: 600;
}

@media (max-width: 600px) {
  .breadcrumb {
    padding: 0.8rem 0.9rem;
    border-radius: 18px;
  }

  .breadcrumb-link,
  .breadcrumb-current {
    font-size: 0.88rem;
  }

  .breadcrumb-current {
    padding-inline: 0.6rem;
  }
}
</style>
