<script setup>
import TutorialBreadcrumb from '../navigation/TutorialBreadcrumb.vue'
import TutorialSidebar from '../navigation/TutorialSidebar.vue'
import TutorialCover from './TutorialCover.vue'

defineProps({
  crumbs: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  sidebarTitle: {
    type: String,
    default: 'Navigation',
  },
  backLink: {
    type: Object,
    default: null,
  },
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  meta: {
    type: Array,
    default: () => [],
  },
  coverImage: {
    type: String,
    default: '',
  },
  coverImageAlt: {
    type: String,
    default: '',
  },
  coverImageCaption: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="tutorial-shell">
    <div class="tutorial-shell__inner">
      <TutorialBreadcrumb class="tutorial-shell__breadcrumb" :crumbs="crumbs" />
      <TutorialCover
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        :description="description"
        :meta="meta"
        :image="coverImage"
        :image-alt="coverImageAlt"
        :image-caption="coverImageCaption"
      />

      <div class="tutorial-shell__layout" :class="{ 'tutorial-shell__layout--no-sidebar': !items.length }">
        <TutorialSidebar v-if="items.length" :title="sidebarTitle" :items="items" :back-link="backLink" />
        <main class="tutorial-shell__content">
          <slot />
        </main>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tutorial-shell {
  padding: 2.3rem 0 5rem;
}

.tutorial-shell__inner {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.tutorial-shell__breadcrumb {
  margin-bottom: 1.1rem;
}

.tutorial-shell__layout {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
  gap: 1.6rem;
  margin-top: 1.6rem;
  align-items: start;
}

.tutorial-shell__layout--no-sidebar {
  grid-template-columns: minmax(0, 1fr);
}

.tutorial-shell__content {
  min-width: 0;
}

@media (max-width: 900px) {
  .tutorial-shell__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .tutorial-shell {
    padding: 1.25rem 0 3rem;
  }

  .tutorial-shell__inner {
    width: min(1180px, calc(100% - 1rem));
  }

  .tutorial-shell__breadcrumb {
    margin-bottom: 0.8rem;
  }

  .tutorial-shell__layout {
    gap: 1rem;
    margin-top: 1rem;
  }
}
</style>
