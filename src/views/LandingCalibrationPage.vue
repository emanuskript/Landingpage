<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { landingArtwork, landingHotspots } from '../config/landingHotspots'
import { clamp, normalizeHotspot, shapePathD, syncRectFromPoints } from '../utils/landingShapes'

const DRAFT_STORAGE_KEY = 'emanuskript-landing-calibration-draft'
const FINAL_STORAGE_KEY = 'emanuskript-landing-calibration-final'
const HOTSPOTS_UPDATED_EVENT = 'emanuskript:landing-hotspots-updated'

const treeFrameRef = ref(null)
const treeImageRef = ref(null)
const imageOverlayStyle = ref({
  left: '0%',
  top: '0%',
  width: '100%',
  height: '100%',
})
const resolvedHotspots = ref(cloneHotspots(landingHotspots))
const selectedHotspotId = ref(landingHotspots[0]?.id ?? '')
const selectedPointIndex = ref(0)
const activeDrag = ref(null)
let overlayResizeObserver

const selectedHotspot = computed(() => resolvedHotspots.value.find((hotspot) => hotspot.id === selectedHotspotId.value) ?? null)
const selectedPoint = computed(() => {
  const hotspot = selectedHotspot.value
  if (!hotspot?.points?.length) return null
  return hotspot.points[selectedPointIndex.value] ?? hotspot.points[0]
})

function cloneHotspots(source) {
  return source.map(normalizeHotspot)
}

function mergeSavedHotspots(baseHotspots, savedPayload) {
  const savedById = new Map(savedPayload?.hotspots?.map((hotspot) => [hotspot.id, hotspot]) ?? [])

  return cloneHotspots(baseHotspots).map((hotspot) => {
    const saved = savedById.get(hotspot.id)
    if (!saved) return hotspot

    return normalizeHotspot({
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
  })
}

function ensureSelectedPointIndex() {
  const hotspot = selectedHotspot.value
  if (!hotspot?.points?.length) {
    selectedPointIndex.value = 0
    return
  }

  if (selectedPointIndex.value >= hotspot.points.length) {
    selectedPointIndex.value = hotspot.points.length - 1
  }
}

function setSelectedHotspot(hotspotId) {
  selectedHotspotId.value = hotspotId
  selectedPointIndex.value = 0
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

  ensureSelectedPointIndex()
}

function persistDraft() {
  window.localStorage.setItem(
    DRAFT_STORAGE_KEY,
    JSON.stringify({
      savedAt: new Date().toISOString(),
      hotspots: resolvedHotspots.value,
    }),
  )
}

function persistFinal() {
  window.localStorage.setItem(
    FINAL_STORAGE_KEY,
    JSON.stringify({
      savedAt: new Date().toISOString(),
      hotspots: resolvedHotspots.value,
    }),
  )

  window.dispatchEvent(new CustomEvent(HOTSPOTS_UPDATED_EVENT))
}

function resetSaved() {
  window.localStorage.removeItem(DRAFT_STORAGE_KEY)
  window.localStorage.removeItem(FINAL_STORAGE_KEY)
  resolvedHotspots.value = cloneHotspots(landingHotspots)
  selectedPointIndex.value = 0
}

function labelAnchorStyle(hotspot) {
  const anchor = hotspot.labelAnchor ?? {
    x: hotspot.rect.left + hotspot.rect.width / 2,
    y: hotspot.rect.top - 2.4,
  }

  return {
    left: `${anchor.x}%`,
    top: `${anchor.y}%`,
  }
}

function hotspotPath(hotspot) {
  return shapePathD(hotspot)
}

function pointKey(hotspotId, pointIndex) {
  return `${hotspotId}-point-${pointIndex}`
}

function beginPointDrag(event, hotspotId, pointIndex) {
  const overlay = event.currentTarget.closest('.landing-calibration__overlay')
  if (!overlay) return

  const hotspot = resolvedHotspots.value.find((entry) => entry.id === hotspotId)
  if (!hotspot) return

  setSelectedHotspot(hotspotId)
  selectedPointIndex.value = pointIndex

  const overlayRect = overlay.getBoundingClientRect()
  activeDrag.value = {
    type: 'point',
    hotspotId,
    pointIndex,
    startX: event.clientX,
    startY: event.clientY,
    overlayWidth: overlayRect.width,
    overlayHeight: overlayRect.height,
    points: hotspot.points.map((point) => ({ ...point })),
  }

  event.preventDefault()
}

function beginShapeDrag(event, hotspotId) {
  const overlay = event.currentTarget.closest('.landing-calibration__overlay')
  if (!overlay) return

  const hotspot = resolvedHotspots.value.find((entry) => entry.id === hotspotId)
  if (!hotspot) return

  setSelectedHotspot(hotspotId)

  const overlayRect = overlay.getBoundingClientRect()
  activeDrag.value = {
    type: 'shape',
    hotspotId,
    startX: event.clientX,
    startY: event.clientY,
    overlayWidth: overlayRect.width,
    overlayHeight: overlayRect.height,
    points: hotspot.points.map((point) => ({ ...point })),
    rect: { ...hotspot.rect },
    labelAnchor: hotspot.labelAnchor ? { ...hotspot.labelAnchor } : null,
  }

  event.preventDefault()
}

function beginLabelDrag(event, hotspotId) {
  const overlay = event.currentTarget.closest('.landing-calibration__overlay')
  if (!overlay) return

  const hotspot = resolvedHotspots.value.find((entry) => entry.id === hotspotId)
  if (!hotspot?.labelAnchor) return

  setSelectedHotspot(hotspotId)

  const overlayRect = overlay.getBoundingClientRect()
  activeDrag.value = {
    type: 'label',
    hotspotId,
    startX: event.clientX,
    startY: event.clientY,
    overlayWidth: overlayRect.width,
    overlayHeight: overlayRect.height,
    labelAnchor: { ...hotspot.labelAnchor },
  }

  event.preventDefault()
}

function moveShape(hotspot, drag, dx, dy) {
  const nextLeft = clamp(drag.rect.left + dx, 0, 100 - drag.rect.width)
  const nextTop = clamp(drag.rect.top + dy, 0, 100 - drag.rect.height)
  const appliedDx = nextLeft - drag.rect.left
  const appliedDy = nextTop - drag.rect.top

  hotspot.points = drag.points.map((point) => ({
    x: point.x + appliedDx,
    y: point.y + appliedDy,
  }))
  syncRectFromPoints(hotspot)

  if (hotspot.labelAnchor && drag.labelAnchor) {
    hotspot.labelAnchor = {
      x: clamp(drag.labelAnchor.x + appliedDx, 0, 100),
      y: clamp(drag.labelAnchor.y + appliedDy, 0, 100),
    }
  }
}

function movePoint(hotspot, drag, dx, dy) {
  hotspot.points = drag.points.map((point, index) => (
    index === drag.pointIndex
      ? {
          x: clamp(point.x + dx, 0, 100),
          y: clamp(point.y + dy, 0, 100),
        }
      : { ...point }
  ))

  syncRectFromPoints(hotspot)
}

function moveLabel(hotspot, drag, dx, dy) {
  if (!hotspot.labelAnchor || !drag.labelAnchor) return

  hotspot.labelAnchor = {
    x: clamp(drag.labelAnchor.x + dx, 0, 100),
    y: clamp(drag.labelAnchor.y + dy, 0, 100),
  }
}

function handleGlobalPointerMove(event) {
  const drag = activeDrag.value
  if (!drag) return

  const hotspot = resolvedHotspots.value.find((entry) => entry.id === drag.hotspotId)
  if (!hotspot) return

  const dx = ((event.clientX - drag.startX) / drag.overlayWidth) * 100
  const dy = ((event.clientY - drag.startY) / drag.overlayHeight) * 100

  if (drag.type === 'shape') {
    moveShape(hotspot, drag, dx, dy)
    return
  }

  if (drag.type === 'point') {
    movePoint(hotspot, drag, dx, dy)
    ensureSelectedPointIndex()
    return
  }

  if (drag.type === 'label') {
    moveLabel(hotspot, drag, dx, dy)
  }
}

function stopDrag() {
  activeDrag.value = null
}

function setCurveMode(mode) {
  const hotspot = selectedHotspot.value
  if (!hotspot) return
  hotspot.curveMode = mode
}

function addVertexAfterSelected() {
  const hotspot = selectedHotspot.value
  if (!hotspot?.points?.length) return

  const currentIndex = selectedPointIndex.value
  const nextIndex = (currentIndex + 1) % hotspot.points.length
  const currentPoint = hotspot.points[currentIndex]
  const nextPoint = hotspot.points[nextIndex]

  hotspot.points.splice(nextIndex, 0, {
    x: (currentPoint.x + nextPoint.x) / 2,
    y: (currentPoint.y + nextPoint.y) / 2,
  })

  selectedPointIndex.value = nextIndex
  syncRectFromPoints(hotspot)
}

function removeSelectedVertex() {
  const hotspot = selectedHotspot.value
  if (!hotspot || hotspot.points.length <= 3) return

  hotspot.points.splice(selectedPointIndex.value, 1)
  ensureSelectedPointIndex()
  syncRectFromPoints(hotspot)
}

function nudgeSelectedPoint(field, delta) {
  const hotspot = selectedHotspot.value
  const point = selectedPoint.value
  if (!hotspot || !point) return

  point[field] = clamp(point[field] + delta, 0, 100)
  syncRectFromPoints(hotspot)
}

function nudgeShape(dx, dy) {
  const hotspot = selectedHotspot.value
  if (!hotspot) return

  const nextLeft = clamp(hotspot.rect.left + dx, 0, 100 - hotspot.rect.width)
  const nextTop = clamp(hotspot.rect.top + dy, 0, 100 - hotspot.rect.height)
  const appliedDx = nextLeft - hotspot.rect.left
  const appliedDy = nextTop - hotspot.rect.top

  hotspot.points = hotspot.points.map((point) => ({
    x: point.x + appliedDx,
    y: point.y + appliedDy,
  }))
  syncRectFromPoints(hotspot)

  if (hotspot.labelAnchor) {
    hotspot.labelAnchor = {
      x: clamp(hotspot.labelAnchor.x + appliedDx, 0, 100),
      y: clamp(hotspot.labelAnchor.y + appliedDy, 0, 100),
    }
  }
}

function nudgeLabel(field, delta) {
  const hotspot = selectedHotspot.value
  if (!hotspot?.labelAnchor) return

  hotspot.labelAnchor[field] = clamp(hotspot.labelAnchor[field] + delta, 0, 100)
}

onMounted(() => {
  loadSavedHotspots()

  nextTick(() => {
    updateOverlayBox()
  })

  overlayResizeObserver = new ResizeObserver(() => {
    updateOverlayBox()
  })

  if (treeFrameRef.value) overlayResizeObserver.observe(treeFrameRef.value)
  if (treeImageRef.value) overlayResizeObserver.observe(treeImageRef.value)

  window.addEventListener('pointermove', handleGlobalPointerMove)
  window.addEventListener('pointerup', stopDrag)
  window.addEventListener('resize', updateOverlayBox)
})

onBeforeUnmount(() => {
  overlayResizeObserver?.disconnect()
  window.removeEventListener('pointermove', handleGlobalPointerMove)
  window.removeEventListener('pointerup', stopDrag)
  window.removeEventListener('resize', updateOverlayBox)
})
</script>

<template>
  <section class="landing-calibration">
    <header class="landing-calibration__header">
      <div>
        <p class="landing-calibration__eyebrow">Landing Tree Calibration</p>
        <h1>Path editor</h1>
        <p class="landing-calibration__lede">Use <code>/landing-calibration</code>. Drag whole shapes, drag vertices, add or remove vertices, and switch any hotspot between straight or curved outlines.</p>
      </div>
      <div class="landing-calibration__actions">
        <button type="button" class="ui-button ui-button--secondary" @click="loadSavedHotspots">Reload saved</button>
        <button type="button" class="ui-button ui-button--secondary" @click="persistDraft">Save draft</button>
        <button type="button" class="ui-button" @click="persistFinal">Save final</button>
        <button type="button" class="ui-button ui-button--secondary" @click="resetSaved">Reset all</button>
      </div>
    </header>

    <div class="landing-calibration__layout">
      <aside class="landing-calibration__sidebar">
        <div class="landing-calibration__panel">
          <h2>Hotspots</h2>
          <button
            v-for="hotspot in resolvedHotspots"
            :key="hotspot.id"
            type="button"
            :class="['landing-calibration__hotspot-select', { 'landing-calibration__hotspot-select--active': selectedHotspotId === hotspot.id }]"
            @click="setSelectedHotspot(hotspot.id)"
          >
            <span>{{ hotspot.title }}</span>
            <small>{{ hotspot.kind }}</small>
          </button>
        </div>

        <div v-if="selectedHotspot" class="landing-calibration__panel">
          <h2>Shape</h2>
          <p class="landing-calibration__metrics">
            <strong>{{ selectedHotspot.title }}</strong><br />
            mode {{ selectedHotspot.curveMode }}<br />
            left {{ selectedHotspot.rect.left.toFixed(2) }} · top {{ selectedHotspot.rect.top.toFixed(2) }}<br />
            width {{ selectedHotspot.rect.width.toFixed(2) }} · height {{ selectedHotspot.rect.height.toFixed(2) }}
          </p>

          <div class="landing-calibration__nudge-grid">
            <button type="button" class="ui-button ui-button--secondary" @click="setCurveMode('straight')">Straight</button>
            <button type="button" class="ui-button ui-button--secondary" @click="setCurveMode('curved')">Curved</button>
            <button type="button" class="ui-button ui-button--secondary" @click="addVertexAfterSelected">Add vertex</button>
            <button type="button" class="ui-button ui-button--secondary" @click="removeSelectedVertex">Remove vertex</button>
          </div>

          <div class="landing-calibration__nudge-grid">
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeShape(-0.1, 0)">Left -</button>
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeShape(0.1, 0)">Left +</button>
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeShape(0, -0.1)">Top -</button>
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeShape(0, 0.1)">Top +</button>
          </div>
        </div>

        <div v-if="selectedHotspot" class="landing-calibration__panel">
          <h2>Vertices</h2>
          <div class="landing-calibration__vertex-list">
            <button
              v-for="(point, pointIndex) in selectedHotspot.points"
              :key="pointKey(selectedHotspot.id, pointIndex)"
              type="button"
              :class="['landing-calibration__vertex-select', { 'landing-calibration__vertex-select--active': selectedPointIndex === pointIndex }]"
              @click="selectedPointIndex = pointIndex"
            >
              <span>V{{ pointIndex + 1 }}</span>
              <small>{{ point.x.toFixed(2) }}, {{ point.y.toFixed(2) }}</small>
            </button>
          </div>

          <div v-if="selectedPoint" class="landing-calibration__label-controls">
            <p class="landing-calibration__metrics">
              x {{ selectedPoint.x.toFixed(2) }} · y {{ selectedPoint.y.toFixed(2) }}
            </p>
            <div class="landing-calibration__nudge-grid">
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('x', -0.02)">X --</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('x', -0.1)">X -</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('x', 0.02)">X ++</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('x', 0.1)">X +</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('y', -0.02)">Y --</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('y', -0.1)">Y -</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('y', 0.02)">Y ++</button>
              <button type="button" class="ui-button ui-button--secondary" @click="nudgeSelectedPoint('y', 0.1)">Y +</button>
            </div>
          </div>
        </div>

        <div v-if="selectedHotspot?.labelAnchor" class="landing-calibration__panel">
          <h2>Label anchor</h2>
          <p class="landing-calibration__metrics">
            label x {{ selectedHotspot.labelAnchor.x.toFixed(2) }} · y {{ selectedHotspot.labelAnchor.y.toFixed(2) }}
          </p>
          <div class="landing-calibration__nudge-grid">
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeLabel('x', -0.1)">Label X -</button>
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeLabel('x', 0.1)">Label X +</button>
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeLabel('y', -0.1)">Label Y -</button>
            <button type="button" class="ui-button ui-button--secondary" @click="nudgeLabel('y', 0.1)">Label Y +</button>
          </div>
        </div>
      </aside>

      <div class="landing-calibration__workspace">
        <div
          ref="treeFrameRef"
          class="landing-calibration__frame"
          :style="{ aspectRatio: `${landingArtwork.ratio.width} / ${landingArtwork.ratio.height}` }"
        >
          <img
            ref="treeImageRef"
            class="landing-calibration__image"
            :src="landingArtwork.src"
            :alt="landingArtwork.alt"
            @load="updateOverlayBox"
          />

          <div class="landing-calibration__overlay" :style="imageOverlayStyle">
            <svg class="landing-calibration__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <g
                v-for="hotspot in resolvedHotspots"
                :key="hotspot.id"
                :class="[
                  'landing-calibration__shape-group',
                  `landing-calibration__shape-group--${hotspot.kind}`,
                  { 'landing-calibration__shape-group--selected': selectedHotspotId === hotspot.id },
                ]"
              >
                <path
                  class="landing-calibration__shape"
                  :d="hotspotPath(hotspot)"
                  @pointerdown="beginShapeDrag($event, hotspot.id)"
                />

                <circle
                  v-for="(point, pointIndex) in hotspot.points"
                  :key="pointKey(hotspot.id, pointIndex)"
                  class="landing-calibration__vertex"
                  :class="{ 'landing-calibration__vertex--selected': selectedHotspotId === hotspot.id && selectedPointIndex === pointIndex }"
                  :cx="point.x"
                  :cy="point.y"
                  r="0.55"
                  @pointerdown.stop="beginPointDrag($event, hotspot.id, pointIndex)"
                />
              </g>
            </svg>

            <button
              v-for="hotspot in resolvedHotspots.filter((entry) => entry.labelAnchor)"
              :key="`${hotspot.id}-label`"
              :class="[
                'landing-calibration__label-anchor',
                { 'landing-calibration__label-anchor--selected': selectedHotspotId === hotspot.id },
              ]"
              :style="labelAnchorStyle(hotspot)"
              @pointerdown.stop="beginLabelDrag($event, hotspot.id)"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing-calibration {
  min-height: 100svh;
  padding: 1rem;
  background: var(--color-page);
  display: grid;
  gap: 1rem;
}

.landing-calibration__header,
.landing-calibration__layout {
  display: grid;
  gap: 1rem;
}

.landing-calibration__header {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
}

.landing-calibration__eyebrow,
.landing-calibration__lede,
.landing-calibration__metrics {
  margin: 0;
}

.landing-calibration__eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.landing-calibration__actions,
.landing-calibration__nudge-grid,
.landing-calibration__vertex-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.landing-calibration__layout {
  grid-template-columns: 19rem minmax(0, 1fr);
  align-items: start;
}

.landing-calibration__sidebar,
.landing-calibration__workspace {
  min-width: 0;
}

.landing-calibration__sidebar {
  display: grid;
  gap: 1rem;
}

.landing-calibration__panel {
  display: grid;
  gap: 0.65rem;
  padding: 1rem;
  border: 1px solid rgba(106, 83, 43, 0.16);
  border-radius: 16px;
  background: rgba(249, 243, 230, 0.94);
}

.landing-calibration__hotspot-select,
.landing-calibration__vertex-select {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid rgba(106, 83, 43, 0.14);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.62);
  text-align: left;
  cursor: pointer;
}

.landing-calibration__hotspot-select--active,
.landing-calibration__vertex-select--active {
  border-color: rgba(106, 83, 43, 0.4);
  background: rgba(244, 232, 209, 0.92);
}

.landing-calibration__frame {
  position: relative;
  width: min(100%, 1100px);
  margin: 0 auto;
}

.landing-calibration__image {
  display: block;
  width: 100%;
  height: auto;
}

.landing-calibration__overlay {
  position: absolute;
}

.landing-calibration__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.landing-calibration__shape {
  fill: rgba(190, 30, 45, 0.015);
  stroke: rgba(255, 78, 214, 0.98);
  stroke-width: 0.22;
  vector-effect: non-scaling-stroke;
  cursor: move;
}

.landing-calibration__shape-group--selected .landing-calibration__shape {
  fill: rgba(13, 91, 158, 0.02);
  stroke: rgba(255, 120, 226, 1);
}

.landing-calibration__vertex {
  fill: rgba(255, 249, 236, 0.98);
  stroke: rgba(38, 38, 38, 0.9);
  stroke-width: 0.15;
  vector-effect: non-scaling-stroke;
  cursor: pointer;
}

.landing-calibration__vertex--selected {
  fill: rgba(196, 228, 255, 0.98);
  stroke: rgba(13, 91, 158, 0.95);
}

.landing-calibration__label-anchor {
  position: absolute;
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0.8px solid rgba(106, 83, 43, 0.9);
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(255, 228, 167, 0.98);
  box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.9);
  cursor: pointer;
}

.landing-calibration__label-anchor--selected {
  border-color: rgba(13, 91, 158, 0.95);
  background: rgba(196, 228, 255, 0.98);
}

@media (max-width: 980px) {
  .landing-calibration__header,
  .landing-calibration__layout {
    grid-template-columns: 1fr;
  }
}
</style>
