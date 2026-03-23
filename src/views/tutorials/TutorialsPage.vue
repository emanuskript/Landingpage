<script setup>
import SiteShell from '../../components/layout/SiteShell.vue'
import SectionFrame from '../../components/ui/SectionFrame.vue'
import { tutorialCollections, tutorialsOverview } from '../../content/tutorials'
</script>

<template>
  <SiteShell :eyebrow="tutorialsOverview.eyebrow" :title="tutorialsOverview.title" :lede="tutorialsOverview.lede" wide>
    <div class="tutorials-page">
      <SectionFrame title="How to explore">
        <p v-for="paragraph in tutorialsOverview.introduction" :key="paragraph">{{ paragraph }}</p>
      </SectionFrame>

      <div class="tutorials-page__grid">
        <RouterLink v-for="item in tutorialCollections" :key="item.slug" :to="item.route" class="tutorials-page__card">
          <p>{{ item.kind }}</p>
          <h2>{{ item.title }}</h2>
          <span>{{ item.summary }}</span>
        </RouterLink>
      </div>
    </div>
  </SiteShell>
</template>

<style scoped>
.tutorials-page {
  display: grid;
  gap: 1rem;
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
  border-radius: 24px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-panel);
  color: inherit;
  text-decoration: none;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.tutorials-page__card:hover {
  transform: translateY(-3px);
  border-color: var(--color-branch);
  box-shadow: 0 18px 38px rgba(69, 49, 23, 0.13);
}

.tutorials-page__card p {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  color: var(--color-primary);
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
