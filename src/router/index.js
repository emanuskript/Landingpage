import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/HomePage.vue') },
  { path: '/apps', name: 'apps', component: () => import('../views/apps/AppsPage.vue') },
  { path: '/apps/mergen', name: 'app-mergen', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'mergen' } },
  { path: '/apps/seshat', name: 'app-seshat', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'seshat' } },
  { path: '/apps/proteus', name: 'app-proteus', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'proteus' } },
  { path: '/apps/fenius', name: 'app-fenius', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'fenius' } },
  { path: '/tutorials', name: 'tutorials', component: () => import('../views/tutorials/TutorialsPage.vue') },
  { path: '/tutorials/palaeography', name: 'tutorial-palaeography', component: () => import('../views/tutorials/PalaeographyPage.vue') },
  { path: '/tutorials/digital-palaeography', name: 'tutorial-digipal', component: () => import('../views/tutorials/DigitalPalaeographyPage.vue') },
  { path: '/tutorials/msi', name: 'tutorial-msi', component: () => import('../views/tutorials/msi/MsiOverview.vue') },
  { path: '/tutorials/msi/:lessonSlug', name: 'tutorial-msi-lesson', component: () => import('../views/tutorials/msi/MsiLesson.vue'), props: true },
  { path: '/tutorials/scripts', name: 'tutorial-scripts', component: () => import('../views/tutorials/scripts/ScriptsOverview.vue') },
  { path: '/tutorials/scripts/ductus', name: 'tutorial-ductus', component: () => import('../views/tutorials/scripts/DuctusGallery.vue') },
  { path: '/tutorials/scripts/:unitSlug', name: 'tutorial-scripts-unit', component: () => import('../views/tutorials/scripts/ScriptUnit.vue'), props: true },
  { path: '/tutorials/bookbinding', name: 'tutorial-bookbinding', component: () => import('../views/tutorials/bookbinding/BookbindingOverview.vue') },
  { path: '/tutorials/bookbinding/:chapterSlug', name: 'tutorial-bookbinding-chapter', component: () => import('../views/tutorials/bookbinding/BookbindingChapter.vue'), props: true },
  { path: '/tutorials/timeline', name: 'tutorial-timeline', component: () => import('../views/tutorials/timeline/TimelinePage.vue') },
  { path: '/tutorials/timeline/:entrySlug', name: 'tutorial-timeline-entry', component: () => import('../views/tutorials/timeline/TimelinePage.vue'), props: true },
  { path: '/tutorials/glossary', name: 'tutorial-glossary', component: () => import('../views/tutorials/glossary/GlossaryPage.vue') },
  { path: '/tutorials/glossary/:term', name: 'tutorial-glossary-term', component: () => import('../views/tutorials/glossary/GlossaryTermPage.vue'), props: true },
  { path: '/bibliography', name: 'bibliography', component: () => import('../views/BibliographyPage.vue') },
  { path: '/about', name: 'about', component: () => import('../views/AboutPage.vue') },
  { path: '/team', name: 'team', component: () => import('../views/TeamPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        top: 104,
        behavior: 'smooth',
      }
    }

    return { top: 0, behavior: 'smooth' }
  }
})

export default router
