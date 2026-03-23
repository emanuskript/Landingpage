<script setup>
import { computed } from 'vue'
import GlossaryPopover from '../glossary/GlossaryPopover.vue'
import { annotateGlossary } from '../../composables/useGlossary'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'p',
  },
})

const segments = computed(() => annotateGlossary(props.text))
</script>

<template>
  <component :is="tag" class="glossary-rich-text">
    <template v-for="(segment, index) in segments" :key="`${segment.value}-${index}`">
      <span v-if="segment.type === 'text'">{{ segment.value }}</span>
      <GlossaryPopover
        v-else
        :label="segment.value"
        :definition="segment.term.definition"
        :slug="segment.term.slug"
      />
    </template>
  </component>
</template>
