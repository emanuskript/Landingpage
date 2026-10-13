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
          <div class="app-detail__access-heading">
            <h2>{{ app.access.label }}</h2>
          </div>
          <p class="app-detail__access-text">{{ app.accessMessage }}</p>
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

          <details v-if="app.resources" class="app-detail__resource-tree">
            <summary class="app-detail__launch ui-button-link ui-button--secondary app-detail__resource-toggle">
              <span>{{ app.resources.label }}</span>
              <span class="app-detail__resource-caret" aria-hidden="true"></span>
            </summary>

            <div class="app-detail__resource-branches">
              <a
                v-for="resource in app.resources.items"
                :key="resource.href"
                :href="resource.href"
                class="app-detail__resource-link ui-button-link ui-button--secondary"
                target="_blank"
                rel="noreferrer noopener"
              >
                {{ resource.label }}
              </a>
            </div>
          </details>
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
  justify-content: center;
}

.app-detail__access-heading {
  display: block;
}

.app-detail__access-copy h2 {
  font-size: clamp(1.45rem, 2.2vw, 2rem);
}

.app-detail__access-text {
  font-family: var(--font-sans);
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

.app-detail__resource-tree {
  width: min(100%, 28rem);
  justify-self: center;
}

.app-detail__resource-tree summary {
  list-style: none;
}

.app-detail__resource-tree summary::-webkit-details-marker {
  display: none;
}

.app-detail__resource-toggle {
  width: 100%;
  justify-content: space-between;
  text-align: left;
  white-space: normal;
}

.app-detail__resource-caret {
  width: 0.72rem;
  height: 0.72rem;
  flex: 0 0 auto;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-12%);
  transition: transform var(--transition-fast);
}

.app-detail__resource-tree[open] .app-detail__resource-caret {
  transform: rotate(225deg) translateY(-12%);
}

.app-detail__resource-branches {
  position: relative;
  display: grid;
  gap: 0.55rem;
  width: 100%;
  margin-top: 0.65rem;
  padding-left: 1.2rem;
}

.app-detail__resource-branches::before {
  content: '';
  position: absolute;
  left: 0.32rem;
  top: 0.2rem;
  bottom: 0.55rem;
  width: 1px;
  background: linear-gradient(180deg, rgba(127, 100, 57, 0.64), rgba(127, 100, 57, 0.18));
}

.app-detail__resource-link {
  position: relative;
  width: 100%;
  min-height: 40px;
  justify-content: flex-start;
  padding: 0.58rem 0.82rem;
  font-size: 0.8rem;
  line-height: 1.35;
  white-space: normal;
  text-align: left;
}

.app-detail__resource-link::before {
  content: '';
  position: absolute;
  left: -0.86rem;
  top: 50%;
  width: 0.72rem;
  height: 1px;
  background: rgba(127, 100, 57, 0.52);
  transform: translateY(-50%);
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

  .app-detail__resource-tree {
    width: 100%;
  }
}

@media (max-width: 680px) {
  .app-detail__access {
    padding: 1rem;
  }
}
</style>
