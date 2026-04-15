<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import { aboutContent } from '../content/about/about'
</script>

<template>
  <SiteShell
    :eyebrow="aboutContent.eyebrow"
    :title="aboutContent.title"
    :lede="aboutContent.lede"
    :meta="aboutContent.meta"
    wide
  >
    <div class="about-page">
      <SectionFrame :id="aboutContent.overview.id" :title="aboutContent.overview.title">
        <div class="about-page__prose">
          <p
            v-for="(paragraph, paragraphIndex) in aboutContent.overview.paragraphs"
            :key="`${aboutContent.overview.id}-${paragraphIndex}`"
            class="about-page__paragraph"
          >
            <template v-for="(segment, segmentIndex) in paragraph" :key="`${paragraphIndex}-${segmentIndex}`">
              <a
                v-if="segment.href"
                :href="segment.href"
                target="_blank"
                rel="noreferrer noopener"
              >
                {{ segment.text }}
              </a>
              <span v-else>{{ segment.text }}</span>
            </template>
          </p>
        </div>
      </SectionFrame>

      <SectionFrame :id="aboutContent.applications.id" :title="aboutContent.applications.title">
        <div class="about-page__app-grid">
          <article
            v-for="app in aboutContent.applications.items"
            :key="app.id"
            class="about-page__app-block ui-surface-card"
          >
            <h3>{{ app.title }}</h3>
            <p class="about-page__paragraph">{{ app.description }}</p>
            <p class="about-page__link-row ui-inline-links" aria-label="Project links">
              <a :href="app.githubHref" class="ui-button-link ui-button--secondary" target="_blank" rel="noreferrer noopener">GitHub</a>
            </p>
          </article>
        </div>
      </SectionFrame>

      <SectionFrame :id="aboutContent.tutorials.id" :title="aboutContent.tutorials.title">
        <p class="about-page__paragraph">{{ aboutContent.tutorials.intro }}</p>
        <div class="about-page__tutorial-grid">
          <RouterLink
            v-for="tutorial in aboutContent.tutorials.items"
            :key="tutorial.id"
            :to="tutorial.to"
            class="about-page__tutorial-card ui-surface-link"
          >
            <h3>{{ tutorial.title }}</h3>
            <p class="about-page__paragraph">{{ tutorial.summary }}</p>
          </RouterLink>
        </div>
      </SectionFrame>

      <SectionFrame :id="aboutContent.bibliography.id" :title="aboutContent.bibliography.title" tone="muted">
        <p class="about-page__paragraph">{{ aboutContent.bibliography.text }}</p>
      </SectionFrame>

      <SectionFrame :id="aboutContent.acknowledgements.id" :title="aboutContent.acknowledgements.title" tone="muted">
        <div class="about-page__logo-grid">
          <figure
            v-for="logo in aboutContent.acknowledgements.logos"
            :key="logo.id"
            class="about-page__logo-card ui-surface-card ui-surface-card--soft"
          >
            <img :src="logo.src" :alt="logo.alt" />
            <figcaption>{{ logo.label }}</figcaption>
          </figure>
        </div>
      </SectionFrame>
    </div>
  </SiteShell>
</template>

<style scoped>
.about-page {
  display: grid;
  gap: 1.2rem;
}

.about-page__prose {
  max-width: 76ch;
}

.about-page__paragraph {
  margin: 0;
  line-height: 1.75;
}

.about-page__paragraph + .about-page__paragraph {
  margin-top: 1rem;
}

.about-page__paragraph:last-child {
  margin-bottom: 0;
}

.about-page__app-grid,
.about-page__tutorial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.about-page__app-block {
  display: grid;
  gap: 0.85rem;
  padding: 1.1rem 1.15rem;
}

.about-page__app-block h3 {
  margin: 0;
}

.about-page__link-row {
  margin-top: 0.15rem;
}

.about-page__tutorial-card {
  display: grid;
  gap: 0.65rem;
  padding: 1rem 1.05rem;
}

.about-page__tutorial-card h3 {
  margin: 0;
}

.about-page__tutorial-card p {
  margin: 0;
  color: var(--color-ink-soft);
}

.about-page__logo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.95rem;
}

.about-page__logo-card {
  display: grid;
  gap: 0.85rem;
  place-items: center;
  text-align: center;
  padding: 1rem;
}

.about-page__logo-card img {
  width: auto;
  max-width: 100%;
  max-height: 82px;
  object-fit: contain;
}

.about-page__logo-card figcaption {
  margin: 0;
  font-size: 0.92rem;
  color: var(--color-ink-soft);
}

@media (max-width: 720px) {
  .about-page__app-grid,
  .about-page__tutorial-grid,
  .about-page__logo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
