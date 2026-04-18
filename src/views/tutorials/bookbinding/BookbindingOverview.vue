<script setup>
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import BookbindingWorkshop from '../../../components/tutorials/BookbindingWorkshop.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { getCodicologyPath, routePaths } from '../../../config/siteLinks'
import { bookbindingChapters, bookbindingOverview, workshopHotspots } from '../../../content/tutorials/bookbinding/bookbinding'
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: routePaths.tutorialsIndex }, { label: bookbindingOverview.title, to: getCodicologyPath() }]"
    eyebrow="Tutorials"
    :title="bookbindingOverview.title"
    :description="bookbindingOverview.lede"
  >
    <div class="page-stack">
      <BookbindingWorkshop :image="bookbindingOverview.workshopImage" :hotspots="workshopHotspots" />

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
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 320px));
  gap: 1rem;
  justify-content: center;
}

.chapter-grid__card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 0.55rem;
  align-content: start;
  text-align: left;
  min-width: 0;
  min-height: 100%;
  padding: 1.2rem;
}

.chapter-grid__card p {
  margin: 0;
}

.chapter-grid__card h2,
.chapter-grid__card span {
  margin: 0;
}

.chapter-grid__card h2 {
  font-size: 1.2rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.chapter-grid__card span {
  display: block;
  line-height: 1.55;
  color: var(--color-ink-soft);
  overflow-wrap: anywhere;
}

.chapter-grid__card--feature {
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.97), rgba(243, 233, 214, 0.94)),
    radial-gradient(circle at top right, rgba(57, 89, 120, 0.08), transparent 36%);
}

@media (min-width: 840px) {
  .chapter-grid__card--feature {
    grid-column: 2;
  }
}
</style>
