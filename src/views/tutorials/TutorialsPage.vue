<script setup>
import SiteShell from '../../components/layout/SiteShell.vue'
import { tutorialCollections, tutorialsOverview } from '../../content/tutorials'
</script>

<template>
  <SiteShell :eyebrow="tutorialsOverview.eyebrow" :title="tutorialsOverview.title" :lede="tutorialsOverview.lede" wide>
    <div class="tutorials-page">
      <div class="tutorials-page__grid">
        <RouterLink v-for="item in tutorialCollections" :key="item.slug" :to="item.route" class="tutorials-page__card ui-surface-link">
          <p class="ui-eyebrow">{{ item.kind }}</p>
          <h2>{{ item.title }}</h2>
          <span>{{ item.summary }}</span>
        </RouterLink>
      </div>
    </div>
  </SiteShell>
</template>

<style scoped>
.tutorials-page {
  display: block;
}

.tutorials-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.tutorials-page__card {
  display: grid;
  gap: 0.55rem;
  min-height: 100%;
  padding: 1.2rem;
}

.tutorials-page__card p {
  margin: 0;
}

.tutorials-page__card h2 {
  margin: 0;
  font-size: 1.2rem;
}

.tutorials-page__card span {
  line-height: 1.55;
  color: var(--color-ink-soft);
}
</style>
