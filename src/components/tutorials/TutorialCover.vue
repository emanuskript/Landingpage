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
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  meta: {
    type: Array,
    default: () => [],
  },
  image: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  imageCaption: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="tutorial-cover" :class="{ 'tutorial-cover--with-media': image }">
    <div class="tutorial-cover__copy">
      <p v-if="eyebrow" class="tutorial-cover__eyebrow">{{ eyebrow }}</p>
      <h1 class="tutorial-cover__title">{{ title }}</h1>
      <p v-if="subtitle" class="tutorial-cover__subtitle">{{ subtitle }}</p>
      <p v-if="description" class="tutorial-cover__description">{{ description }}</p>
      <div v-if="meta.length" class="tutorial-cover__meta">
        <span v-for="item in meta" :key="item">{{ item }}</span>
      </div>
    </div>

    <figure v-if="image" class="tutorial-cover__media">
      <img :src="image" :alt="imageAlt || title" loading="eager" decoding="async" fetchpriority="high" />
      <figcaption v-if="imageCaption">{{ imageCaption }}</figcaption>
    </figure>
  </section>
 </template>

<style scoped>
.tutorial-cover {
  padding: 1.4rem;
  background:
    linear-gradient(180deg, rgba(255, 252, 244, 0.95), rgba(244, 236, 221, 0.92)),
    radial-gradient(circle at top right, rgba(104, 75, 38, 0.13), transparent 35%);
  border: 1px solid var(--color-border-strong);
  border-radius: 28px;
  box-shadow: var(--shadow-panel);
}

.tutorial-cover--with-media {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(240px, 0.85fr);
  gap: 1.25rem;
  align-items: start;
}

.tutorial-cover__copy {
  min-width: 0;
}

.tutorial-cover__eyebrow {
  margin: 0 0 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.tutorial-cover__title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.tutorial-cover__subtitle {
  margin: 0.65rem 0 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-ink-soft);
}

.tutorial-cover__description {
  max-width: 65ch;
  margin: 1rem 0 0;
}

.tutorial-cover__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tutorial-cover__meta span {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(57, 89, 120, 0.08);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 0.8rem;
}

.tutorial-cover__media {
  margin: 0;
  display: grid;
  gap: 0.7rem;
}

.tutorial-cover__media img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 22px;
  border: 1px solid var(--color-border-strong);
  box-shadow: 0 12px 24px rgba(69, 49, 23, 0.1);
}

.tutorial-cover__media figcaption {
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--color-ink-soft);
}

@media (max-width: 900px) {
  .tutorial-cover--with-media {
    grid-template-columns: 1fr;
  }
}
</style>
