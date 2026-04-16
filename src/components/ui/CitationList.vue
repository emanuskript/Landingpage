<script setup>
defineProps({
  title: {
    type: String,
    default: 'Further reading',
  },
  items: {
    type: Array,
    default: () => [],
  },
})

function normalizeCitationQuotes(text) {
  if (typeof text !== 'string' || !text.length) return text

  return text
    .replace(/”([^”]+)“/g, '“$1”')
    .replace(/"([^"\n]+)"/g, '“$1”')
    .replace(/(^|[\s([\{])”/g, '$1“')
}

function citationLabel(item) {
  if (typeof item === 'string') return normalizeCitationQuotes(item)
  if (!item || typeof item !== 'object') return ''
  return normalizeCitationQuotes(item.label)
}
</script>

<template>
  <div class="citation-list">
    <h3 class="citation-list__title">{{ title }}</h3>
    <ul class="citation-list__items">
      <li v-for="item in items" :key="item.label || item">
        <template v-if="typeof item === 'string'">{{ citationLabel(item) }}</template>
        <RouterLink v-else-if="item.to" :to="item.to">{{ citationLabel(item) }}</RouterLink>
        <a v-else-if="item.href" :href="item.href" target="_blank" rel="noreferrer noopener">{{ citationLabel(item) }}</a>
        <span v-else>{{ citationLabel(item) }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.citation-list__title {
  margin-bottom: 0.85rem;
  font-size: 1rem;
}

.citation-list__items {
  margin: 0;
  padding-left: 1.15rem;
}

.citation-list__items li + li {
  margin-top: 0.45rem;
}
</style>
