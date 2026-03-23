<script setup>
import SectionFrame from '../ui/SectionFrame.vue'
import CitationList from '../ui/CitationList.vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Further reading',
  },
})
</script>

<template>
  <SectionFrame tone="muted">
    <CitationList :title="title" :items="items" />
  </SectionFrame>
</template>
