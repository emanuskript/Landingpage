<script setup>
import { computed } from 'vue'
import TimelineEntryPanel from './TimelineEntryPanel.vue'

const props = defineProps({
  entries: {
    type: Array,
    required: true,
  },
  eras: {
    type: Array,
    required: true,
  },
  activeSlug: {
    type: String,
    default: '',
  },
})

const activeEntry = computed(() => props.entries.find((entry) => entry.slug === props.activeSlug) || props.entries[0])
</script>

<template>
  <section class="timeline-viewer">
    <aside class="timeline-viewer__rail">
      <div class="timeline-viewer__eras">
        <span v-for="era in eras" :key="era.id" :style="{ '--era-color': era.color }">{{ era.label }}</span>
      </div>

      <nav class="timeline-viewer__list" aria-label="Timeline entries">
        <RouterLink
          v-for="entry in entries"
          :key="entry.slug"
          :to="`/tutorials/timeline/${entry.slug}`"
          :class="['timeline-viewer__item', { 'timeline-viewer__item--active': entry.slug === activeEntry.slug }]"
        >
          <span class="timeline-viewer__item-period">{{ entry.period }}</span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="timeline-viewer__panel">
      <TimelineEntryPanel :entry="activeEntry" />
    </div>
  </section>
</template>

<style scoped>
.timeline-viewer {
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: 1.2rem;
}

.timeline-viewer__rail {
  display: grid;
  gap: 1rem;
}

.timeline-viewer__eras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.timeline-viewer__eras span {
  padding: 0.38rem 0.65rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--era-color) 14%, white);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 0.76rem;
}

.timeline-viewer__list {
  display: grid;
  gap: 0.8rem;
}

.timeline-viewer__item {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 22px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-panel);
  color: inherit;
  text-decoration: none;
}

.timeline-viewer__item--active {
  border-color: var(--color-branch);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.65), rgba(241, 233, 219, 0.92));
}

.timeline-viewer__item-period {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-primary);
}

.timeline-viewer__item span:last-child {
  color: var(--color-ink-soft);
  font-size: 0.94rem;
}

@media (max-width: 900px) {
  .timeline-viewer {
    grid-template-columns: 1fr;
  }
}
</style>
