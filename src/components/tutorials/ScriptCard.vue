<script setup>
defineProps({
  unit: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="`/tutorials/scripts/${unit.slug}`" class="script-card">
    <p class="script-card__numeral">Unit {{ unit.numeral }}</p>
    <h2>{{ unit.title }}</h2>
    <p class="script-card__dates">{{ unit.dates }}</p>
    <p class="script-card__summary">{{ unit.summary }}</p>
  </RouterLink>
</template>

<style scoped>
.script-card {
  display: grid;
  gap: 0.6rem;
  min-height: 100%;
  padding: 1.2rem;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-panel);
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
}

.script-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-branch);
  box-shadow: 0 18px 38px rgba(69, 49, 23, 0.13);
}

.script-card__numeral {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.script-card h2 {
  margin: 0;
  font-size: 1.24rem;
}

.script-card__dates,
.script-card__summary {
  margin: 0;
  line-height: 1.55;
  color: var(--color-ink-soft);
}

.script-card__dates {
  font-family: var(--font-sans);
  font-size: 0.86rem;
}
</style>
