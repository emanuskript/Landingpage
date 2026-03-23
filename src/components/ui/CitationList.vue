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
</script>

<template>
  <div class="citation-list">
    <h3 class="citation-list__title">{{ title }}</h3>
    <ul class="citation-list__items">
      <li v-for="item in items" :key="item.label || item">
        <template v-if="typeof item === 'string'">{{ item }}</template>
        <a v-else-if="item.href" :href="item.href" target="_blank" rel="noreferrer noopener">{{ item.label }}</a>
        <span v-else>{{ item.label }}</span>
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
