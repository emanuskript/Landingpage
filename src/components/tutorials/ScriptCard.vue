<script setup>
defineProps({
  unit: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="`/tutorials/scripts/${unit.slug}`" class="script-card ui-surface-link">
    <p class="script-card__numeral ui-eyebrow">Unit {{ unit.numeral }}</p>
    <h2>{{ unit.title }}</h2>
    <p class="script-card__dates">{{ unit.dates }}</p>
    <p v-if="unit.summary" class="script-card__summary">{{ unit.summary }}</p>
  </RouterLink>
</template>

<style scoped>
.script-card {
  display: grid;
  gap: 0.6rem;
  min-height: 100%;
  padding: 1.2rem;
}

.script-card__numeral {
  margin: 0;
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
