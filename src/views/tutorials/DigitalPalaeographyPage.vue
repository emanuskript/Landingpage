<script setup>
import { digitalPalaeographyPage } from '../../content/tutorials/digitalPalaeography'
</script>

<template>
  <main class="digipal-page">
    <div class="digipal-page__inner">
      <details class="digipal-page__panel" open>
        <summary class="digipal-page__summary">
          <span>Introduction</span>
          <span class="digipal-page__summary-icon" aria-hidden="true"></span>
        </summary>

        <div class="digipal-page__body">
          <p v-for="paragraph in digitalPalaeographyPage.introduction" :key="paragraph">
            {{ paragraph }}
          </p>

          <h2 class="digipal-page__subheading">Topics</h2>
          <ul class="digipal-page__list">
            <li v-for="topic in digitalPalaeographyPage.topics" :key="topic">
              {{ topic }}
            </li>
          </ul>

          <h2 class="digipal-page__subheading">How the mind map works</h2>
          <ul class="digipal-page__list">
            <li v-for="instruction in digitalPalaeographyPage.instructions" :key="instruction">
              {{ instruction }}
            </li>
          </ul>
        </div>
      </details>

      <section class="digipal-page__panel" aria-labelledby="digital-palaeography-heading">
        <div class="digipal-page__body digipal-page__body--map">
          <header class="digipal-page__header">
            <h1 id="digital-palaeography-heading">Digital Palaeography</h1>
            <p class="digipal-page__topics-line">
              Topics: {{ digitalPalaeographyPage.topics.join(' · ') }}
            </p>
          </header>

          <iframe
            class="digipal-page__iframe"
            :src="digitalPalaeographyPage.orgPadEmbedUrl"
            title="Digital Palaeography OrgPad mind map"
            frameborder="0"
            allowfullscreen
          >
            This browser cannot display the embedded mind map.
          </iframe>

          <p class="digipal-page__note">
            If the embedded view does not load, open the mind map directly in
            <a :href="digitalPalaeographyPage.orgPadDirectUrl" target="_blank" rel="noreferrer">OrgPad</a>.
          </p>
        </div>
      </section>

      <section class="digipal-page__panel" aria-labelledby="digital-palaeography-references">
        <div class="digipal-page__body">
          <h2 id="digital-palaeography-references">References</h2>
          <p>
            <a :href="digitalPalaeographyPage.zoteroUrl" target="_blank" rel="noreferrer">
              Zotero Library
            </a>
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.digipal-page {
  padding: clamp(2.6rem, 5vw, 4rem) 0 5rem;
}

.digipal-page__inner {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  gap: 1.1rem;
}

.digipal-page__panel {
  margin: 0;
  padding: 0;
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.94), rgba(248, 240, 224, 0.9)),
    var(--color-panel);
  border: 1px solid var(--color-border-strong);
  border-radius: 28px;
  box-shadow: var(--shadow-panel);
}

.digipal-page__summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.35rem 1.45rem;
  cursor: pointer;
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  font-weight: 700;
  list-style: none;
}

.digipal-page__summary::-webkit-details-marker {
  display: none;
}

.digipal-page__summary-icon {
  flex: 0 0 auto;
  width: 0.9rem;
  height: 0.9rem;
  border-right: 2px solid var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  transform: rotate(45deg);
  transition: transform var(--transition-base);
}

.digipal-page__panel[open] .digipal-page__summary-icon {
  transform: rotate(225deg);
}

.digipal-page__body {
  display: grid;
  gap: 1rem;
  padding: 0 1.45rem 1.45rem;
}

.digipal-page__body p,
.digipal-page__body ul,
.digipal-page__body h1,
.digipal-page__body h2 {
  margin: 0;
}

.digipal-page__body--map {
  gap: 1.1rem;
  padding-top: 1.45rem;
}

.digipal-page__header {
  display: grid;
  gap: 0.65rem;
}

.digipal-page__header h1 {
  font-size: clamp(2.1rem, 5vw, 3.7rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.digipal-page__topics-line {
  max-width: 72ch;
  color: var(--color-ink-soft);
}

.digipal-page__subheading {
  margin-top: 0.3rem;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
}

.digipal-page__list {
  padding-left: 1.2rem;
  color: var(--color-ink-soft);
}

.digipal-page__list li + li {
  margin-top: 0.5rem;
}

.digipal-page__iframe {
  display: block;
  width: 100%;
  min-height: clamp(30rem, 78vh, 56rem);
  border: 0;
  border-radius: 20px;
  background: rgba(236, 224, 201, 0.4);
}

.digipal-page__note {
  color: var(--color-ink-soft);
  font-size: 0.96rem;
}

.digipal-page__note a,
.digipal-page__body a {
  color: var(--color-primary);
}

@media (max-width: 780px) {
  .digipal-page {
    padding-top: 2rem;
  }

  .digipal-page__inner {
    width: min(1120px, calc(100% - 1rem));
  }

  .digipal-page__summary,
  .digipal-page__body {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .digipal-page__iframe {
    min-height: clamp(24rem, 70vh, 42rem);
    border-radius: 16px;
  }
}
</style>
