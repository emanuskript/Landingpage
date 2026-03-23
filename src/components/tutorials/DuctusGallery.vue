<script setup>
defineProps({
  entries: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="ductus-gallery">
    <article v-for="entry in entries" :key="entry.slug" class="ductus-gallery__item">
      <img :src="entry.image" :alt="entry.title" loading="lazy" />
      <div>
        <h2>{{ entry.title }}</h2>
        <RouterLink :to="`/tutorials/scripts/${entry.relatedUnit}`">Related lesson</RouterLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
.ductus-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.ductus-gallery__item {
  display: grid;
  gap: 0.8rem;
  padding: 1rem;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 22px;
  box-shadow: var(--shadow-panel);
}

.ductus-gallery__item img {
  width: 100%;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.75);
}

.ductus-gallery__item h2 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
}
</style>
