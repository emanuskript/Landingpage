<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import FigureBlock from '../../../components/tutorials/FigureBlock.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { msiLessons, msiOverview } from '../../../content/tutorials/msi/msi'

const sidebarItems = computed(() =>
  msiLessons.map((lesson) => ({
    number: lesson.number,
    label: lesson.title,
    to: `/tutorials/msi/${lesson.slug}`,
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: '/tutorials' }, { label: 'MSI', to: '/tutorials/msi' }]"
    :items="sidebarItems"
    sidebar-title="Lesson index"
    :back-link="{ label: 'Back to Tutorials', to: '/tutorials' }"
    eyebrow="Tutorials"
    :title="msiOverview.title"
    :description="msiOverview.lede"
    :meta="['Six lessons', 'Image-rich course']"
  >
    <div class="page-stack">
      <SectionFrame title="Course structure">
        <p v-for="paragraph in msiOverview.introduction" :key="paragraph">{{ paragraph }}</p>
        <ul>
          <li v-for="highlight in msiOverview.highlights" :key="highlight">{{ highlight }}</li>
        </ul>
      </SectionFrame>

      <SectionFrame title="Course image">
        <FigureBlock
          image="/images/msi/365_baader.png"
          alt="MSI course figure from the provided local tutorial images."
          caption="Representative manuscript image from the local MSI source folder"
          detail="Converted from the supplied TIFF source for responsive web display."
        />
      </SectionFrame>

      <div class="msi-overview__grid">
        <RouterLink v-for="lesson in msiLessons" :key="lesson.slug" :to="`/tutorials/msi/${lesson.slug}`" class="msi-overview__card">
          <p>Lesson {{ lesson.number }}</p>
          <h2>{{ lesson.title }}</h2>
          <span>{{ lesson.subtitle }}</span>
        </RouterLink>
      </div>

      <PrevNextNav :next="{ label: msiLessons[0].title, to: `/tutorials/msi/${msiLessons[0].slug}` }" />
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
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-panel);
  color: inherit;
  text-decoration: none;
  transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
}

.msi-overview__card:hover {
  transform: translateY(-3px);
  border-color: var(--color-branch);
  box-shadow: 0 18px 38px rgba(69, 49, 23, 0.13);
}

.msi-overview__card p {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-primary);
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
