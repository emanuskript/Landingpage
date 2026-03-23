<script setup>
import AppCard from '../../components/apps/AppCard.vue'
import SiteShell from '../../components/layout/SiteShell.vue'
import { appCollection, appOrder, apps } from '../../content/apps/apps'
</script>

<template>
  <SiteShell :eyebrow="appCollection.eyebrow" :title="appCollection.title" :lede="appCollection.lede" :meta="['Mergen', 'Seshat', 'Proteus', 'Fenius']">
    <div class="apps-page">
      <AppCard v-for="appId in appOrder" :key="appId" :app="apps[appId]" />
    </div>
  </SiteShell>
</template>

<style scoped>
.apps-page {
  display: grid;
  gap: 1rem;
}
</style>
