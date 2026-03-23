<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import { aboutContent } from '../content/about/about'
</script>

<template>
  <SiteShell :eyebrow="aboutContent.eyebrow" :title="aboutContent.title" :lede="aboutContent.lede" wide>
    <div class="about-layout">
      <aside class="about-layout__sidebar">
        <SectionFrame title="Page index" tone="muted">
          <nav aria-label="About page index">
            <ul class="about-index">
              <li><a :href="`#${aboutContent.basicInfo.id}`">{{ aboutContent.basicInfo.title }}</a></li>
              <li><a :href="`#${aboutContent.howToUse.id}`">{{ aboutContent.howToUse.title }}</a></li>
              <li><a :href="`#${aboutContent.projectLinks.id}`">{{ aboutContent.projectLinks.title }}</a></li>
              <li><a :href="`#${aboutContent.acknowledgements.id}`">{{ aboutContent.acknowledgements.title }}</a></li>
              <li><a :href="`#${aboutContent.partnerLogos.id}`">{{ aboutContent.partnerLogos.title }}</a></li>
            </ul>
          </nav>
        </SectionFrame>
      </aside>

      <div class="about-stack">
        <SectionFrame :id="aboutContent.basicInfo.id" :title="aboutContent.basicInfo.title">
          <p>{{ aboutContent.basicInfo.placeholder }}</p>
          <ul>
            <li v-for="note in aboutContent.basicInfo.notes" :key="note">{{ note }}</li>
          </ul>
        </SectionFrame>

        <SectionFrame :id="aboutContent.howToUse.id" :title="aboutContent.howToUse.title">
          <p>{{ aboutContent.howToUse.placeholder }}</p>
          <div class="about-index-grid">
            <RouterLink v-for="item in aboutContent.howToUse.indexItems" :key="item.label" :to="item.to" class="about-index-grid__item">
              {{ item.label }}
            </RouterLink>
          </div>
        </SectionFrame>

        <SectionFrame :id="aboutContent.projectLinks.id" :title="aboutContent.projectLinks.title">
          <p>{{ aboutContent.projectLinks.intro }}</p>
          <div class="about-link-groups">
            <article v-for="group in aboutContent.projectLinks.groups" :key="group.id" class="about-link-group">
              <h3>{{ group.title }}</h3>
              <p>{{ group.note }}</p>
              <ul class="about-link-list">
                <li v-for="link in group.links" :key="link.label">
                  <RouterLink v-if="link.to" :to="link.to">{{ link.label }}</RouterLink>
                  <a v-else-if="link.href" :href="link.href" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
                  <span v-else>{{ link.label }}</span>
                  <span v-if="link.todo" class="about-link-list__todo">{{ link.todo }}</span>
                </li>
              </ul>
            </article>
          </div>
        </SectionFrame>

        <SectionFrame :id="aboutContent.acknowledgements.id" :title="aboutContent.acknowledgements.title">
          <p>{{ aboutContent.acknowledgements.placeholder }}</p>
        </SectionFrame>

        <SectionFrame :id="aboutContent.partnerLogos.id" :title="aboutContent.partnerLogos.title">
          <div class="about-logos">
            <div v-for="logo in aboutContent.partnerLogos.items" :key="logo.id" class="about-logo-card">
              <img v-if="logo.image" :src="logo.image" :alt="`${logo.label} logo`" />
              <div v-else class="about-logo-card__placeholder" aria-hidden="true">{{ logo.label }}</div>
              <p>{{ logo.todo }}</p>
            </div>
          </div>
        </SectionFrame>
      </div>
    </div>
  </SiteShell>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1rem;
}

.about-layout__sidebar {
  position: sticky;
  top: 1rem;
  align-self: start;
}

.about-stack {
  display: grid;
  gap: 1rem;
}

.about-index {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1rem;
}

.about-index-grid,
.about-link-groups,
.about-logos {
  display: grid;
  gap: 0.9rem;
}

.about-index-grid {
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  margin-top: 1rem;
}

.about-index-grid__item,
.about-link-group,
.about-logo-card {
  padding: 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid var(--color-border-soft);
  text-decoration: none;
}

.about-link-group h3 {
  margin: 0 0 0.35rem;
}

.about-link-group p {
  color: var(--color-ink-soft);
}

.about-link-list {
  margin: 0;
  padding-left: 1rem;
}

.about-link-list__todo {
  display: block;
  margin-top: 0.2rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  color: var(--color-ink-soft);
}

.about-logos {
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.about-logo-card {
  text-align: center;
}

.about-logo-card__placeholder {
  display: grid;
  place-items: center;
  min-height: 110px;
  border-radius: 18px;
  border: 1px dashed var(--color-border-strong);
  background: rgba(57, 89, 120, 0.08);
  font-family: var(--font-display);
  font-size: 1.2rem;
}

@media (max-width: 880px) {
  .about-layout {
    grid-template-columns: 1fr;
  }

  .about-layout__sidebar {
    position: static;
  }
}
</style>
