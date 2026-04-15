<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import BookbindingWorkshop from '../../../components/tutorials/BookbindingWorkshop.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { getCodicologyPath, routePaths } from '../../../config/siteLinks'
import { bookbindingChapters, bookbindingOverview, workshopHotspots } from '../../../content/tutorials/bookbinding/bookbinding'

const sidebarItems = computed(() =>
  bookbindingChapters.map((chapter) => ({
    number: chapter.unit,
    label: chapter.title,
    to: getCodicologyPath(chapter.slug),
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: routePaths.tutorialsIndex }, { label: bookbindingOverview.title, to: getCodicologyPath() }]"
    :items="sidebarItems"
    sidebar-title="Workshop chapters"
    :back-link="{ label: 'Back to Tutorials', to: routePaths.tutorialsIndex }"
    eyebrow="Tutorials"
    :title="bookbindingOverview.title"
    :description="bookbindingOverview.lede"
    :meta="['Interactive workshop', 'Ten units', 'Includes Islamic codicology unit']"
    :cover-image="bookbindingOverview.coverImage"
    :cover-image-alt="bookbindingOverview.coverAlt"
    :cover-image-caption="bookbindingOverview.coverCaption"
  >
    <div class="page-stack">
      <SectionFrame title="How to use this tutorial" tone="muted">
        <p v-for="paragraph in bookbindingOverview.introduction" :key="paragraph">{{ paragraph }}</p>
      </SectionFrame>

      <SectionFrame title="Scriptorium scene">
        <BookbindingWorkshop :image="bookbindingOverview.workshopImage" :hotspots="workshopHotspots" />
      </SectionFrame>

      <div class="chapter-grid">
        <RouterLink
          v-for="chapter in bookbindingChapters"
          :key="chapter.slug"
          :to="getCodicologyPath(chapter.slug)"
          class="chapter-grid__card ui-surface-link"
          :class="{ 'chapter-grid__card--feature': chapter.unit === 10 }"
        >
          <p class="ui-eyebrow">Unit {{ chapter.numeral }}</p>
          <h2>{{ chapter.title }}</h2>
          <span>{{ chapter.description }}</span>
        </RouterLink>
      </div>

      <PrevNextNav :next="{ label: bookbindingChapters[0].title, to: getCodicologyPath(bookbindingChapters[0].slug) }" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.chapter-grid__card {
  display: grid;
  gap: 0.45rem;
  min-height: 100%;
  padding: 1rem;
}

.chapter-grid__card p {
  margin: 0;
}

.chapter-grid__card h2,
.chapter-grid__card span {
  margin: 0;
}

.chapter-grid__card span {
  line-height: 1.55;
  color: var(--color-ink-soft);
}

.chapter-grid__card--feature {
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.97), rgba(243, 233, 214, 0.94)),
    radial-gradient(circle at top right, rgba(57, 89, 120, 0.08), transparent 36%);
}
</style>
