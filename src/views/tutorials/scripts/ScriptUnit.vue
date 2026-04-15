<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import HtmlArticle from '../../../components/tutorials/HtmlArticle.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { getScriptUnit, scriptUnits, scriptsOverview } from '../../../content/tutorials/scripts/scripts'

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
  return previous ? { label: previous.title, to: `/tutorials/scripts/${previous.slug}` } : null
})

const next = computed(() => {
  const following = scriptUnits[index.value + 1]
  return following ? { label: following.title, to: `/tutorials/scripts/${following.slug}` } : null
})
</script>

<template>
  <TutorialShell
    v-if="unit"
    :crumbs="[
      { label: 'Tutorials', to: '/tutorials' },
      { label: scriptsOverview.title, to: '/tutorials/scripts' },
      { label: unit.title, to: `/tutorials/scripts/${unit.slug}` },
    ]"
    :items="sidebarItems"
    sidebar-title="Units"
    :back-link="{ label: `Back to ${scriptsOverview.title}`, to: '/tutorials/scripts' }"
    :eyebrow="scriptsOverview.title"
    :title="unit.title"
    :subtitle="unit.dates"
    :meta="[`Unit ${unit.numeral}`]"
  >
    <div class="page-stack">
      <HtmlArticle :source-path="unit.sourcePath" selector="main.content" :route-map="routeMap" :asset-map="unit.assetMap" />

      <PrevNextNav :prev="prev" :next="next" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}
</style>
