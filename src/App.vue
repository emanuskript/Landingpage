<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import RootlingNav from './components/navigation/RootlingNav.vue'

const route = useRoute()
const showRootling = computed(() => route.name !== 'home')
</script>

<template>
  <div id="emanuskript-app">
    <RootlingNav v-if="showRootling" />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style>
#emanuskript-app {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
