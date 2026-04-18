<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SiteShell from '../../components/layout/SiteShell.vue'
import SectionFrame from '../../components/ui/SectionFrame.vue'
import { apps } from '../../content/apps/apps'

const props = defineProps({
  appId: {
    type: String,
    required: true,
  },
})

const app = computed(() => apps[props.appId])
</script>

<template>
  <SiteShell
    v-if="app"
    :title="app.name"
    :lede="app.description"
    :meta="[app.tagline]"
    wide
  >
    <div class="app-detail">
      <section class="app-detail__access ui-surface-card ui-surface-card--soft">
        <div class="app-detail__access-copy">
          <h2>{{ app.access.label }}</h2>
          <p class="app-detail__access-text">
            <template v-if="app.access.href">
              Start here to open the live app or download page directly.
            </template>
            <template v-else>
              A public launch link is not yet available, but the project repository is linked below.
            </template>
          </p>
          <p v-if="app.id === 'proteus'" class="app-detail__access-note">
            Proteus is available as a download for Apple silicon Macs, Windows, and Linux. For other operating systems, please use the installation instructions provided on GitHub.
          </p>
        </div>

        <div class="app-detail__access-actions">
          <a
            v-if="app.access.href"
            :href="app.access.href"
            class="app-detail__launch ui-button-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ app.access.label }}
          </a>
          <p v-else class="app-detail__placeholder">
            <span class="ui-chip">Coming soon!</span>
          </p>

          <RouterLink
            v-if="app.howToUse"
            :to="app.howToUse.to"
            class="app-detail__launch ui-button-link ui-button--secondary"
          >
            {{ app.howToUse.label }}
          </RouterLink>

          <a :href="app.github.href" class="app-detail__launch ui-button-link ui-button--secondary" target="_blank" rel="noreferrer noopener">
            {{ app.github.label }}
          </a>

          <RouterLink
            v-if="app.resources"
            :to="app.resources.to"
            class="app-detail__launch ui-button-link ui-button--secondary"
          >
            {{ app.resources.label }}
          </RouterLink>
        </div>
      </section>

      <div class="app-detail__content">
        <SectionFrame title="What it supports">
          <ul class="app-detail__feature-list">
            <li v-for="feature in app.features" :key="feature">{{ feature }}</li>
          </ul>
        </SectionFrame>
      </div>
    </div>
  </SiteShell>
</template>

<style scoped>
.app-detail {
  display: grid;
  gap: 1.15rem;
}

.app-detail__access {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(220px, 0.9fr);
  gap: 1rem;
  align-items: center;
  padding: 1.1rem 1.15rem;
}

.app-detail__content {
  display: grid;
  gap: 1rem;
}

.app-detail__label {
  margin: 0;
}

.app-detail__access-copy h2,
.app-detail__access-copy p,
.app-detail__placeholder {
  margin: 0;
}

.app-detail__access-copy {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-height: 100%;
}

.app-detail__access-copy h2 {
  font-size: clamp(1.45rem, 2.2vw, 2rem);
}

.app-detail__access-text {
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}

.app-detail__access-note {
  margin-top: auto;
  font-family: var(--font-sans);
  font-size: 0.94rem;
  font-style: italic;
  color: var(--color-ink-soft);
}

.app-detail__access-actions {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  align-content: center;
}

.app-detail__launch {
  width: fit-content;
}

.app-detail__placeholder {
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}

.app-detail__feature-list {
  margin: 0;
  padding-left: 1.15rem;
}

.app-detail__feature-list li + li {
  margin-top: 0.45rem;
}

:deep(.page-hero__lede) {
  color: rgba(52, 38, 22, 0.9);
}

:deep(.page-hero__meta-item) {
  color: rgba(52, 38, 22, 0.92);
  background: rgba(250, 244, 233, 0.94);
  border-color: rgba(106, 83, 43, 0.24);
}

@media (max-width: 760px) {
  .app-detail__access {
    grid-template-columns: 1fr;
  }

  .app-detail__access-actions {
    justify-items: stretch;
  }

  .app-detail__launch {
    width: 100%;
  }
}

@media (max-width: 680px) {
  .app-detail__access {
    padding: 1rem;
  }
}
</style>
