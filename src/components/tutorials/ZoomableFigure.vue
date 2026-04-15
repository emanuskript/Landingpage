<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
})

const open = ref(false)
const shouldRender = ref(false)
const rootRef = ref(null)
let observer

function ensureVisible() {
  shouldRender.value = true
  observer?.disconnect()
  observer = undefined
}

function openFigure() {
  ensureVisible()
  open.value = true
}

onMounted(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    shouldRender.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        ensureVisible()
      }
    },
    { rootMargin: '360px 0px' },
  )

  if (rootRef.value) {
    observer.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="rootRef" class="zoomable-figure">
    <button class="zoomable-figure__button" type="button" @click="openFigure">
      <img
        v-if="shouldRender"
        :src="props.image"
        :alt="props.alt"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
      <div v-else class="zoomable-figure__placeholder" aria-hidden="true"></div>
      <span>Zoom</span>
    </button>

    <teleport to="body">
      <div v-if="open" class="zoomable-figure__overlay" @click.self="open = false">
        <button class="zoomable-figure__close" type="button" @click="open = false">Close</button>
        <img :src="props.image" :alt="props.alt" decoding="async" />
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.zoomable-figure__button {
  display: grid;
  gap: 0.55rem;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  text-align: left;
}

.zoomable-figure__button span {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-primary);
}

.zoomable-figure__button img {
  width: 100%;
  display: block;
  border-radius: 18px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 251, 243, 0.72);
}

.zoomable-figure__placeholder {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  border: 1px solid var(--color-border-strong);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.24), transparent 48%),
    rgba(244, 236, 221, 0.78);
}

.zoomable-figure__overlay {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 4rem 1rem 1rem;
  background: rgba(18, 17, 14, 0.78);
}

.zoomable-figure__overlay img {
  max-width: min(1200px, 92vw);
  max-height: 84vh;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

.zoomable-figure__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
}
</style>
