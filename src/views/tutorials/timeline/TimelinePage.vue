<script setup>
import { computed } from 'vue'
import SiteShell from '../../../components/layout/SiteShell.vue'
import TimelineViewer from '../../../components/tutorials/TimelineViewer.vue'
import { timelineEntries, timelineEras, timelineOverview } from '../../../content/tutorials/timeline/timeline'

const props = defineProps({
  entrySlug: {
    type: String,
    default: '',
  },
})

const activeSlug = computed(() => props.entrySlug || timelineEntries[0]?.slug || '')
</script>

<template>
  <SiteShell :eyebrow="timelineOverview.eyebrow" :title="timelineOverview.title" :lede="timelineOverview.lede" :meta="['Four entries', 'Split-screen context viewer']" wide>
    <div class="timeline-page">
      <TimelineViewer :entries="timelineEntries" :eras="timelineEras" :active-slug="activeSlug" />
    </div>
  </SiteShell>
</template>

<style scoped>
.timeline-page {
  display: grid;
  gap: 1rem;
}
</style>
