<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { landingArtwork, landingCopy, landingHotspots } from '../config/landingHotspots'
import { clipPathPolygon, normalizeHotspot } from '../utils/landingShapes'

const DRAFT_STORAGE_KEY = 'emanuskript-landing-calibration-draft'
const FINAL_STORAGE_KEY = 'emanuskript-landing-calibration-final'
const HOTSPOTS_UPDATED_EVENT = 'emanuskript:landing-hotspots-updated'
const legendArtwork = {
  src: '/images/legend/guide-panel-replacement.png?v=2',
  alt: 'Legend explaining applications, tutorials, and further information in the eManuSkript tree.',
}

const router = useRouter()
const activeHotspotId = ref(null)
const treeAreaRef = ref(null)
const treeFrameRef = ref(null)
const treeImageRef = ref(null)
const isCoarsePointer = ref(false)
const hoveredRootId = ref(null)
const imageOverlayStyle = ref({
  left: '0%',
  top: '0%',
  width: '100%',
  height: '100%',
})
const isCompactHeight = ref(false)
const resolvedHotspots = ref(cloneHotspots(landingHotspots))
const rootHotspots = computed(() => resolvedHotspots.value.filter((h) => h.kind === 'root'))
let pointerQuery
let overlayResizeObserver

const rootLabelSparkleMap = {
  'about-project': [
    { x: 10, y: 52, size: 0.76, delay: '-0.8s', duration: '6.8s', rotate: 8, driftX: 0.8, driftY: -0.6 },
    { x: 53, y: 8, size: 0.62, delay: '-3.4s', duration: '7.6s', rotate: -10, driftX: -0.6, driftY: 0.4 },
    { x: 92, y: 56, size: 0.7, delay: '-5.2s', duration: '7.1s', rotate: 12, driftX: 0.5, driftY: -0.4 },
  ],
  team: [
    { x: 8, y: 50, size: 0.74, delay: '-1.6s', duration: '7.2s', rotate: -6, driftX: 0.7, driftY: -0.5 },
    { x: 49, y: 10, size: 0.6, delay: '-4.1s', duration: '7.8s', rotate: 9, driftX: -0.5, driftY: 0.4 },
    { x: 94, y: 52, size: 0.68, delay: '-6.4s', duration: '7.3s', rotate: -11, driftX: 0.5, driftY: -0.4 },
  ],
  'site-map': [
    { x: 12, y: 54, size: 0.72, delay: '-0.4s', duration: '7s', rotate: 7, driftX: 0.7, driftY: -0.5 },
    { x: 50, y: 6, size: 0.58, delay: '-3.7s', duration: '7.7s', rotate: -8, driftX: -0.5, driftY: 0.4 },
    { x: 90, y: 56, size: 0.66, delay: '-5.8s', duration: '7.2s', rotate: 10, driftX: 0.4, driftY: -0.3 },
  ],
  bibliography: [
    { x: 10, y: 54, size: 0.74, delay: '-1.1s', duration: '7.1s', rotate: -7, driftX: 0.7, driftY: -0.5 },
    { x: 56, y: 9, size: 0.6, delay: '-4.6s', duration: '7.9s', rotate: 10, driftX: -0.5, driftY: 0.4 },
    { x: 93, y: 50, size: 0.68, delay: '-6.1s', duration: '7.4s', rotate: -10, driftX: 0.5, driftY: -0.4 },
  ],
}

function hotspotStyle(hotspot) {
  if (hotspot.kind === 'root') {
    const center = rootLabelCenter(hotspot)

    return {
      left: `${center.x - hotspot.rect.width / 2}%`,
      top: `${center.y - hotspot.rect.height / 2}%`,
      width: `${hotspot.rect.width}%`,
      height: `${hotspot.rect.height}%`,
      '--hotspot-accent': hotspot.accent,
    }
  }

  return {
    left: `${hotspot.rect.left}%`,
    top: `${hotspot.rect.top}%`,
    width: `${hotspot.rect.width}%`,
    height: `${hotspot.rect.height}%`,
    '--hotspot-accent': hotspot.accent,
  }
}

function hotspotShapeStyle(hotspot) {
  if (hotspot.kind === 'root') {
    return {}
  }

  return {
    clipPath: clipPathPolygon(hotspot),
    WebkitClipPath: clipPathPolygon(hotspot),
  }
}

function rootLabelCenter(hotspot) {
  const anchor = hotspot.labelAnchor ?? {
    x: hotspot.rect.left + hotspot.rect.width / 2,
    y: hotspot.rect.top - 2.4,
  }

  if (hotspot.id === 'about-project' || hotspot.id === 'team') {
    const teamHotspot = resolvedHotspots.value.find((entry) => entry.id === 'team')
    const teamAnchor = teamHotspot?.labelAnchor ?? {
      x: teamHotspot ? teamHotspot.rect.left + teamHotspot.rect.width / 2 : anchor.x,
      y: teamHotspot ? teamHotspot.rect.top - 2.4 : anchor.y,
    }

    return { x: anchor.x, y: teamAnchor.y }
  }

  return { x: anchor.x, y: anchor.y }
}

function rootLabelStyle(hotspot) {
  const center = rootLabelCenter(hotspot)

  return {
    left: `${center.x}%`,
    top: `${center.y}%`,
  }
}

function sparkleStyle(glint) {
  return {
    left: `${glint.x}%`,
    top: `${glint.y}%`,
    '--sparkle-size': glint.size ?? 1,
    '--sparkle-delay': glint.delay ?? '0s',
    '--sparkle-duration': glint.duration ?? '8s',
    '--sparkle-rotate': `${glint.rotate ?? 0}deg`,
    '--sparkle-drift-x': `${glint.driftX ?? 0}px`,
    '--sparkle-drift-y': `${glint.driftY ?? 0}px`,
  }
}

function rootLabelSparkleStyle(glint) {
  return {
    left: `${glint.x}%`,
    top: `${glint.y}%`,
    '--sparkle-size': glint.size ?? 1,
    '--sparkle-delay': glint.delay ?? '0s',
    '--sparkle-duration': glint.duration ?? '7.2s',
    '--sparkle-rotate': `${glint.rotate ?? 0}deg`,
    '--sparkle-drift-x': `${glint.driftX ?? 0}px`,
    '--sparkle-drift-y': `${glint.driftY ?? 0}px`,
  }
}

function rootLabelSparkles(hotspot) {
  return rootLabelSparkleMap[hotspot.id] ?? []
}

function updateOverlayBox() {
  const frame = treeFrameRef.value
  const image = treeImageRef.value

  if (!frame || !image) return

  const frameRect = frame.getBoundingClientRect()
  const imageRect = image.getBoundingClientRect()

  if (!frameRect.width || !frameRect.height || !imageRect.width || !imageRect.height) return

  imageOverlayStyle.value = {
    left: `${((imageRect.left - frameRect.left) / frameRect.width) * 100}%`,
    top: `${((imageRect.top - frameRect.top) / frameRect.height) * 100}%`,
    width: `${(imageRect.width / frameRect.width) * 100}%`,
    height: `${(imageRect.height / frameRect.height) * 100}%`,
  }
}

function cloneHotspots(source) {
  return source.map(normalizeHotspot)
}

function mergeSavedHotspots(baseHotspots, savedPayload) {
  const savedById = new Map(savedPayload?.hotspots?.map((hotspot) => [hotspot.id, hotspot]) ?? [])

  return cloneHotspots(baseHotspots).map((hotspot) => {
    const saved = savedById.get(hotspot.id)
    if (!saved) return hotspot

    const merged = normalizeHotspot({
      ...hotspot,
      rect: {
        ...hotspot.rect,
        ...(saved.rect ?? {}),
      },
      points: saved.points ?? hotspot.points,
      curveMode: saved.curveMode ?? hotspot.curveMode,
      labelAnchor: hotspot.labelAnchor
        ? {
            ...hotspot.labelAnchor,
            ...(saved.labelAnchor ?? {}),
          }
        : undefined,
    })

    return {
      ...merged,
    }
  })
}

function loadSavedHotspots() {
  const draftRaw = window.localStorage.getItem(DRAFT_STORAGE_KEY)
  const finalRaw = window.localStorage.getItem(FINAL_STORAGE_KEY)

  let draftPayload = null
  let finalPayload = null

  try {
    draftPayload = draftRaw ? JSON.parse(draftRaw) : null
  } catch {}

  try {
    finalPayload = finalRaw ? JSON.parse(finalRaw) : null
  } catch {}

  const preferredPayload = finalPayload ?? draftPayload

  resolvedHotspots.value = preferredPayload
    ? mergeSavedHotspots(landingHotspots, preferredPayload)
    : cloneHotspots(landingHotspots)
}

function resolveHotspotHref(hotspot) {
  if (hotspot.external) {
    return hotspot.href
  }

  return router.resolve(hotspot.to).href
}

function resolveHotspotTarget(hotspot) {
  return hotspot.external ? '_blank' : undefined
}

function resolveHotspotRel(hotspot) {
  return hotspot.external ? 'noreferrer noopener' : undefined
}

function setActiveHotspot(id = null) {
  activeHotspotId.value = id
}

function handleHotspotClick(event, hotspot) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return
  }

  if (isCoarsePointer.value && activeHotspotId.value !== hotspot.id) {
    event.preventDefault()
    activeHotspotId.value = hotspot.id
    return
  }

  if (hotspot.external) {
    return
  }

  event.preventDefault()
  router.push(hotspot.to)
}

function updatePointerMode() {
  isCoarsePointer.value = window.matchMedia('(pointer: coarse)').matches
}

function updateViewportMode() {
  isCompactHeight.value = window.innerHeight < 940
}

function handlePointerDown(event) {
  if (treeAreaRef.value && !treeAreaRef.value.contains(event.target)) {
    activeHotspotId.value = null
  }
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    activeHotspotId.value = null
  }
}

onMounted(() => {
  loadSavedHotspots()
  pointerQuery = window.matchMedia('(pointer: coarse)')
  updatePointerMode()
  updateViewportMode()

  nextTick(() => {
    updateOverlayBox()
  })

  overlayResizeObserver = new ResizeObserver(() => {
    updateOverlayBox()
  })

  if (treeFrameRef.value) {
    overlayResizeObserver.observe(treeFrameRef.value)
  }

  if (treeImageRef.value) {
    overlayResizeObserver.observe(treeImageRef.value)
  }

  if (pointerQuery.addEventListener) {
    pointerQuery.addEventListener('change', updatePointerMode)
  } else if (pointerQuery.addListener) {
    pointerQuery.addListener(updatePointerMode)
  }

  document.addEventListener('pointerdown', handlePointerDown)
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('storage', loadSavedHotspots)
  window.addEventListener(HOTSPOTS_UPDATED_EVENT, loadSavedHotspots)
  window.addEventListener('resize', updateOverlayBox)
  window.addEventListener('resize', updateViewportMode)
})

onBeforeUnmount(() => {
  overlayResizeObserver?.disconnect()

  if (!pointerQuery) return

  if (pointerQuery.removeEventListener) {
    pointerQuery.removeEventListener('change', updatePointerMode)
  } else if (pointerQuery.removeListener) {
    pointerQuery.removeListener(updatePointerMode)
  }

  document.removeEventListener('pointerdown', handlePointerDown)
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('storage', loadSavedHotspots)
  window.removeEventListener(HOTSPOTS_UPDATED_EVENT, loadSavedHotspots)
  window.removeEventListener('resize', updateOverlayBox)
  window.removeEventListener('resize', updateViewportMode)
})
</script>

<template>
  <section class="landing-page" :class="{ 'landing-page--compact-height': isCompactHeight }">
    <header class="landing-page__masthead">
      <h1 class="landing-page__title">{{ landingCopy.title }}</h1>
    </header>

    <div class="landing-page__content">
      <div ref="treeAreaRef" class="landing-page__tree-area">
        <div
          ref="treeFrameRef"
          class="landing-page__tree-frame"
          :style="{ aspectRatio: `${landingArtwork.ratio.width} / ${landingArtwork.ratio.height}` }"
        >
          <img
            ref="treeImageRef"
            class="landing-page__tree-image"
            :src="landingArtwork.src"
            :alt="landingArtwork.alt"
            @load="updateOverlayBox"
          />

          <div class="landing-page__overlay" :style="imageOverlayStyle">
            <a
              v-for="hotspot in resolvedHotspots"
              :key="hotspot.id"
              :href="resolveHotspotHref(hotspot)"
              :target="resolveHotspotTarget(hotspot)"
              :rel="resolveHotspotRel(hotspot)"
              class="landing-page__hotspot"
              :class="[
                `landing-page__hotspot--${hotspot.kind}`,
                { 'landing-page__hotspot--prefer-below': hotspot.rect.top < 42 },
                { 'landing-page__hotspot--active': activeHotspotId === hotspot.id },
                { 'landing-page__hotspot--root-hovered': hotspot.kind === 'root' && hoveredRootId === hotspot.id },
              ]"
              :style="hotspotStyle(hotspot)"
              :aria-describedby="`landing-tooltip-${hotspot.id}`"
              :aria-label="hotspot.title"
              @click="handleHotspotClick($event, hotspot)"
              @mouseenter="hotspot.kind === 'root' && (hoveredRootId = hotspot.id)"
              @mouseleave="hotspot.kind === 'root' && (hoveredRootId = null)"
              @focus="setActiveHotspot(hotspot.id)"
              @blur="setActiveHotspot()"
            >
              <span
                class="landing-page__hotspot-shape"
                :class="`landing-page__hotspot-shape--${hotspot.kind}`"
                :style="hotspotShapeStyle(hotspot)"
                aria-hidden="true"
              ></span>

              <span
                v-if="hotspot.sparkle"
                class="landing-page__sparkles"
                :class="`landing-page__sparkles--${hotspot.sparkle.tone}`"
                aria-hidden="true"
              >
                <span
                  v-for="(glint, glintIndex) in hotspot.sparkle.glints"
                  :key="`${hotspot.id}-sparkle-${glintIndex}`"
                  class="landing-page__sparkle-particle"
                  :style="sparkleStyle(glint)"
                ></span>
              </span>

              <span :id="`landing-tooltip-${hotspot.id}`" class="landing-page__tooltip" role="tooltip">
                <span class="landing-page__tooltip-kind">{{ hotspot.kindLabel }}</span>
                <strong class="landing-page__tooltip-title">{{ hotspot.title }}</strong>
                <span v-if="hotspot.description" class="landing-page__tooltip-text">{{ hotspot.description }}</span>
              </span>
            </a>

            <a
              v-for="hotspot in rootHotspots"
              :key="`root-label-${hotspot.id}`"
              :href="resolveHotspotHref(hotspot)"
              class="landing-page__root-label"
              :class="{
                'landing-page__root-label--highlight': hoveredRootId === hotspot.id || activeHotspotId === hotspot.id,
              }"
              :style="rootLabelStyle(hotspot)"
              @mouseenter="hoveredRootId = hotspot.id"
              @mouseleave="hoveredRootId = null"
              @focus="setActiveHotspot(hotspot.id); hoveredRootId = hotspot.id"
              @blur="setActiveHotspot(); hoveredRootId = null"
              @click="handleHotspotClick($event, hotspot)"
            >
              <span class="landing-page__root-label-text">{{ hotspot.title }}</span>
              <span class="landing-page__root-label-sparkles" aria-hidden="true">
                <span
                  v-for="(glint, glintIndex) in rootLabelSparkles(hotspot)"
                  :key="`${hotspot.id}-label-sparkle-${glintIndex}`"
                  class="landing-page__root-label-sparkle"
                  :style="rootLabelSparkleStyle(glint)"
                ></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <figure class="landing-page__legend">
      <img class="landing-page__legend-image" :src="legendArtwork.src" :alt="legendArtwork.alt" />
    </figure>
  </section>
</template>

<style scoped>
.landing-page {
  --landing-inline-padding: clamp(0.4rem, 1.1vw, 1rem);
  --landing-tree-width: min(88rem, 99vw, calc((100svh - 1.85rem) * 1279 / 1809));
  --landing-tree-height: calc(var(--landing-tree-width) * 1809 / 1279);
  --landing-sparkle-time-scale: 1.7;
  position: relative;
  height: 100svh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  place-items: center;
  align-content: stretch;
  gap: clamp(0.35rem, 1vw, 0.8rem);
  padding: clamp(0.5rem, 1.3vw, 1rem) var(--landing-inline-padding) clamp(0.6rem, 1.4vw, 1rem);
  overflow-x: hidden;
  overflow-y: hidden;
}

.landing-page__masthead {
  width: min(99vw, 1500px);
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 0.12rem;
  position: relative;
  z-index: 5;
}

.landing-page__title {
  max-width: min(96vw, 1380px);
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.22rem, 1.35vw + 0.78rem, 1.78rem);
  line-height: 1.06;
  white-space: nowrap;
  letter-spacing: -0.022em;
  color: rgba(48, 35, 20, 0.96);
  text-shadow:
    0 1px 0 rgba(252, 246, 236, 0.98),
    0 0 0.42rem rgba(246, 236, 217, 0.86),
    0 0 1rem rgba(239, 225, 194, 0.42);
}

.landing-page__content {
  width: min(100vw, 1560px);
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-page__legend {
  position: absolute;
  left: calc(-1 * var(--landing-inline-padding));
  top: calc(56% - 55px);
  height: min(14rem, calc(var(--landing-tree-height) / 3));
  width: auto;
  margin: 0;
  transform: translateY(-28%);
  z-index: 1;
  pointer-events: none;
}

.landing-page__legend-image {
  display: block;
  width: auto;
  height: 100%;
}

.landing-page__tree-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  width: 100%;
  min-height: 0;
  transform: translateY(-50px);
  position: relative;
  z-index: 1;
}

.landing-page__tree-frame {
  position: relative;
  width: var(--landing-tree-width);
  height: calc(var(--landing-tree-height) + 30px);
  max-width: 88rem;
  overflow: visible;
}

.landing-page__tree-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: none;
}

.landing-page__overlay {
  position: absolute;
  pointer-events: none;
  container-type: inline-size;
}

.landing-page__hotspot {
  position: absolute;
  display: block;
  overflow: visible;
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: auto;
}

.landing-page__hotspot-shape {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.landing-page__hotspot-shape--app,
.landing-page__hotspot-shape--tutorial {
  border-radius: 999px;
  background: transparent;
  -webkit-backdrop-filter: saturate(1.14) contrast(1.14) brightness(1.04);
  backdrop-filter: saturate(1.14) contrast(1.14) brightness(1.04);
  transition: background var(--transition-base), -webkit-backdrop-filter var(--transition-base), backdrop-filter var(--transition-base);
}

.landing-page__hotspot-shape--root {
  inset: -0.08rem;
  border-radius: 1.5rem;
  cursor: pointer;
}

.landing-page__hotspot-shape--root::before {
  display: block;
  inset: -0.18rem -0.3rem;
  border-radius: 1.55rem;
  background: rgba(243, 232, 213, 0.18);
  box-shadow:
    inset 0 0 0 1px rgba(106, 83, 43, 0.14),
    0 10px 24px rgba(69, 49, 23, 0.08);
}

.landing-page__hotspot-shape::before,
.landing-page__hotspot-shape::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.landing-page__hotspot-shape--app::after {
  content: '';
  position: absolute;
  inset: 8% 14% 50% 16%;
  border-radius: inherit;
  background: radial-gradient(ellipse at 28% 28%, rgba(255, 241, 174, 0.86), rgba(255, 233, 168, 0.26) 38%, rgba(255, 233, 168, 0) 72%);
  mix-blend-mode: screen;
  opacity: 0.72;
  filter: blur(0.02rem);
  pointer-events: none;
}

.landing-page__hotspot-shape--tutorial::after {
  content: '';
  position: absolute;
  inset: 10% 16% 50% 16%;
  border-radius: inherit;
  background: radial-gradient(ellipse at 30% 28%, rgba(244, 248, 255, 0.82), rgba(224, 236, 249, 0.22) 40%, rgba(238, 242, 248, 0) 74%);
  mix-blend-mode: screen;
  opacity: 0.64;
  filter: blur(0.02rem);
  pointer-events: none;
}

.landing-page__hotspot-shape::before {
  inset: -0.2rem;
  border-radius: inherit;
  background: rgba(255, 248, 238, 0.22);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--hotspot-accent) 34%, transparent),
    0 8px 20px color-mix(in srgb, var(--hotspot-accent) 18%, transparent);
  opacity: 0;
  transition: opacity var(--transition-base), box-shadow var(--transition-base), background var(--transition-base);
}

.landing-page__hotspot-shape--app::before,
.landing-page__hotspot-shape--tutorial::before {
  inset: -0.08rem;
  background: transparent;
  opacity: 1;
  box-shadow:
    inset 0.46rem 0.4rem 0.92rem rgba(33, 20, 8, 0.2),
    inset -0.28rem -0.22rem 0.72rem rgba(255, 250, 242, 0.28),
    0 0.14rem 0.58rem rgba(34, 21, 9, 0.1);
}

.landing-page__hotspot:focus-visible {
  outline: none;
}

.landing-page__hotspot:hover .landing-page__hotspot-shape::before,
.landing-page__hotspot:focus-visible .landing-page__hotspot-shape::before,
.landing-page__hotspot--active .landing-page__hotspot-shape::before,
.landing-page__hotspot--root-hovered .landing-page__hotspot-shape::before {
  opacity: 1;
  background: rgba(255, 248, 238, 0.3);
}

.landing-page__hotspot--app:hover .landing-page__hotspot-shape--app::before,
.landing-page__hotspot--app:focus-visible .landing-page__hotspot-shape--app::before,
.landing-page__hotspot--app.landing-page__hotspot--active .landing-page__hotspot-shape--app::before,
.landing-page__hotspot--tutorial:hover .landing-page__hotspot-shape--tutorial::before,
.landing-page__hotspot--tutorial:focus-visible .landing-page__hotspot-shape--tutorial::before,
.landing-page__hotspot--tutorial.landing-page__hotspot--active .landing-page__hotspot-shape--tutorial::before {
  background: rgba(255, 248, 238, 0.3);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--hotspot-accent) 34%, transparent),
    0 8px 20px color-mix(in srgb, var(--hotspot-accent) 18%, transparent);
}

.landing-page__hotspot--app:hover .landing-page__hotspot-shape--app::after,
.landing-page__hotspot--app:focus-visible .landing-page__hotspot-shape--app::after,
.landing-page__hotspot--app.landing-page__hotspot--active .landing-page__hotspot-shape--app::after,
.landing-page__hotspot--tutorial:hover .landing-page__hotspot-shape--tutorial::after,
.landing-page__hotspot--tutorial:focus-visible .landing-page__hotspot-shape--tutorial::after,
.landing-page__hotspot--tutorial.landing-page__hotspot--active .landing-page__hotspot-shape--tutorial::after {
  opacity: 0.52;
}

.landing-page__hotspot--app:hover .landing-page__hotspot-shape--app,
.landing-page__hotspot--app:focus-visible .landing-page__hotspot-shape--app,
.landing-page__hotspot--app.landing-page__hotspot--active .landing-page__hotspot-shape--app {
  background:
    radial-gradient(circle at 30% 28%, rgba(255, 249, 236, 0.08) 0 10%, transparent 28%),
    radial-gradient(circle at 58% 62%, rgba(47, 30, 12, 0.14) 0 52%, rgba(28, 18, 8, 0.26) 78%, rgba(18, 11, 4, 0.34) 100%);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}

.landing-page__hotspot--tutorial:hover .landing-page__hotspot-shape--tutorial,
.landing-page__hotspot--tutorial:focus-visible .landing-page__hotspot-shape--tutorial,
.landing-page__hotspot--tutorial.landing-page__hotspot--active .landing-page__hotspot-shape--tutorial {
  background:
    radial-gradient(circle at 30% 28%, rgba(255, 249, 236, 0.08) 0 10%, transparent 28%),
    radial-gradient(circle at 58% 62%, rgba(47, 30, 12, 0.14) 0 52%, rgba(28, 18, 8, 0.26) 78%, rgba(18, 11, 4, 0.34) 100%);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}

.landing-page__root-label {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: clamp(0.96rem, 1.24cqw, 1.12rem);
  font-weight: 700;
  font-style: italic;
  line-height: 1.15;
  letter-spacing: 0.01em;
  white-space: nowrap;
  color: rgba(64, 45, 23, 0.92);
  -webkit-text-stroke: 0.012em rgba(78, 54, 26, 0.18);
  text-shadow:
    0 1px 0 rgba(252, 246, 236, 0.88),
    0 0 0.18rem rgba(252, 246, 236, 0.2);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--transition-fast), text-shadow var(--transition-fast);
  isolation: isolate;
  pointer-events: auto;
}

.landing-page__root-label--highlight,
.landing-page__root-label:hover,
.landing-page__root-label:focus-visible {
  color: rgba(39, 29, 18, 0.96);
  text-shadow:
    0 1px 0 rgba(250, 243, 231, 0.9),
    0 0 0.45rem rgba(246, 239, 227, 0.46);
}

.landing-page__root-label:focus-visible {
  outline: 2px solid rgba(106, 83, 43, 0.4);
  outline-offset: 3px;
  border-radius: 2px;
}

.landing-page__root-label-text {
  position: relative;
  z-index: 2;
}

.landing-page__root-label-sparkles {
  position: absolute;
  inset: -0.75rem -0.9rem;
  z-index: 1;
  opacity: 0.82;
  pointer-events: none;
}

.landing-page__root-label-sparkle {
  position: absolute;
  width: calc(0.72rem * var(--sparkle-size));
  height: calc(0.72rem * var(--sparkle-size));
  transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  transform-origin: center;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.98) 0 24%, rgba(248, 219, 178, 0.94) 25% 50%, transparent 75%);
  filter:
    drop-shadow(0 0 0.035rem rgba(72, 39, 14, 0.7))
    drop-shadow(0 0 0.14rem rgba(236, 189, 132, 0.58))
    drop-shadow(0 0 0.3rem rgba(151, 89, 39, 0.24));
  animation-name: sparkle-gold;
  animation-delay: calc(var(--sparkle-delay) * var(--landing-sparkle-time-scale));
  animation-duration: calc(var(--sparkle-duration) * var(--landing-sparkle-time-scale));
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  will-change: opacity, transform;
}

.landing-page__root-label-sparkle::before,
.landing-page__root-label-sparkle::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  opacity: 1;
}

.landing-page__root-label-sparkle::before {
  width: 220%;
  height: 18%;
  background:
    linear-gradient(90deg, transparent 0 4%, rgba(110, 65, 23, 0.98) 14% 86%, transparent 96% 100%);
}

.landing-page__root-label-sparkle::after {
  width: 18%;
  height: 220%;
  background:
    linear-gradient(180deg, transparent 0 4%, rgba(110, 65, 23, 0.98) 14% 86%, transparent 96% 100%);
}

/* ---- Sparkle particles ---- */
.landing-page__sparkles {
  position: absolute;
  inset: -20% -15%;
  z-index: 3;
  opacity: 0.94;
  pointer-events: none;
  overflow: visible;
}

.landing-page__sparkles--gold {
  --sparkle-core: rgba(255, 252, 214, 1);
  --sparkle-line: rgba(255, 226, 92, 1);
  --sparkle-edge: rgba(140, 95, 24, 0.96);
  --sparkle-halo: rgba(255, 238, 158, 1);
  --sparkle-glow: rgba(230, 175, 50, 0.9);
  --sparkle-rim: rgba(88, 56, 12, 0.46);
}

.landing-page__sparkles--silver {
  --sparkle-core: rgba(248, 252, 255, 1);
  --sparkle-line: rgba(214, 232, 255, 1);
  --sparkle-edge: rgba(103, 126, 156, 0.94);
  --sparkle-halo: rgba(232, 242, 255, 1);
  --sparkle-glow: rgba(170, 195, 230, 0.82);
  --sparkle-rim: rgba(55, 73, 97, 0.38);
}

.landing-page__sparkles--parchment {
  --sparkle-core: rgba(251, 244, 231, 0.9);
  --sparkle-line: rgba(236, 220, 191, 0.88);
  --sparkle-halo: rgba(251, 246, 236, 0.68);
  --sparkle-glow: rgba(205, 177, 132, 0.25);
}

.landing-page__sparkles--bronze {
  --sparkle-core: rgba(248, 219, 178, 0.94);
  --sparkle-line: rgba(191, 122, 58, 0.96);
  --sparkle-halo: rgba(236, 189, 132, 0.74);
  --sparkle-glow: rgba(151, 89, 39, 0.34);
}

.landing-page__sparkle-particle {
  position: absolute;
  width: calc(0.78rem * var(--sparkle-size));
  height: calc(0.78rem * var(--sparkle-size));
  transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  transform-origin: center;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 0 20%,
      var(--sparkle-core) 21% 44%,
      color-mix(in srgb, var(--sparkle-edge) 42%, transparent) 45% 56%,
      transparent 76%
    );
  filter:
    drop-shadow(0 0 0.03rem var(--sparkle-rim))
    drop-shadow(0 0 0.24rem color-mix(in srgb, var(--sparkle-halo) 88%, transparent))
    drop-shadow(0 0 0.56rem color-mix(in srgb, var(--sparkle-glow) 84%, transparent));
  animation-delay: calc(var(--sparkle-delay) * var(--landing-sparkle-time-scale));
  animation-duration: calc(var(--sparkle-duration) * var(--landing-sparkle-time-scale));
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  will-change: opacity, transform;
}

.landing-page__sparkles--gold .landing-page__sparkle-particle {
  animation-name: sparkle-gold;
}

.landing-page__sparkle-particle::before,
.landing-page__sparkle-particle::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background:
    linear-gradient(
      90deg,
      transparent 0 4%,
      color-mix(in srgb, var(--sparkle-edge) 96%, transparent) 16% 24%,
      var(--sparkle-line) 33% 67%,
      color-mix(in srgb, var(--sparkle-edge) 96%, transparent) 76% 84%,
      transparent 96% 100%
    );
  opacity: 1;
}

.landing-page__sparkle-particle::before {
  width: 220%;
  height: 18%;
}

.landing-page__sparkle-particle::after {
  width: 18%;
  height: 220%;
  background:
    linear-gradient(
      180deg,
      transparent 0 4%,
      color-mix(in srgb, var(--sparkle-edge) 96%, transparent) 16% 24%,
      var(--sparkle-line) 33% 67%,
      color-mix(in srgb, var(--sparkle-edge) 96%, transparent) 76% 84%,
      transparent 96% 100%
    );
}

.landing-page__sparkles--silver .landing-page__sparkle-particle {
  animation-name: sparkle-silver;
}

.landing-page__sparkles--parchment .landing-page__sparkle-particle {
  animation-name: sparkle-parchment;
  filter:
    drop-shadow(0 0 0.14rem color-mix(in srgb, var(--sparkle-halo) 78%, transparent))
    drop-shadow(0 0 0.3rem color-mix(in srgb, var(--sparkle-glow) 64%, transparent));
}

.landing-page__sparkles--bronze .landing-page__sparkle-particle {
  animation-name: sparkle-bronze;
  filter:
    drop-shadow(0 0 0.15rem color-mix(in srgb, var(--sparkle-halo) 76%, transparent))
    drop-shadow(0 0 0.34rem color-mix(in srgb, var(--sparkle-glow) 64%, transparent));
}

.landing-page__tooltip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.8rem);
  z-index: var(--z-tooltip);
  display: grid;
  gap: 0.15rem;
  width: min(16rem, min(32cqw, calc(100vw - 2rem)));
  padding: 0.8rem 0.95rem;
  border: 1px solid rgba(106, 83, 43, 0.22);
  border-radius: 16px;
  background: rgba(249, 243, 230, 0.96);
  box-shadow: 0 18px 34px rgba(69, 49, 23, 0.14);
  color: var(--color-ink);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 0.45rem);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.landing-page__hotspot--tutorial .landing-page__tooltip {
  bottom: calc(100% + 2rem);
}

.landing-page--compact-height .landing-page__hotspot--prefer-below .landing-page__tooltip {
  top: calc(100% + 0.8rem);
  bottom: auto;
  transform: translate(-50%, -0.45rem);
}

.landing-page--compact-height .landing-page__hotspot--tutorial.landing-page__hotspot--prefer-below .landing-page__tooltip {
  top: calc(100% + 2rem);
  bottom: auto;
}

.landing-page__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0.8rem;
  height: 0.8rem;
  background: rgba(249, 243, 230, 0.96);
  border-right: 1px solid rgba(106, 83, 43, 0.16);
  border-bottom: 1px solid rgba(106, 83, 43, 0.16);
  transform: translateX(-50%) rotate(45deg);
}

.landing-page--compact-height .landing-page__hotspot--prefer-below .landing-page__tooltip::after {
  top: auto;
  bottom: 100%;
  border-right: none;
  border-bottom: none;
  border-left: 1px solid rgba(106, 83, 43, 0.16);
  border-top: 1px solid rgba(106, 83, 43, 0.16);
}

.landing-page__hotspot:hover .landing-page__tooltip,
.landing-page__hotspot:focus-visible .landing-page__tooltip,
.landing-page__hotspot--active .landing-page__tooltip {
  opacity: 1;
  transform: translate(-50%, 0);
}

.landing-page__tooltip-kind {
  font-family: var(--font-sans);
  font-size: clamp(0.74rem, 0.9cqw, 0.82rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-branch);
}

.landing-page__tooltip-title {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.12cqw, 1.12rem);
  line-height: 1.3;
}

.landing-page__tooltip-text {
  font-size: clamp(0.88rem, 0.98cqw, 0.98rem);
  line-height: 1.5;
  color: var(--color-ink-muted);
}

/* Gold sparkle: warm bright flash with a quick scale-up, two pulses per cycle */
@keyframes sparkle-gold {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  4% {
    opacity: 0.78;
    transform: translate(-50%, -50%) rotate(calc(var(--sparkle-rotate) + 7deg)) scale(1.02);
  }

  8% {
    opacity: 0.68;
    transform: translate(calc(-50% + var(--sparkle-drift-x) * 0.75), calc(-50% + var(--sparkle-drift-y) * 0.75)) rotate(calc(var(--sparkle-rotate) + 5deg)) scale(0.9);
  }

  16% {
    opacity: 0.42;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.62);
  }

  22% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.18);
  }

  48% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  52% {
    opacity: 0.64;
    transform: translate(calc(-50% - var(--sparkle-drift-x) * 0.7), calc(-50% + var(--sparkle-drift-y) * 0.7)) rotate(calc(var(--sparkle-rotate) - 4deg)) scale(0.82);
  }

  58% {
    opacity: 0.46;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.68);
  }

  66% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.15);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }
}

/* Silver sparkle: cooler shimmer, gentler rhythm, three softer pulses */
@keyframes sparkle-silver {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  5% {
    opacity: 0.62;
    transform: translate(calc(-50% + var(--sparkle-drift-x) * 0.65), calc(-50% + var(--sparkle-drift-y) * 0.65)) rotate(calc(var(--sparkle-rotate) + 4deg)) scale(0.9);
  }

  12% {
    opacity: 0.46;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.74);
  }

  22% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.18);
  }

  32% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  36% {
    opacity: 0.44;
    transform: translate(calc(-50% - var(--sparkle-drift-x) * 0.58), calc(-50% + var(--sparkle-drift-y) * 0.58)) rotate(calc(var(--sparkle-rotate) - 3deg)) scale(0.7);
  }

  42% {
    opacity: 0.28;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.54);
  }

  48% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.1);
  }

  68% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  72% {
    opacity: 0.34;
    transform: translate(calc(-50% + var(--sparkle-drift-x) * 0.5), calc(-50% - var(--sparkle-drift-y) * 0.5)) rotate(calc(var(--sparkle-rotate) + 2deg)) scale(0.62);
  }

  78% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.1);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }
}

/* Parchment sparkle: subtle warm glow for root areas */
@keyframes sparkle-parchment {
  0%, 24%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  30% {
    opacity: 0.3;
    transform: translate(calc(-50% + var(--sparkle-drift-x) * 0.45), calc(-50% + var(--sparkle-drift-y) * 0.45)) rotate(calc(var(--sparkle-rotate) + 2deg)) scale(0.6);
  }

  40% {
    opacity: 0.08;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.3);
  }

  68% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }

  74% {
    opacity: 0.17;
    transform: translate(calc(-50% - var(--sparkle-drift-x) * 0.42), calc(-50% + var(--sparkle-drift-y) * 0.42)) rotate(calc(var(--sparkle-rotate) - 2deg)) scale(0.46);
  }

  82% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0);
  }
}

@keyframes sparkle-bronze {
  0%, 22%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.28);
  }

  29% {
    opacity: 0.36;
    transform: translate(calc(-50% + var(--sparkle-drift-x) * 0.52), calc(-50% + var(--sparkle-drift-y) * 0.52)) rotate(calc(var(--sparkle-rotate) + 3deg)) scale(0.68);
  }

  38% {
    opacity: 0.1;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.42);
  }

  68% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.3);
  }

  75% {
    opacity: 0.18;
    transform: translate(calc(-50% - var(--sparkle-drift-x) * 0.42), calc(-50% + var(--sparkle-drift-y) * 0.42)) rotate(calc(var(--sparkle-rotate) - 2deg)) scale(0.5);
  }

  84% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.3);
  }
}

@media (max-width: 960px) {
  .landing-page__content {
    width: min(100vw, 1120px);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    justify-items: center;
    gap: clamp(0.65rem, 2vw, 1rem);
  }

  .landing-page__legend {
    position: static;
    width: min(30rem, 70vw);
    margin: 0;
    transform: none;
    justify-self: center;
    align-self: start;
  }

  .landing-page__tree-area {
    order: 1;
  }

  .landing-page__tree-frame {
    width: min(97vw, calc((100svh - 13rem) * 1279 / 1809));
  }
}

@media (max-width: 680px) {
  .landing-page {
    --landing-inline-padding: 0.45rem;
    min-height: 100svh;
    height: auto;
    gap: 0.65rem;
    padding: calc(env(safe-area-inset-top, 0px) + 0.35rem) 0.35rem 0.9rem;
    overflow-y: visible;
  }

  .landing-page__title {
    max-width: min(22rem, 92vw);
    font-size: clamp(0.88rem, 3.9vw, 1.12rem);
    line-height: 1.08;
    white-space: normal;
    text-wrap: balance;
  }

  .landing-page__content {
    gap: 0.6rem;
  }

  .landing-page__legend {
    width: min(92vw, 22rem);
  }

  .landing-page__tree-area {
    transform: none;
  }

  .landing-page__tree-frame {
    width: min(92vw, 27rem);
    height: auto;
  }

  .landing-page__tooltip {
    width: min(13.5rem, calc(100vw - 1.5rem));
    padding: 0.72rem 0.82rem;
  }

  .landing-page__tutorial-name {
    max-width: 42vw;
    font-size: 0.56rem;
    white-space: normal;
  }

  .landing-page__root-label {
    font-size: clamp(0.68rem, 2vw, 0.84rem);
  }
}

@media (max-width: 480px) {
  .landing-page__masthead {
    width: 100%;
  }

  .landing-page__title {
    max-width: 21rem;
    font-size: clamp(0.84rem, 3.65vw, 1rem);
  }

  .landing-page__tree-frame {
    width: min(92vw, 24rem);
  }

  .landing-page__legend {
    width: min(92vw, 20rem);
  }

  .landing-page__root-label {
    font-size: clamp(0.6rem, 2.4vw, 0.76rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing-page__sparkle-particle {
    animation: none !important;
    opacity: 0.12;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.62);
    filter:
      drop-shadow(0 0 0.08rem var(--sparkle-halo))
      drop-shadow(0 0 0.16rem var(--sparkle-glow));
  }

  .landing-page__root-label-sparkle {
    animation: none !important;
    opacity: 0.12;
    transform: translate(-50%, -50%) rotate(var(--sparkle-rotate)) scale(0.56);
  }
}
</style>
