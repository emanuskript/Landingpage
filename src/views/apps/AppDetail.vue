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
const isProteus = computed(() => app.value?.type === 'download')
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

      <SectionFrame :title="isProteus ? 'Downloads and installation' : 'Access'">
        <template v-if="isProteus">
          <p>{{ app.installGuidance }}</p>
          <div class="app-detail__downloads">
            <div v-for="platform in app.platforms" :key="platform.label" class="app-detail__download-card">
              <strong>{{ platform.label }}</strong>
              <a v-if="platform.url" :href="platform.url" target="_blank" rel="noreferrer noopener">Download</a>
              <span v-else>{{ platform.todo }}</span>
            </div>
          </div>
          <p class="app-detail__note">Release notes: {{ app.releaseNotes || 'Public release information will appear here.' }}</p>
          <p class="app-detail__todo">{{ app.downloadsNote }}</p>
        </template>
        <template v-else>
          <p v-if="app.launch.href">Open the public {{ app.name }} environment.</p>
          <p v-else>{{ app.launch.todo }}</p>
          <a
            v-if="app.launch.href"
            :href="app.launch.href"
            class="app-detail__launch"
            target="_blank"
            rel="noreferrer noopener"
          >
            {{ app.launch.label }}
          </a>
          <span v-else class="app-detail__launch app-detail__launch--disabled">{{ app.launch.label }}</span>
        </template>
      </SectionFrame>

      <SectionFrame title="Portal notes" tone="muted">
        <ul>
          <li v-for="note in app.notes" :key="note">{{ note }}</li>
        </ul>
      </SectionFrame>

      <SectionFrame v-if="isProteus" title="Screenshots" tone="muted">
        <p v-if="app.screenshots.length">Screenshots will render here from config.</p>
        <p v-else class="app-detail__todo">TODO: add Proteus screenshots when approved UI captures are available.</p>
      </SectionFrame>
    </div>
  </SiteShell>
</template>

<style scoped>
.app-detail {
  display: grid;
  gap: 1rem;
}

.app-detail__downloads {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}

.app-detail__download-card {
  display: grid;
  gap: 0.4rem;
  padding: 0.95rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid var(--color-border-soft);
}

.app-detail__launch {
  display: inline-flex;
  margin-top: 1rem;
  padding: 0.75rem 0.95rem;
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  font-family: var(--font-sans);
}

.app-detail__launch--disabled {
  background: var(--color-panel-muted);
  color: var(--color-ink-soft);
}

.app-detail__note {
  margin-top: 1rem;
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}

.app-detail__todo {
  margin-top: 0.8rem;
  font-family: var(--font-sans);
  color: var(--color-ink-soft);
}
</style>
