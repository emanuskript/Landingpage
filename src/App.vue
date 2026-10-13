<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue'
import RootlingNav from './components/navigation/RootlingNav.vue'

const route = useRoute()
const showRootling = computed(() => route.meta.showRootling !== false)
</script>

<template>
  <div id="emanuskript-app">
    <RootlingNav v-if="showRootling" />
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
    <Analytics />
  </div>
</template>

<style>
#emanuskript-app {
  min-height: 100vh;
}
</style>
