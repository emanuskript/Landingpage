<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import HtmlArticle from '../../../components/tutorials/HtmlArticle.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { bookbindingChapters, getBookbindingChapter } from '../../../content/tutorials/bookbinding/bookbinding'

const props = defineProps({
  chapterSlug: {
    type: String,
    required: true,
  },
})

const chapter = computed(() => getBookbindingChapter(props.chapterSlug))
const index = computed(() => bookbindingChapters.findIndex((item) => item.slug === props.chapterSlug))

const sidebarItems = computed(() =>
  bookbindingChapters.map((item) => ({
    number: item.unit,
    label: item.title,
    to: `/tutorials/bookbinding/${item.slug}`,
    active: item.slug === props.chapterSlug,
  })),
)

const prev = computed(() => {
  const previous = bookbindingChapters[index.value - 1]
  return previous ? { label: previous.title, to: `/tutorials/bookbinding/${previous.slug}` } : { label: 'Bookbinding workshop', to: '/tutorials/bookbinding' }
})

const next = computed(() => {
  const following = bookbindingChapters[index.value + 1]
  return following ? { label: following.title, to: `/tutorials/bookbinding/${following.slug}` } : null
})
</script>

<template>
  <TutorialShell
    v-if="chapter"
    :crumbs="[
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'Bookbinding', to: '/tutorials/bookbinding' },
      { label: chapter.title, to: `/tutorials/bookbinding/${chapter.slug}` },
    ]"
    :items="sidebarItems"
    sidebar-title="Chapters"
    :back-link="{ label: 'Back to workshop', to: '/tutorials/bookbinding' }"
    eyebrow="Bookbinding"
    :title="chapter.title"
    :description="chapter.description"
    :meta="[`Unit ${chapter.numeral}`]"
  >
    <div class="page-stack">
      <HtmlArticle source-path="/source/bookbinding/tutorial.html" :selector="`section#${chapter.sourceId}`" />

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
