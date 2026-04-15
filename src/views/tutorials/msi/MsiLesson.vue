<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import TutorialContentRenderer from '../../../components/tutorials/TutorialContentRenderer.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { routePaths } from '../../../config/siteLinks'
import { getMsiLesson, getMsiPath, msiLessons, msiOverview } from '../../../content/tutorials/msi/msi'

const props = defineProps({
  lessonSlug: {
    type: String,
    required: true,
  },
})

const lesson = computed(() => getMsiLesson(props.lessonSlug))
const index = computed(() => msiLessons.findIndex((item) => item.slug === lesson.value?.slug))

const sidebarItems = computed(() =>
  msiLessons.map((item) => ({
    number: item.number,
    label: item.title,
    to: getMsiPath(item.slug),
    active: item.slug === lesson.value?.slug,
  })),
)

const prev = computed(() => {
  const previous = msiLessons[index.value - 1]
  return previous ? { label: previous.title, to: getMsiPath(previous.slug) } : { label: 'MSI overview', to: getMsiPath() }
})

const next = computed(() => {
  const following = msiLessons[index.value + 1]
  return following ? { label: following.title, to: getMsiPath(following.slug) } : null
})

const lessonMeta = computed(() => {
  if (!lesson.value) return []
  return [`Unit ${lesson.value.numeral}`, 'MSI tutorial']
})
</script>

<template>
  <TutorialShell
    v-if="lesson"
    :crumbs="[
      { label: 'Tutorials', to: routePaths.tutorialsIndex },
      { label: msiOverview.title, to: getMsiPath() },
      { label: lesson.title, to: getMsiPath(lesson.slug) },
    ]"
    :items="sidebarItems"
    sidebar-title="MSI units"
    :back-link="{ label: 'Back to MSI overview', to: getMsiPath() }"
    eyebrow="MSI"
    :title="lesson.title"
    :subtitle="msiOverview.title"
    :description="lesson.intro"
    :meta="lessonMeta"
    :cover-image="lesson.coverImage"
    :cover-image-alt="lesson.coverImageAlt"
    :cover-image-caption="lesson.coverImageCaption"
  >
    <div class="page-stack">
      <TutorialContentRenderer :blocks="lesson.blocks" />
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
