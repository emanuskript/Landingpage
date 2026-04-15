<script setup>
import { onMounted, ref } from 'vue'
import { routePaths } from '../../config/siteLinks'

const rootImage = '/images/navigation/back-to-tree-root.webp'
const imageRef = ref(null)
const pointerHot = ref(false)
let hitAlpha = null
let hitWidth = 0
let hitHeight = 0

function buildHitMap() {
  const image = imageRef.value
  if (!image?.naturalWidth || !image?.naturalHeight) return

  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return

  context.drawImage(image, 0, 0)
  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height)

  hitAlpha = data
  hitWidth = width
  hitHeight = height
}

function eventHitsOpaquePixel(event) {
  const image = imageRef.value
  if (!image || !hitAlpha || !hitWidth || !hitHeight) return true

  const rect = image.getBoundingClientRect()
  if (!rect.width || !rect.height) return false

  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    return false
  }

  const pixelX = Math.min(hitWidth - 1, Math.max(0, Math.floor((x / rect.width) * hitWidth)))
  const pixelY = Math.min(hitHeight - 1, Math.max(0, Math.floor((y / rect.height) * hitHeight)))
  const alphaIndex = ((pixelY * hitWidth) + pixelX) * 4 + 3

  return hitAlpha[alphaIndex] > 10
}

function updatePointerState(event) {
  pointerHot.value = eventHitsOpaquePixel(event)
}

function clearPointerState() {
  pointerHot.value = false
}

function handleClick(event) {
  if (event.detail === 0) return
  if (eventHitsOpaquePixel(event)) return

  event.preventDefault()
  pointerHot.value = false
}

onMounted(() => {
  if (imageRef.value?.complete) {
    buildHitMap()
  }
})
</script>

<template>
  <RouterLink
    :class="['root-home', { 'root-home--hot': pointerHot }]"
    :to="routePaths.landing"
    aria-label="Back to Tree"
    @pointermove="updatePointerState"
    @pointerdown="updatePointerState"
    @pointerleave="clearPointerState"
    @pointercancel="clearPointerState"
    @click="handleClick"
  >
    <img
      ref="imageRef"
      class="root-home__image"
      :src="rootImage"
      alt="Back to Tree"
      loading="eager"
      decoding="async"
      fetchpriority="low"
      draggable="false"
      @load="buildHitMap"
    />
  </RouterLink>
</template>

<style scoped>
.root-home {
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) - clamp(1.35rem, 3vw, 1.9rem));
  left: -44px;
  z-index: var(--z-rootling);
  display: block;
  width: clamp(176px, 17.6vw, 264px);
  text-decoration: none;
  cursor: default;
  -webkit-tap-highlight-color: transparent;
  contain: layout paint;
}

.root-home--hot,
.root-home:focus-visible {
  cursor: pointer;
}

.root-home__image {
  width: 100%;
  height: auto;
  display: block;
  transform-origin: 24% 6%;
  transition: transform var(--transition-base);
  will-change: transform;
}

.root-home--hot .root-home__image,
.root-home:focus-visible .root-home__image {
  animation: root-home-sway 1.55s ease-in-out infinite;
}

.root-home:focus-visible {
  outline: none;
}

@keyframes root-home-sway {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1.02);
  }

  20% {
    transform: translate3d(1px, -2px, 0) rotate(-2deg) scale(1.045);
  }

  45% {
    transform: translate3d(-1px, -1px, 0) rotate(1.8deg) scale(1.055);
  }

  70% {
    transform: translate3d(1px, 0, 0) rotate(-1.2deg) scale(1.045);
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(0.8deg) scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .root-home--hot .root-home__image,
  .root-home:focus-visible .root-home__image {
    animation: none;
    transform: scale(1.03);
  }
}

@media (max-width: 760px) {
  .root-home {
    top: calc(env(safe-area-inset-top, 0px) - 1rem);
    width: clamp(132px, 34vw, 188px);
  }
}
</style>
