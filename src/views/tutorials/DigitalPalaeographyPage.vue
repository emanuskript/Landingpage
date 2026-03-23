<script setup>
import { computed } from 'vue'
import TutorialShell from '../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../components/ui/SectionFrame.vue'
import FigureBlock from '../../components/tutorials/FigureBlock.vue'
import FurtherReadingBlock from '../../components/tutorials/FurtherReadingBlock.vue'
import GlossaryRichText from '../../components/tutorials/GlossaryRichText.vue'
import PrevNextNav from '../../components/navigation/PrevNextNav.vue'
import { digitalPalaeographyContent } from '../../content/tutorials/digitalPalaeography'

const sidebarItems = computed(() =>
  digitalPalaeographyContent.concepts.map((concept, index) => ({
    number: index + 1,
    label: concept.title,
    to: { path: '/tutorials/digital-palaeography', hash: `#${concept.id}` },
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: '/tutorials' }, { label: 'Digital Palaeography', to: '/tutorials/digital-palaeography' }]"
    :items="sidebarItems"
    sidebar-title="Concept map"
    :back-link="{ label: 'Back to Tutorials', to: '/tutorials' }"
    eyebrow="Tutorials"
    :title="digitalPalaeographyContent.title"
    :description="digitalPalaeographyContent.lede"
    :meta="['Mind map', 'Digital methods']"
  >
    <div class="page-stack">
      <SectionFrame title="How to read this unit">
        <GlossaryRichText v-for="paragraph in digitalPalaeographyContent.intro" :key="paragraph" :text="paragraph" />
      </SectionFrame>

      <SectionFrame title="Live concept map" eyebrow="OrgPad">
        <FigureBlock
          :image="digitalPalaeographyContent.mindMap.image"
          :alt="digitalPalaeographyContent.mindMap.alt"
          caption="Digital Palaeography concept map"
          :detail="digitalPalaeographyContent.mindMap.note"
        />
        <p class="page-stack__mindmap-action">
          <a :href="digitalPalaeographyContent.mindMap.fullScreenUrl" target="_blank" rel="noreferrer noopener">
            Open the live concept map
          </a>
        </p>
      </SectionFrame>

      <div class="concept-grid">
        <SectionFrame v-for="concept in digitalPalaeographyContent.concepts" :id="concept.id" :key="concept.id" :title="concept.title">
          <GlossaryRichText :text="concept.summary" />
          <ul>
            <li v-for="bullet in concept.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <p v-if="concept.bibliographyLink" class="concept-grid__action">
            <RouterLink :to="concept.bibliographyLink.to">{{ concept.bibliographyLink.label }}</RouterLink>
          </p>
        </SectionFrame>
      </div>

      <FurtherReadingBlock :items="digitalPalaeographyContent.resources" title="Project resources" />
      <FurtherReadingBlock :items="digitalPalaeographyContent.furtherReading" title="How to continue" />
      <PrevNextNav :prev="{ label: 'Palaeography', to: '/tutorials/palaeography' }" :next="{ label: 'MSI', to: '/tutorials/msi' }" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

.page-stack__mindmap-action {
  margin-top: 1rem;
}

.page-stack__mindmap-action a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.1rem;
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.92rem;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
  box-shadow: 0 10px 24px rgba(57, 89, 120, 0.24);
}

.page-stack__mindmap-action a:hover {
  transform: translateY(-1px);
  background: var(--color-branch);
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.concept-grid__action {
  margin-top: 1rem;
}

.concept-grid__action a {
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: 0.92rem;
  text-decoration: none;
}

.concept-grid__action a:hover {
  text-decoration: underline;
}
</style>
