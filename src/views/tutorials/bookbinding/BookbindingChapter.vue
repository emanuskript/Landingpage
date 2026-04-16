<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import TutorialContentRenderer from '../../../components/tutorials/TutorialContentRenderer.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { getCodicologyPath, routePaths } from '../../../config/siteLinks'
import { bookbindingChapters, bookbindingOverview, getBookbindingChapter } from '../../../content/tutorials/bookbinding/bookbinding'

const props = defineProps({
  chapterSlug: {
    type: String,
    required: true,
  },
})

const chapter = computed(() => getBookbindingChapter(props.chapterSlug))
const index = computed(() => bookbindingChapters.findIndex((item) => item.slug === chapter.value?.slug))

const prev = computed(() => {
  const previous = bookbindingChapters[index.value - 1]
  return previous ? { label: previous.title, to: getCodicologyPath(previous.slug) } : { label: 'Tutorial overview', to: getCodicologyPath() }
})

const next = computed(() => {
  const following = bookbindingChapters[index.value + 1]
  return following ? { label: following.title, to: getCodicologyPath(following.slug) } : null
})

const unitMeta = computed(() => {
  if (!chapter.value) return []

  const meta = [`Unit ${chapter.value.numeral}`]
  if (chapter.value.author) {
    meta.push(`Contributed by ${chapter.value.author}`)
  }
  return meta
})
</script>

<template>
  <TutorialShell
    v-if="chapter"
    :crumbs="[
      { label: 'Tutorials', to: routePaths.tutorialsIndex },
      { label: 'The Creation of a Medieval Codex', to: getCodicologyPath() },
      { label: chapter.title, to: getCodicologyPath(chapter.slug) },
    ]"
    eyebrow="Codicology"
    :title="chapter.title"
    :description="chapter.description"
    :subtitle="bookbindingOverview.title"
    :meta="unitMeta"
  >
    <div class="page-stack">
      <TutorialContentRenderer :blocks="chapter.blocks" />

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
