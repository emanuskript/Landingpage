<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import { bibliographyContent } from '../content/bibliography/bibliography'
</script>

<template>
  <SiteShell :eyebrow="bibliographyContent.eyebrow" :title="bibliographyContent.title" :lede="bibliographyContent.lede">
    <div class="page-stack">
      <SectionFrame title="Kerko / Zotero integration shell">
        <p v-if="bibliographyContent.kerkoBaseUrl">
          <a :href="bibliographyContent.kerkoBaseUrl" target="_blank" rel="noreferrer noopener">Open the live bibliography</a>
        </p>
        <p v-else>Kerko search can be connected here when the public endpoint is available.</p>
      </SectionFrame>

      <SectionFrame title="Current public references" tone="muted">
        <ul>
          <li v-for="group in bibliographyContent.zoteroGroups" :key="group.label">
            <a :href="group.href" target="_blank" rel="noreferrer noopener">{{ group.label }}</a>
          </li>
        </ul>
      </SectionFrame>
    </div>
  </SiteShell>
</template>

<style scoped>
.page-stack {
  display: grid;
  gap: 1rem;
}
</style>
