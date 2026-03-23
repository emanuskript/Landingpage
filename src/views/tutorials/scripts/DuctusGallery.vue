<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import SectionFrame from '../../../components/ui/SectionFrame.vue'
import DuctusGalleryComponent from '../../../components/tutorials/DuctusGallery.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { ductusEntries, scriptUnits, scriptsOverview } from '../../../content/tutorials/scripts/scripts'

const sidebarItems = computed(() =>
  scriptUnits.map((item) => ({
    number: item.unit,
    label: item.title,
    to: `/tutorials/scripts/${item.slug}`,
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'Scripts', to: '/tutorials/scripts' },
      { label: 'Ductus', to: '/tutorials/scripts/ductus' },
    ]"
    :items="sidebarItems"
    sidebar-title="Main units"
    :back-link="{ label: 'Back to Scripts', to: '/tutorials/scripts' }"
    eyebrow="Scripts"
    title="Ductus"
    description="A visual reinforcement layer built from the local Ductus image plates."
    :meta="['Companion gallery', 'Letterform practice']"
  >
    <div class="page-stack">
      <SectionFrame title="How to use the gallery" tone="muted">
        <p>{{ scriptsOverview.ductusNote }}</p>
      </SectionFrame>

      <SectionFrame title="Ductus plates">
        <DuctusGalleryComponent :entries="ductusEntries" />
      </SectionFrame>

      <PrevNextNav :prev="{ label: 'Scripts overview', to: '/tutorials/scripts' }" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}
</style>
