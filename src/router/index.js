import { createRouter, createWebHistory } from 'vue-router'
import { routePaths } from '../config/siteLinks'

const routes = [
  { path: routePaths.landing, name: 'home', component: () => import('../views/LandingPage.vue'), meta: { showRootling: false } },
  { path: routePaths.apps, name: 'apps', component: () => import('../views/apps/AppsPage.vue') },
  { path: routePaths.appPages.mergen, name: 'app-mergen', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'mergen' } },
  { path: routePaths.appPages.seshat, name: 'app-seshat', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'seshat' } },
  { path: routePaths.appPages.proteus, name: 'app-proteus', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'proteus' } },
  { path: routePaths.appPages.fenius, name: 'app-fenius', component: () => import('../views/apps/AppDetail.vue'), props: { appId: 'fenius' } },
  { path: routePaths.tutorialsIndex, name: 'tutorials', component: () => import('../views/tutorials/TutorialsPage.vue') },
  { path: routePaths.tutorialPages.digitalPalaeography, name: 'tutorial-digipal', component: () => import('../views/tutorials/DigitalPalaeographyPage.vue') },
  { path: routePaths.tutorialPages.msi, name: 'tutorial-msi', component: () => import('../views/tutorials/msi/MsiOverview.vue') },
  { path: `${routePaths.tutorialPages.msi}/:lessonSlug`, name: 'tutorial-msi-lesson', component: () => import('../views/tutorials/msi/MsiLesson.vue'), props: true },
  { path: routePaths.tutorialPages.scripts, name: 'tutorial-scripts', component: () => import('../views/tutorials/scripts/ScriptsOverview.vue') },
  { path: '/tutorials/scripts/:unitSlug', name: 'tutorial-scripts-unit', component: () => import('../views/tutorials/scripts/ScriptUnit.vue'), props: true },
  {
    path: routePaths.tutorialPages.codicology,
    name: 'tutorial-codicology',
    component: () => import('../views/tutorials/bookbinding/BookbindingOverview.vue'),
  },
  {
    path: `${routePaths.tutorialPages.codicology}/:chapterSlug`,
    name: 'tutorial-codicology-chapter',
    component: () => import('../views/tutorials/bookbinding/BookbindingChapter.vue'),
    props: true,
  },
  { path: routePaths.bibliography, name: 'bibliography', component: () => import('../views/BibliographyPage.vue') },
  { path: routePaths.aboutProject, name: 'about-project', component: () => import('../views/AboutPage.vue') },
  { path: routePaths.team, name: 'team', component: () => import('../views/TeamPage.vue') },
  { path: routePaths.siteMap, name: 'site-map', component: () => import('../views/SiteMapPage.vue') },
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
        behavior: to.path === from.path ? 'smooth' : 'auto',
      }
    }

    return { top: 0 }
  }
})

export default router
