<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  eyebrow: {
    type: String,
    default: '',
  },
  tone: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <section :class="['section-frame', `section-frame--${tone}`]">
    <header v-if="title || eyebrow" class="section-frame__header">
      <p v-if="eyebrow" class="section-frame__eyebrow ui-eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title" class="section-frame__title">{{ title }}</h2>
    </header>
    <div class="section-frame__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section-frame {
  position: relative;
  padding: 1.35rem;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-panel);
  overflow: hidden;
  content-visibility: auto;
  contain: layout paint style;
  contain-intrinsic-size: 1px 420px;
}

.section-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.24), transparent 40%),
    radial-gradient(circle at top right, rgba(212, 182, 113, 0.18), transparent 40%);
  pointer-events: none;
}

.section-frame--muted {
  background: var(--color-panel-muted);
}

.section-frame__header,
.section-frame__body {
  position: relative;
  z-index: 1;
}

.section-frame__header {
  margin-bottom: 1rem;
}

.section-frame__eyebrow {
  margin: 0 0 0.35rem;
}

.section-frame__title {
  margin: 0;
  font-size: 1.3rem;
}
</style>
