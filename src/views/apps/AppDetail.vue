<script setup>
import { computed } from 'vue'
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
    :eyebrow="app.statusLabel"
    :title="app.name"
    :lede="app.description"
    :meta="[app.tagline]"
    wide
  >
    <div class="app-detail">
      <SectionFrame title="Overview">
        <p>{{ app.description }}</p>
        <ul>
          <li v-for="feature in app.features" :key="feature">{{ feature }}</li>
        </ul>
      </SectionFrame>

      <SectionFrame title="Project links">
        <div class="app-detail__link-grid">
          <article class="app-detail__link-card ui-surface-card ui-surface-card--soft">
            <p class="app-detail__label ui-eyebrow">App access</p>
            <h3>{{ app.access.label }}</h3>
            <p v-if="app.access.href">
              <a :href="app.access.href" class="app-detail__launch ui-button-link" target="_blank" rel="noreferrer noopener">
                {{ app.access.label }}
              </a>
            </p>
            <p v-else class="app-detail__placeholder">{{ app.access.todo }}</p>
          </article>

          <article class="app-detail__link-card ui-surface-card ui-surface-card--soft">
            <p class="app-detail__label ui-eyebrow">GitHub</p>
            <h3>{{ app.name }} repository</h3>
            <p>
              <a :href="app.github.href" class="app-detail__launch ui-button-link ui-button--secondary" target="_blank" rel="noreferrer noopener">
                {{ app.github.label }}
              </a>
            </p>
          </article>
        </div>
      </SectionFrame>
    </div>
  </SiteShell>
</template>

<style scoped>
.app-detail {
  display: grid;
  gap: 1rem;
}

.app-detail__link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
}

.app-detail__link-card {
  display: grid;
  gap: 0.55rem;
  padding: 0.95rem;
}

.app-detail__label {
  margin: 0;
}

.app-detail__link-card h3,
.app-detail__link-card p {
  margin: 0;
}

.app-detail__launch {
  width: fit-content;
}

.app-detail__placeholder {
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}
</style>
