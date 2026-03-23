<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  hotspots: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="bookbinding-workshop">
    <img class="bookbinding-workshop__image" :src="image" alt="Bookbinding workshop scene" />

    <RouterLink
      v-for="hotspot in hotspots"
      :key="hotspot.id"
      class="bookbinding-workshop__hotspot"
      :to="`/tutorials/bookbinding/${hotspot.chapter}`"
      :style="{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }"
      :aria-label="hotspot.label"
    >
      <span>{{ hotspot.label }}</span>
    </RouterLink>
  </div>
</template>

<style scoped>
.bookbinding-workshop {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-panel);
}

.bookbinding-workshop__image {
  width: 100%;
  min-height: 420px;
  object-fit: cover;
}

.bookbinding-workshop__hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: rgba(24, 33, 44, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff4dc;
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.84rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  transition: transform var(--transition-base), background var(--transition-base);
}

.bookbinding-workshop__hotspot::before {
  content: '';
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  background: var(--color-gold);
  box-shadow: 0 0 0 6px rgba(212, 182, 113, 0.18);
}

.bookbinding-workshop__hotspot:hover {
  transform: translate(-50%, -50%) scale(1.04);
  background: rgba(57, 89, 120, 0.8);
}

@media (max-width: 700px) {
  .bookbinding-workshop__hotspot {
    max-width: 42vw;
    white-space: normal;
    text-align: center;
    justify-content: center;
  }
}
</style>
