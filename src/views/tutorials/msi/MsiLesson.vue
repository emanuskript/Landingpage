<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import FigureBlock from '../../../components/tutorials/FigureBlock.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import GlossaryRichText from '../../../components/tutorials/GlossaryRichText.vue'
import { getMsiLesson, msiLessons } from '../../../content/tutorials/msi/msi'

const props = defineProps({
  lessonSlug: {
    type: String,
    required: true,
  },
})

const lesson = computed(() => getMsiLesson(props.lessonSlug))
const currentIndex = computed(() => msiLessons.findIndex((item) => item.slug === props.lessonSlug))

const sidebarItems = computed(() =>
  msiLessons.map((item) => ({
    number: item.number,
    label: item.title,
    to: `/tutorials/msi/${item.slug}`,
    active: item.slug === props.lessonSlug,
  })),
)

const prev = computed(() => {
  const item = msiLessons[currentIndex.value - 1]
  return item ? { label: item.title, to: `/tutorials/msi/${item.slug}` } : { label: 'MSI overview', to: '/tutorials/msi' }
})

const next = computed(() => {
  const item = msiLessons[currentIndex.value + 1]
  return item ? { label: item.title, to: `/tutorials/msi/${item.slug}` } : null
})
</script>

<template>
  <TutorialShell
    v-if="lesson"
    :crumbs="[
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'MSI', to: '/tutorials/msi' },
      { label: lesson.title, to: `/tutorials/msi/${lesson.slug}` },
    ]"
    :items="sidebarItems"
    sidebar-title="Lessons"
    :back-link="{ label: 'Back to MSI', to: '/tutorials/msi' }"
    eyebrow="MSI"
    :title="lesson.title"
    :subtitle="lesson.subtitle"
    :description="lesson.intro"
    :meta="[lesson.heroNote]"
  >
    <div class="page-stack">
      <SectionFrame v-for="section in lesson.sections" :key="section.title" :title="section.title">
        <GlossaryRichText v-for="paragraph in section.paragraphs" :key="paragraph" :text="paragraph" />
      </SectionFrame>

      <SectionFrame v-if="lesson.figures?.length" title="Figures">
        <div class="figure-grid">
          <FigureBlock
            v-for="figure in lesson.figures"
            :key="figure.image"
            :image="figure.image"
            :alt="figure.alt"
            :caption="figure.caption"
            :detail="figure.detail"
          />
        </div>
      </SectionFrame>

      <SectionFrame v-if="lesson.bridgeToApp" title="Bridge to Proteus" tone="muted">
        <p>Continue into the Proteus app page for software downloads, installation guidance, and platform information.</p>
        <RouterLink to="/apps/proteus">Open the Proteus app page</RouterLink>
      </SectionFrame>

      <PrevNextNav :prev="prev" :next="next" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

.figure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
