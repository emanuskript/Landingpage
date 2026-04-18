<script setup>
import ZoomableFigure from './ZoomableFigure.vue'

defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <figure class="figure-block">
    <ZoomableFigure :image="image" :alt="alt" />
    <figcaption>
      <strong>{{ caption }}</strong>
      <span v-if="detail">{{ detail }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.figure-block {
  margin: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.75rem;
  height: 100%;
  content-visibility: auto;
  contain: layout paint style;
  contain-intrinsic-size: 1px 360px;
}

.figure-block :deep(.zoomable-figure) {
  height: 100%;
}

.figure-block figcaption {
  display: grid;
  gap: 0.3rem;
  margin-top: 0;
  color: var(--color-ink-soft);
  font-family: var(--font-sans);
  font-size: 0.92rem;
}

.figure-block figcaption strong {
  color: var(--color-ink);
}
</style>
