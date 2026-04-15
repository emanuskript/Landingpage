<script setup>
import { computed } from 'vue'
import TutorialShell from '../../../components/tutorials/TutorialShell.vue'
import ScriptCard from '../../../components/tutorials/ScriptCard.vue'
import PrevNextNav from '../../../components/navigation/PrevNextNav.vue'
import { scriptUnits, scriptsOverview } from '../../../content/tutorials/scripts/scripts'

const sidebarItems = computed(() =>
  scriptUnits.map((unit) => ({
    number: unit.unit,
    label: unit.title,
    to: `/tutorials/scripts/${unit.slug}`,
  })),
)
</script>

<template>
  <TutorialShell
    :crumbs="[{ label: 'Tutorials', to: '/tutorials' }, { label: scriptsOverview.title, to: '/tutorials/scripts' }]"
    :items="sidebarItems"
    sidebar-title="Units"
    :back-link="{ label: 'Back to Tutorials', to: '/tutorials' }"
    eyebrow="Tutorials"
    :title="scriptsOverview.title"
    :subtitle="scriptsOverview.subtitle"
    :description="scriptsOverview.lede"
    :meta="['Twelve units']"
  >
    <div class="page-stack">
      <div class="script-grid">
        <ScriptCard v-for="unit in scriptUnits" :key="unit.slug" :unit="unit" />
      </div>

      <PrevNextNav :next="{ label: scriptUnits[0].title, to: `/tutorials/scripts/${scriptUnits[0].slug}` }" />
    </div>
  </TutorialShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}

.script-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
