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
    <p v-if="eyebrow" class="page-hero__eyebrow ui-eyebrow">{{ eyebrow }}</p>
    <h1 class="page-hero__title">{{ title }}</h1>
    <p v-if="lede" class="page-hero__lede">{{ lede }}</p>

    <div v-if="meta.length" class="page-hero__meta">
      <span v-for="item in meta" :key="item" class="page-hero__meta-item ui-chip ui-chip--soft">{{ item }}</span>
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
}

.page-hero__title {
  max-width: min(20ch, 100%);
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4.4rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
  overflow-wrap: anywhere;
}

.page-hero__lede {
  max-width: 68ch;
  margin: 1rem 0 0;
  font-size: 1.08rem;
  color: var(--color-ink-soft);
  overflow-wrap: anywhere;
}

.page-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.page-hero__meta-item {
  align-self: start;
}

@media (max-width: 680px) {
  .page-hero {
    padding-top: 0.55rem;
  }

  .page-hero::after {
    width: min(140px, 46vw);
    margin-top: 1rem;
  }

  .page-hero__title {
    max-width: none;
    font-size: clamp(2rem, 10vw, 3rem);
    line-height: 1.02;
  }

  .page-hero__lede {
    margin-top: 0.75rem;
    font-size: 0.98rem;
    line-height: 1.62;
  }

  .page-hero__meta {
    gap: 0.5rem;
    margin-top: 1rem;
  }
}
</style>
