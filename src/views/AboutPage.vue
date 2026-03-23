<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import { aboutContent } from '../content/about/about'
</script>

<template>
  <SiteShell :eyebrow="aboutContent.eyebrow" :title="aboutContent.title" :lede="aboutContent.lede">
    <div class="page-stack">
      <SectionFrame v-for="section in aboutContent.sections" :key="section.id" :title="section.title">
        <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <ul v-if="section.links?.length">
          <li v-for="link in section.links" :key="link.label">
            <a v-if="link.href" :href="link.href" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
            <span v-else>{{ link.label }}</span>
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
