<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import FurtherReadingBlock from '../../../components/tutorials/FurtherReadingBlock.vue'
import { routePaths } from '../../../config/siteLinks'
import { getMsiPath, msiLessons, msiOverview } from '../../../content/tutorials/msi/msi'

const sidebarItems = computed(() =>
  msiLessons.map((lesson) => ({
    number: lesson.number,
    label: lesson.title,
    to: getMsiPath(lesson.slug),
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[
      { label: 'Tutorials', to: routePaths.tutorialsIndex },
      { label: msiOverview.title, to: getMsiPath() },
    ]"
    :items="sidebarItems"
    sidebar-title="MSI units"
    :back-link="{ label: 'Back to Tutorials', to: routePaths.tutorialsIndex }"
    eyebrow="Tutorials"
    :title="msiOverview.title"
    :description="msiOverview.lede"
    :meta="['Seven units', 'Equipment, Hoku, Proteus, and future applications']"
    :cover-image="msiOverview.coverImage"
    :cover-image-alt="msiOverview.coverAlt"
    :cover-image-caption="msiOverview.coverCaption"
  >
    <div class="page-stack">
      <SectionFrame title="Tutorial overview" tone="muted">
        <p v-for="paragraph in msiOverview.introduction" :key="paragraph">{{ paragraph }}</p>
        <ul>
          <li v-for="highlight in msiOverview.highlights" :key="highlight">{{ highlight }}</li>
        </ul>
      </SectionFrame>

      <div class="msi-overview__grid">
        <RouterLink
          v-for="lesson in msiLessons"
          :key="lesson.slug"
          :to="getMsiPath(lesson.slug)"
          class="msi-overview__card ui-surface-link"
        >
          <p class="ui-eyebrow">Unit {{ lesson.numeral }}</p>
          <h2>{{ lesson.title }}</h2>
          <span>{{ lesson.description }}</span>
        </RouterLink>
      </div>

      <SectionFrame title="Mentioned projects and links">
        <p>The MSI tutorial highlights the following projects and case studies:</p>
        <ul>
          <li v-for="project in msiOverview.projects" :key="project">{{ project }}</li>
          <li v-for="caseStudy in msiOverview.caseStudies" :key="caseStudy">{{ caseStudy }}</li>
        </ul>
      </SectionFrame>

      <FurtherReadingBlock title="MSI bibliography" :items="msiOverview.bibliography" />

      <PrevNextNav :next="{ label: msiLessons[0].title, to: getMsiPath(msiLessons[0].slug) }" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

.msi-overview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.msi-overview__card {
  display: grid;
  gap: 0.45rem;
  min-height: 100%;
  padding: 1rem 1.1rem;
}

.msi-overview__card p {
  margin: 0;
}

.msi-overview__card h2,
.msi-overview__card span {
  margin: 0;
}

.msi-overview__card span {
  line-height: 1.55;
  color: var(--color-ink-soft);
}
</style>
