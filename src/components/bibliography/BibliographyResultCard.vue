<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="bibliography-result-card">
    <div class="bibliography-result-card__meta">
      <span>{{ item.itemTypeLabel }}</span>
      <span>{{ item.year }}</span>
    </div>

    <h2 class="bibliography-result-card__title">
      <a :href="item.zoteroUrl" target="_blank" rel="noreferrer noopener">{{ item.title }}</a>
    </h2>

    <p class="bibliography-result-card__creators">{{ item.creators }}</p>
    <p v-if="item.publicationLine" class="bibliography-result-card__publication">{{ item.publicationLine }}</p>
    <p v-if="item.abstract" class="bibliography-result-card__abstract">{{ item.abstract }}</p>

    <div v-if="item.tags?.length" class="bibliography-result-card__tags">
      <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
    </div>

    <div class="bibliography-result-card__actions">
      <a :href="item.zoteroUrl" target="_blank" rel="noreferrer noopener">Open in Zotero</a>
      <a v-if="item.sourceUrl" :href="item.sourceUrl" target="_blank" rel="noreferrer noopener">Open source</a>
      <a v-else-if="item.doi" :href="`https://doi.org/${item.doi}`" target="_blank" rel="noreferrer noopener">Open DOI</a>
    </div>
  </article>
</template>

<style scoped>
.bibliography-result-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-panel);
}

.bibliography-result-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.bibliography-result-card__meta span {
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  background: rgba(57, 89, 120, 0.08);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 0.78rem;
}

.bibliography-result-card__title {
  margin: 0;
  font-size: 1.3rem;
}

.bibliography-result-card__title a {
  text-decoration: none;
  color: inherit;
}

.bibliography-result-card__creators,
.bibliography-result-card__publication,
.bibliography-result-card__abstract {
  margin: 0;
}

.bibliography-result-card__creators {
  font-family: var(--font-sans);
  color: var(--color-ink);
}

.bibliography-result-card__publication,
.bibliography-result-card__abstract {
  color: var(--color-ink-soft);
}

.bibliography-result-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bibliography-result-card__tags span {
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: rgba(212, 182, 113, 0.15);
  color: var(--color-branch);
  font-family: var(--font-sans);
  font-size: 0.76rem;
}

.bibliography-result-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: var(--font-sans);
  font-size: 0.92rem;
}
</style>
