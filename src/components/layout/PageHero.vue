<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  lede: {
    type: String,
    default: '',
  },
  meta: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <header class="page-hero">
    <p v-if="eyebrow" class="page-hero__eyebrow">{{ eyebrow }}</p>
    <h1 class="page-hero__title">{{ title }}</h1>
    <p v-if="lede" class="page-hero__lede">{{ lede }}</p>

    <div v-if="meta.length" class="page-hero__meta">
      <span v-for="item in meta" :key="item" class="page-hero__meta-item">{{ item }}</span>
    </div>
  </header>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 1rem 0 0;
}

.page-hero::after {
  content: '';
  display: block;
  width: min(220px, 30vw);
  height: 1px;
  margin-top: 1.5rem;
  background: linear-gradient(90deg, var(--color-branch), transparent);
}

.page-hero__eyebrow {
  margin: 0 0 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.page-hero__title {
  max-width: 20ch;
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4.4rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.page-hero__lede {
  max-width: 68ch;
  margin: 1rem 0 0;
  font-size: 1.08rem;
  color: var(--color-ink-soft);
}

.page-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.page-hero__meta-item {
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  background: rgba(249, 245, 236, 0.72);
  border: 1px solid var(--color-border-strong);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-ink-soft);
}
</style>
