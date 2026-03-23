<script setup>
import { computed } from 'vue'
import TutorialShell from '../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../components/ui/SectionFrame.vue'
import PrevNextNav from '../../components/navigation/PrevNextNav.vue'
import GlossaryRichText from '../../components/tutorials/GlossaryRichText.vue'
import { palaeographyOverview } from '../../content/tutorials/palaeography'

const sidebarItems = computed(() =>
  palaeographyOverview.sections.map((section, index) => ({
    number: index + 1,
    label: section.title,
    to: { path: '/tutorials/palaeography', hash: `#${section.id}` },
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: '/tutorials' }, { label: 'Palaeography', to: '/tutorials/palaeography' }]"
    :items="sidebarItems"
    sidebar-title="This page"
    :back-link="{ label: 'Back to Tutorials', to: '/tutorials' }"
    eyebrow="Tutorials"
    :title="palaeographyOverview.title"
    :description="palaeographyOverview.lede"
    :meta="['Orientation page']"
  >
    <div class="page-stack">
      <SectionFrame v-for="section in palaeographyOverview.sections" :id="section.id" :key="section.id" :title="section.title">
        <GlossaryRichText v-for="paragraph in section.paragraphs" :key="paragraph" :text="paragraph" />
        <p v-for="link in section.links || []" :key="link.label">
          <RouterLink :to="link.to">{{ link.label }}</RouterLink>
        </p>
      </SectionFrame>

      <PrevNextNav :next="{ label: 'Digital Palaeography', to: '/tutorials/digital-palaeography' }" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}
</style>
