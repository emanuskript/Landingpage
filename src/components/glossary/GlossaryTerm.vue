<script setup>
defineProps({
  term: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="glossary-term-card">
    <div class="glossary-term-card__top">
      <h2>{{ term.term }}</h2>
      <span class="glossary-term-card__category">{{ term.category }}</span>
    </div>
    <p class="glossary-term-card__definition">{{ term.definition }}</p>
    <RouterLink class="glossary-term-card__link" :to="`/tutorials/glossary/${term.slug}`">Open entry</RouterLink>
  </article>
</template>

<style scoped>
.glossary-term-card {
  padding: 1.1rem 1.15rem;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 22px;
  box-shadow: var(--shadow-panel);
}

.glossary-term-card__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
}

.glossary-term-card h2 {
  margin: 0;
  font-size: 1.15rem;
}

.glossary-term-card__category {
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: rgba(57, 89, 120, 0.08);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: capitalize;
}

.glossary-term-card__definition {
  margin: 0.85rem 0;
  line-height: 1.55;
}

.glossary-term-card__link {
  font-family: var(--font-sans);
  font-size: 0.92rem;
}
</style>
