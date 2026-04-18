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
      <SectionFrame :id="aboutContent.overview.id" :title="aboutContent.overview.title" class="about-page__overview-frame">
        <div class="about-page__prose">
          <div class="about-page__overview-intro" v-if="aboutContent.overview.paragraphs.length">
            <figure class="about-page__manuscript-figure">
              <a
                href="https://www.e-codices.unifr.ch/en/list/one/bbb/0009"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  class="about-page__manuscript-image"
                  src="/images/bibliography/bern-burgerbibliothek-cod-9.png"
                  alt="Manuscript page from Bern, Burgerbibliothek, Cod. 9."
                />
              </a>
              <figcaption class="about-page__manuscript-caption">
                <a
                  href="https://www.e-codices.unifr.ch/en/list/one/bbb/0009"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Bern, Burgerbibliothek, Cod. 9
                </a>
              </figcaption>
            </figure>
            <template
              v-for="(paragraph, paragraphIndex) in aboutContent.overview.paragraphs"
              :key="`${aboutContent.overview.id}-${paragraphIndex}`"
            >
              <p class="about-page__paragraph about-page__paragraph--intro">
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

              <p
                v-if="paragraphIndex === 0 && aboutContent.overview.resources"
                :id="aboutContent.overview.resources.id"
                class="about-page__resource-link-row"
                aria-label="Resources link"
              >
                <a
                  :href="aboutContent.overview.resources.href"
                  class="ui-button-link ui-button--secondary"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {{ aboutContent.overview.resources.label }}
                </a>
              </p>
            </template>
          </div>
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
              <RouterLink :to="app.to" class="ui-button-link">Open app</RouterLink>
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
        <p class="about-page__link-row ui-inline-links" aria-label="Bibliography link">
          <RouterLink :to="aboutContent.bibliography.to" class="ui-button-link ui-button--secondary">
            {{ aboutContent.bibliography.linkLabel }}
          </RouterLink>
        </p>
      </SectionFrame>

      <SectionFrame :id="aboutContent.acknowledgements.id" :title="aboutContent.acknowledgements.title" tone="muted">
        <div class="about-page__logo-grid">
          <a
            v-for="logo in aboutContent.acknowledgements.logos"
            :key="logo.id"
            class="about-page__logo-card ui-surface-card ui-surface-card--soft"
            :class="{
              'about-page__logo-card--sub': logo.id === 'sub',
              'about-page__logo-card--uni-goettingen': logo.id === 'uni-goettingen',
            }"
            :href="logo.href"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img :src="logo.src" :alt="logo.alt" />
            <span class="about-page__logo-caption">{{ logo.label }}</span>
          </a>
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

:deep(.about-page__overview-frame.section-frame) {
  padding: 1.1rem 1.15rem;
  border-radius: 20px;
}

:deep(.about-page__overview-frame .section-frame__header) {
  margin-bottom: 0.75rem;
}

.about-page__prose {
  --about-prose-width: 76ch;
  width: 100%;
}

.about-page__overview-intro {
  max-width: none;
}

.about-page__overview-intro::after {
  content: '';
  display: block;
  clear: both;
}

.about-page__paragraph {
  margin: 0;
  line-height: 1.75;
  max-width: var(--about-prose-width);
}

.about-page__paragraph--intro {
  max-width: none;
}

.about-page__paragraph + .about-page__paragraph {
  margin-top: 1rem;
}

.about-page__paragraph:last-child {
  margin-bottom: 0;
}

.about-page__resource-link-row {
  display: flex;
  margin: 0.75rem 0 0;
}

.about-page__resource-link-row > .ui-button-link {
  width: fit-content;
  max-width: 100%;
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
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.15rem;
}

.about-page__link-row > .ui-button-link {
  flex: 1 1 0;
  min-width: 0;
  width: 100%;
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

.about-page__manuscript-figure {
  float: right;
  width: clamp(11.05425rem, 20.88025vw, calc(var(--about-prose-width) * 0.614125));
  max-width: 100%;
  margin: 0 1rem 0.85rem 1rem;
  display: grid;
  gap: 0.45rem;
  justify-items: center;
}

.about-page__manuscript-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid rgba(106, 83, 43, 0.18);
  box-shadow: 0 12px 28px rgba(69, 49, 23, 0.12);
}

.about-page__manuscript-caption {
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--color-ink-muted);
  text-align: center;
}

.about-page__manuscript-caption a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.12em;
}

.about-page__logo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.95rem;
}

.about-page__logo-card {
  display: grid;
  gap: 0.85rem;
  place-items: center;
  text-align: center;
  padding: 1rem;
  text-decoration: none;
}

.about-page__logo-card img {
  width: auto;
  max-width: 100%;
  max-height: 82px;
  object-fit: contain;
}

.about-page__logo-card--sub img {
  max-height: 164px;
}

.about-page__logo-card--uni-goettingen img {
  background:
    linear-gradient(135deg, rgba(74, 89, 103, 0.94), rgba(39, 51, 63, 0.96));
  padding: 0.95rem 1rem;
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    0 10px 24px rgba(31, 40, 50, 0.18);
}

.about-page__logo-caption {
  margin: 0;
  font-size: 0.92rem;
  color: var(--color-ink-soft);
}

@media (max-width: 720px) {
  .about-page__resource-link-row > .ui-button-link {
    width: 100%;
  }

  .about-page__manuscript-figure {
    float: none;
    width: min(100%, var(--about-prose-width));
    margin: 0 0 0.85rem;
  }

  .about-page__paragraph--intro {
    max-width: var(--about-prose-width);
  }

  .about-page__app-grid,
  .about-page__tutorial-grid,
  .about-page__logo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
