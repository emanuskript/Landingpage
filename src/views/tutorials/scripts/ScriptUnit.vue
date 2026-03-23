<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import HtmlArticle from '../../../components/tutorials/HtmlArticle.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { getScriptUnit, scriptUnits } from '../../../content/tutorials/scripts/scripts'

const props = defineProps({
  unitSlug: {
    type: String,
    required: true,
  },
})

const unit = computed(() => getScriptUnit(props.unitSlug))
const index = computed(() => scriptUnits.findIndex((item) => item.slug === props.unitSlug))

const sidebarItems = computed(() =>
  scriptUnits.map((item) => ({
    number: item.unit,
    label: item.title,
    to: `/tutorials/scripts/${item.slug}`,
    active: item.slug === props.unitSlug,
  })),
)

const routeMap = computed(() =>
  scriptUnits.reduce(
    (map, item, itemIndex) => {
      map[`unit${String(itemIndex + 1).padStart(2, '0')}.html`] = `/tutorials/scripts/${item.slug}`
      return map
    },
    { 'index.html': '/tutorials/scripts' },
  ),
)

const prev = computed(() => {
  const previous = scriptUnits[index.value - 1]
  return previous ? { label: previous.title, to: `/tutorials/scripts/${previous.slug}` } : { label: 'Scripts overview', to: '/tutorials/scripts' }
})

const next = computed(() => {
  const following = scriptUnits[index.value + 1]
  return following ? { label: following.title, to: `/tutorials/scripts/${following.slug}` } : { label: 'Ductus gallery', to: '/tutorials/scripts/ductus' }
})
</script>

<template>
  <TutorialShell
    v-if="unit"
    :crumbs="[
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'Scripts', to: '/tutorials/scripts' },
      { label: unit.title, to: `/tutorials/scripts/${unit.slug}` },
    ]"
    :items="sidebarItems"
    sidebar-title="Units"
    :back-link="{ label: 'Back to Scripts', to: '/tutorials/scripts' }"
    eyebrow="Scripts"
    :title="unit.title"
    :subtitle="unit.dates"
    :description="unit.summary"
    :meta="[`Unit ${unit.numeral}`]"
  >
    <div class="page-stack">
      <div class="page-grid">
        <SectionFrame v-if="unit.timelineSlug" title="Timeline context">
          <p>Use the Historical Timeline to place this script within its broader political, institutional, and cultural context.</p>
          <RouterLink :to="`/tutorials/timeline/${unit.timelineSlug}`">Open related timeline entry</RouterLink>
        </SectionFrame>

        <SectionFrame v-if="unit.ductusImage" title="Ductus companion" tone="muted">
          <img :src="unit.ductusImage" :alt="unit.ductusLabel" class="page-grid__ductus" />
          <p>Compare the letter construction here with the ductus gallery to reinforce stroke order and visual recognition.</p>
          <RouterLink to="/tutorials/scripts/ductus">Open ductus gallery</RouterLink>
        </SectionFrame>
      </div>

      <HtmlArticle :source-path="unit.sourcePath" selector="main.content" :route-map="routeMap" />

      <PrevNextNav :prev="prev" :next="next" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

.page-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.page-grid__ductus {
  width: 100%;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.64);
}
</style>
