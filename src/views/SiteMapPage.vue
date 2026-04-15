<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import { siteMapSections } from '../config/siteLinks'
</script>

<template>
  <SiteShell
    eyebrow=""
    title="Site Map"
    lede="This page provides an overview of the main sections of the eManuSkript website."
    wide
  >
    <nav class="site-map-page" aria-label="Site map">
      <SectionFrame
        v-for="section in siteMapSections"
        :id="section.id"
        :key="section.id"
        :title="section.title"
        class="site-map-page__section"
      >
        <p v-if="section.description" class="site-map-page__section-copy">
          {{ section.description }}
        </p>

        <ol class="site-map-page__list">
          <li
            v-for="link in section.links"
            :key="link.id"
            class="site-map-page__item"
          >
            <RouterLink :to="link.to" class="site-map-page__link ui-surface-link">
              <span class="site-map-page__link-title">{{ link.label }}</span>
              <span v-if="link.description" class="site-map-page__link-description">
                {{ link.description }}
              </span>
            </RouterLink>
          </li>
        </ol>
      </SectionFrame>
    </nav>
  </SiteShell>
</template>

<style scoped>
.site-map-page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.15rem;
  align-items: start;
}

.site-map-page__section {
  min-height: 100%;
}

.site-map-page__section-copy {
  max-width: 34ch;
  margin: 0 0 1.2rem;
  line-height: 1.72;
  color: var(--color-ink-soft);
}

.site-map-page__list {
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: sitemap-entry;
}

.site-map-page__item {
  counter-increment: sitemap-entry;
}

.site-map-page__link {
  display: grid;
  gap: 0.35rem;
  min-height: 100%;
  padding: 1rem 1rem 1rem 1.1rem;
  border-color: var(--color-border-soft);
}

.site-map-page__link::before {
  content: counter(sitemap-entry, upper-roman);
  margin-bottom: 0.2rem;
  font-family: var(--font-sans);
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
}

.site-map-page__link-title {
  font-size: 1.08rem;
  line-height: 1.28;
}

.site-map-page__link-description {
  line-height: 1.64;
  color: var(--color-ink-soft);
}

@media (max-width: 720px) {
  .site-map-page {
    grid-template-columns: 1fr;
  }

  .site-map-page__section-copy {
    max-width: none;
  }
}
</style>
