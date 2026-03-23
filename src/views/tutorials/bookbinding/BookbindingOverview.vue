<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import BookbindingWorkshop from '../../../components/tutorials/BookbindingWorkshop.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { bookbindingChapters, bookbindingOverview, workshopHotspots } from '../../../content/tutorials/bookbinding/bookbinding'

const sidebarItems = computed(() =>
  bookbindingChapters.map((chapter) => ({
    number: chapter.unit,
    label: chapter.title,
    to: `/tutorials/bookbinding/${chapter.slug}`,
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: '/tutorials' }, { label: 'Bookbinding', to: '/tutorials/bookbinding' }]"
    :items="sidebarItems"
    sidebar-title="Workshop chapters"
    :back-link="{ label: 'Back to Tutorials', to: '/tutorials' }"
    eyebrow="Tutorials"
    :title="bookbindingOverview.title"
    :description="bookbindingOverview.lede"
    :meta="['Immersive workshop', 'Nine chapters']"
  >
    <div class="page-stack">
      <SectionFrame title="Workshop orientation" tone="muted">
        <p v-for="paragraph in bookbindingOverview.introduction" :key="paragraph">{{ paragraph }}</p>
      </SectionFrame>

      <SectionFrame title="Scriptorium scene">
        <BookbindingWorkshop :image="bookbindingOverview.workshopImage" :hotspots="workshopHotspots" />
      </SectionFrame>

      <div class="chapter-grid">
        <RouterLink v-for="chapter in bookbindingChapters" :key="chapter.slug" :to="`/tutorials/bookbinding/${chapter.slug}`" class="chapter-grid__card">
          <p>Unit {{ chapter.numeral }}</p>
          <h2>{{ chapter.title }}</h2>
          <span>{{ chapter.description }}</span>
        </RouterLink>
      </div>

      <PrevNextNav :next="{ label: bookbindingChapters[0].title, to: `/tutorials/bookbinding/${bookbindingChapters[0].slug}` }" />
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
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-panel);
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
}

.chapter-grid__card:hover {
  transform: translateY(-3px);
  border-color: var(--color-branch);
  box-shadow: 0 18px 38px rgba(69, 49, 23, 0.13);
}

.chapter-grid__card p {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: var(--color-primary);
}

.chapter-grid__card h2,
.chapter-grid__card span {
  margin: 0;
}

.chapter-grid__card span {
  line-height: 1.55;
  color: var(--color-ink-soft);
}
</style>
