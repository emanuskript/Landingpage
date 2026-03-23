<script setup>
import { computed } from 'vue'
import SectionFrame from '../ui/SectionFrame.vue'
import GlossaryRichText from './GlossaryRichText.vue'
import CitationList from '../ui/CitationList.vue'
import { scriptUnits } from '../../content/tutorials/scripts/scripts'

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
})

const relatedUnits = computed(() =>
  scriptUnits.filter((unit) => props.entry.relatedScripts?.includes(unit.slug)),
)
</script>

<template>
  <div class="timeline-entry-panel">
    <SectionFrame>
      <p class="timeline-entry-panel__period">{{ entry.period }}</p>
      <h2 class="timeline-entry-panel__title">{{ entry.title }}</h2>
      <p class="timeline-entry-panel__summary">{{ entry.summary }}</p>
    </SectionFrame>

    <SectionFrame v-for="section in entry.sections" :key="section.title" :title="section.title">
      <GlossaryRichText v-for="paragraph in section.paragraphs" :key="paragraph" :text="paragraph" />
    </SectionFrame>

    <SectionFrame v-if="relatedUnits.length" tone="muted" title="Related script lessons">
      <p class="timeline-entry-panel__links">
        <RouterLink v-for="unit in relatedUnits" :key="unit.slug" :to="`/tutorials/scripts/${unit.slug}`">
          {{ unit.title }}
        </RouterLink>
      </p>
    </SectionFrame>

    <SectionFrame v-if="entry.references?.length" tone="muted">
      <CitationList title="Selected references" :items="entry.references" />
    </SectionFrame>
  </div>
</template>

<style scoped>
.timeline-entry-panel {
  display: grid;
  gap: 1rem;
}

.timeline-entry-panel__period {
  margin: 0 0 0.4rem;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.timeline-entry-panel__title {
  margin: 0;
  font-size: 2rem;
}

.timeline-entry-panel__summary {
  margin: 0.8rem 0 0;
}

.timeline-entry-panel__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1rem;
  margin: 0;
}

.timeline-entry-panel__links a {
  font-family: var(--font-sans);
}
</style>
