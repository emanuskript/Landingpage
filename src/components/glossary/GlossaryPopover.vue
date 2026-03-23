<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <details class="glossary-popover">
    <summary>{{ label }}</summary>
    <div class="glossary-popover__panel">
      <p>{{ definition }}</p>
      <RouterLink v-if="slug" :to="`/tutorials/glossary/${slug}`">Open glossary entry</RouterLink>
    </div>
  </details>
</template>

<style scoped>
.glossary-popover {
  display: inline-block;
  position: relative;
}

.glossary-popover summary {
  list-style: none;
  display: inline;
  cursor: help;
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.18em;
}

.glossary-popover summary::-webkit-details-marker {
  display: none;
}

.glossary-popover[open] summary {
  color: var(--color-primary-strong);
}

.glossary-popover__panel {
  position: absolute;
  left: 0;
  z-index: 20;
  width: min(320px, 80vw);
  margin-top: 0.6rem;
  padding: 0.85rem 0.95rem;
  background: rgba(255, 252, 246, 0.98);
  border: 1px solid var(--color-border-strong);
  border-radius: 18px;
  box-shadow: var(--shadow-panel);
  font-family: var(--font-sans);
  font-size: 0.92rem;
  line-height: 1.55;
}

.glossary-popover__panel p {
  margin: 0 0 0.7rem;
}
</style>
