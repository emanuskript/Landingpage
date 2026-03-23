<script setup>
import { computed } from 'vue'
import SiteShell from '../../../components/layout/SiteShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import { findGlossaryTerm } from '../../../composables/useGlossary'

const props = defineProps({
  term: {
    type: String,
    required: true,
  },
})

const entry = computed(() => findGlossaryTerm(props.term))
</script>

<template>
  <SiteShell
    v-if="entry"
    eyebrow="Glossary"
    :title="entry.term"
    :lede="entry.definition"
    :meta="[entry.category]"
  >
    <SectionFrame title="Entry">
      <p>{{ entry.definition }}</p>
      <p v-if="entry.aliases?.length"><strong>Aliases:</strong> {{ entry.aliases.join(', ') }}</p>
      <p><RouterLink to="/tutorials/glossary">Back to glossary index</RouterLink></p>
    </SectionFrame>
  </SiteShell>
</template>
