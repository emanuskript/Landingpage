<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getCodicologyPath } from '../../config/siteLinks'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  hotspots: {
    type: Array,
    required: true,
  },
})

const mode = ref('guided')
const selectedId = ref(props.hotspots[0]?.id ?? null)
const hoveredId = ref(null)
const HOVER_LEAVE_DELAY_MS = 120
const FALLBACK_MARKER_SIZE_PX = 36
const canvasRef = ref(null)
const markerRadiusX = ref(0)
const markerRadiusY = ref(0)
const markerAnchors = ref({})
const markerButtonElements = new Map()
let clearHoverTimer = null
let markerRadiusObserver = null

const zoneInfoByUnit = {
  1: 'Ancient and medieval writing comes on many supports: lead tablets, wood tablets, bark, pottery, clay, stone. Mostly lost are the wax tablets used for everyday and ephemeral writing. In the ancient world, papyrus was the most common writing support. In the European Middle Ages, parchment was the most common support until the spread of paper beginning in the late thirteenth century.',
  2: 'The trimmed parchment sheet was cut and folded into a number of leaves, which were then assembled into quires. A single sheet could produce folio, quarto, or octavo formats, depending on the number of folds. A parchment sheet could be used to produce pages of any of these formats, although the actual size of the page depended on the dimensions of the animal from which the parchment was made. A single sheet of parchment folded in half to form two leaves is a bifolium.',
  3: 'The sheets of parchment formed booklets called quires, often of four sheets folded in half for a total of eight leaves. Usually, the darker or rougher hair side was on the outside, and facing pages matched one another, hair with hair, flesh with flesh. Once layout scheme was determined, the sheets were pricked with an awl or blade, and then lightly scored, or ruled, to furnish guidelines for copying the text. Before copying, quires could be tacketed, or joined by a fastening thread or parchment strip near the top, functioning like a modern staple or paperclip.',
  4: 'Once the quire was prepared for copying, the scribe went to work. He or she held a quill pen in one hand and a penknife in the other for scraping mistakes away and sharpening the pen. The writing desk was equipped with an inkpot or inkhorn for black ink. The scribe might dust the support with a calcium-based powder to prevent the ink from spreading.',
  5: 'Medieval black ink falls into three main groups: carbon, iron-gall, and vegetable-based or mixed inks. Pigments came from mineral sources and organic dyes. Rubricating - marking the manuscript with titles, headings and other important texts, usually in red - and decorating were often undertaken at later stages. Many codices intended for them were never fully executed, and so headings, initials, illustrations are blank spaces.',
  6: 'After the text had been copied, the quires were stacked in a book block and bound together as a volume. This process had many stages, and different periods and places took different approaches. Holes or slits were pierced into the open quires for sewing together; they were folded again and stacked into a book block. They were then sewn together along cables called sewing supports. At least from the High Middle Ages, this took place on a sewing frame.',
  7: 'The quires were sewn together at the head and tail ends of the spine, forming endbands. Sometimes these were reinforced with a piece of leather or parchment called endtabs. The spine was spread with paste, and a piece of cloth, variously cut depending on the sewing supports, was pasted down as a supportive spine lining. In later periods, the edges would have been trimmed with a drawknife or, later, a book plough.',
  8: 'Wooden book boards were attached to the front and back of the book. While this was done at the time of book block sewing in the Carolingian period, it was normally done after edge trimming from the High Middle Ages on. The book boards were shaped and drilled with channels for lacing and fastening the book block to the boards. The ends of the sewing supports, already bound to the book block, were tightly laced through the channels and fastened in place.',
  9: 'The book boards were covered in paste and a leather or half-leather (alum-tawed) cover was pasted down on the outside covers and partially on the inside, sometimes reinforced by sewing. Metal fastenings were outfitted for closing the book tightly, so that the parchment would not expand too much. Bosses could be added to keep the books apart from one another, and other decorations could also be added. Overcovers could be added for enveloping the book in a second protective cover, or girdle books would be fashioned for carrying.',
}

const selectedHotspot = computed(() => props.hotspots.find((hotspot) => hotspot.id === selectedId.value) ?? props.hotspots[0] ?? null)
const hoveredHotspot = computed(() => props.hotspots.find((hotspot) => hotspot.id === hoveredId.value) ?? null)
const activeHotspot = computed(() => hoveredHotspot.value ?? selectedHotspot.value)
const orderedHotspots = computed(() => [...props.hotspots].sort((a, b) => a.unit - b.unit))
const selectedIndex = computed(() => orderedHotspots.value.findIndex((hotspot) => hotspot.id === selectedHotspot.value?.id))
const nextGuidedHotspot = computed(() =>
  mode.value === 'guided' && selectedIndex.value >= 0 ? orderedHotspots.value[selectedIndex.value + 1] ?? null : null,
)

function parseLengthToPixels(rawValue) {
  const value = Number.parseFloat(rawValue)
  if (!Number.isFinite(value)) return null

  if (rawValue.endsWith('rem')) {
    const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16
    return value * rootFontSize
  }

  return value
}

function updateGuidedGeometry() {
  const canvas = canvasRef.value
  if (!canvas) return

  const canvasRect = canvas.getBoundingClientRect()
  if (!canvasRect.width || !canvasRect.height) return

  const markerSizeToken = window.getComputedStyle(canvas).getPropertyValue('--bookbinding-guided-marker-size').trim()
  const markerSizeFromTokenPx = parseLengthToPixels(markerSizeToken)
  const firstMarkerElement = props.hotspots.map((hotspot) => markerButtonElements.get(hotspot.id)).find((element) => Boolean(element))
  const markerWidthPx = firstMarkerElement?.offsetWidth || markerSizeFromTokenPx || FALLBACK_MARKER_SIZE_PX
  const markerHeightPx = firstMarkerElement?.offsetHeight || markerWidthPx
  const radiusXpx = markerWidthPx / 2
  const radiusYpx = markerHeightPx / 2

  markerRadiusX.value = (radiusXpx / canvasRect.width) * 100
  markerRadiusY.value = (radiusYpx / canvasRect.height) * 100

  const nextAnchors = {}

  for (const hotspot of props.hotspots) {
    const markerButton = markerButtonElements.get(hotspot.id)
    if (!markerButton) continue

    const markerRect = markerButton.getBoundingClientRect()
    const centerX = ((markerRect.left + markerRect.width / 2 - canvasRect.left) / canvasRect.width) * 100
    const centerY = ((markerRect.top + markerRect.height / 2 - canvasRect.top) / canvasRect.height) * 100

    nextAnchors[hotspot.id] = {
      x: Math.min(100, Math.max(0, centerX)),
      y: Math.min(100, Math.max(0, centerY)),
    }
  }

  markerAnchors.value = nextAnchors
}

function setMarkerButtonRef(hotspotId, element) {
  if (element) {
    markerButtonElements.set(hotspotId, element)
  } else {
    markerButtonElements.delete(hotspotId)
  }

  updateGuidedGeometry()
}

function getHotspotAnchor(hotspot) {
  const measuredAnchor = markerAnchors.value[hotspot.id]
  if (measuredAnchor) return measuredAnchor

  const fallbackX = markerRadiusX.value > 0 ? hotspot.x + markerRadiusX.value : hotspot.x
  const fallbackY = markerRadiusY.value > 0 ? hotspot.y + markerRadiusY.value : hotspot.y

  return {
    x: fallbackX,
    y: fallbackY,
  }
}

function edgeOffsetFromMarker(previous, current) {
  if (markerRadiusX.value <= 0 || markerRadiusY.value <= 0) {
    return { x: 0, y: 0 }
  }

  const deltaX = current.x - previous.x
  const deltaY = current.y - previous.y
  const normalizedX = deltaX / markerRadiusX.value
  const normalizedY = deltaY / markerRadiusY.value
  const normalizedLength = Math.hypot(normalizedX, normalizedY) || 1

  return {
    x: (normalizedX / normalizedLength) * markerRadiusX.value,
    y: (normalizedY / normalizedLength) * markerRadiusY.value,
  }
}

function buildGuidedPath(hotspots) {
  if (hotspots.length < 2) return ''

  let path = ''

  for (let index = 1; index < hotspots.length; index += 1) {
    const previous = hotspots[index - 1]
    const current = hotspots[index]
    const edgeOffset = edgeOffsetFromMarker(previous, current)
    const startX = previous.x + edgeOffset.x
    const startY = previous.y + edgeOffset.y
    const endX = current.x - edgeOffset.x
    const endY = current.y - edgeOffset.y
    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2
    const deltaX = endX - startX
    const deltaY = endY - startY
    const distance = Math.hypot(deltaX, deltaY) || 1
    const curveDirection = index % 2 === 0 ? -1 : 1
    const offset = Math.min(2.8, distance * 0.11) * curveDirection
    const controlX = midX + (-deltaY / distance) * offset
    const controlY = midY + (deltaX / distance) * offset

    path += ` M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
  }

  return path
}

const orderedAnchoredHotspots = computed(() =>
  orderedHotspots.value.map((hotspot) => {
    const anchor = getHotspotAnchor(hotspot)

    return {
      ...hotspot,
      x: anchor.x,
      y: anchor.y,
    }
  }),
)

const guidedPath = computed(() => buildGuidedPath(orderedAnchoredHotspots.value))
const guidedProgressPath = computed(() =>
  selectedIndex.value >= 0 ? buildGuidedPath(orderedAnchoredHotspots.value.slice(0, selectedIndex.value + 1)) : '',
)

function markerStyle(hotspot) {
  return {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
  }
}

function popupClass(hotspot) {
  return {
    'bookbinding-workshop__popup--below': hotspot.y < 36,
    'bookbinding-workshop__popup--align-left': hotspot.x > 74,
    'bookbinding-workshop__popup--align-right': hotspot.x < 24,
  }
}

function setMode(nextMode) {
  mode.value = nextMode

  if (nextMode === 'guided' && !selectedHotspot.value && orderedHotspots.value.length) {
    selectedId.value = orderedHotspots.value[0].id
  }
}

function selectHotspot(hotspotId) {
  selectedId.value = hotspotId
}

function hoverHotspot(hotspotId) {
  if (clearHoverTimer !== null) {
    window.clearTimeout(clearHoverTimer)
    clearHoverTimer = null
  }

  hoveredId.value = hotspotId
}

function clearHoveredHotspot() {
  if (clearHoverTimer !== null) {
    window.clearTimeout(clearHoverTimer)
  }

  clearHoverTimer = window.setTimeout(() => {
    hoveredId.value = null
    clearHoverTimer = null
  }, HOVER_LEAVE_DELAY_MS)
}

onBeforeUnmount(() => {
  if (clearHoverTimer !== null) {
    window.clearTimeout(clearHoverTimer)
  }

  if (markerRadiusObserver) {
    markerRadiusObserver.disconnect()
    markerRadiusObserver = null
  }

  window.removeEventListener('resize', updateGuidedGeometry)
})

onMounted(() => {
  nextTick(() => {
    updateGuidedGeometry()
  })

  if (typeof ResizeObserver !== 'undefined') {
    markerRadiusObserver = new ResizeObserver(() => {
      updateGuidedGeometry()
    })

    if (canvasRef.value) {
      markerRadiusObserver.observe(canvasRef.value)
    }
  }

  window.addEventListener('resize', updateGuidedGeometry, { passive: true })
})

watch(
  [mode, () => props.hotspots],
  async () => {
    await nextTick()
    updateGuidedGeometry()
  },
  { deep: true },
)
</script>

<template>
  <section class="bookbinding-workshop">
    <header class="bookbinding-workshop__header">
      <p class="bookbinding-workshop__intro-note">Choose a mode, then click a marker on the map.</p>

      <div class="bookbinding-workshop__modes" role="tablist" aria-label="Scriptorium reading mode">
        <button
          type="button"
          class="bookbinding-workshop__mode-button"
          :class="{ 'bookbinding-workshop__mode-button--active': mode === 'guided' }"
          :aria-selected="mode === 'guided'"
          @click="setMode('guided')"
        >
          Guided tour
        </button>
        <button
          type="button"
          class="bookbinding-workshop__mode-button"
          :class="{ 'bookbinding-workshop__mode-button--active': mode === 'explore' }"
          :aria-selected="mode === 'explore'"
          @click="setMode('explore')"
        >
          Explore on your own
        </button>
      </div>
    </header>

    <div class="bookbinding-workshop__layout">
      <div ref="canvasRef" class="bookbinding-workshop__canvas">
        <img class="bookbinding-workshop__image" :src="image" alt="Medieval scriptorium scene used for the codicology tutorial" />

        <svg
          v-if="mode === 'guided' && orderedHotspots.length > 1"
          class="bookbinding-workshop__guided-path"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            class="bookbinding-workshop__guided-line bookbinding-workshop__guided-line--base"
            :d="guidedPath"
          />
          <path
            class="bookbinding-workshop__guided-line bookbinding-workshop__guided-line--spark"
            :d="guidedPath"
          />
          <path
            v-if="guidedProgressPath"
            class="bookbinding-workshop__guided-line bookbinding-workshop__guided-line--progress"
            :d="guidedProgressPath"
          />

        </svg>

        <div
          v-for="hotspot in hotspots"
          :key="hotspot.id"
          class="bookbinding-workshop__marker-anchor"
          :class="{ 'bookbinding-workshop__marker-anchor--active': activeHotspot?.id === hotspot.id }"
          :style="markerStyle(hotspot)"
          @mouseenter="hoverHotspot(hotspot.id)"
          @mouseleave="clearHoveredHotspot"
        >
          <button
            :ref="(element) => setMarkerButtonRef(hotspot.id, element)"
            type="button"
            class="bookbinding-workshop__marker"
            :class="[
              `bookbinding-workshop__marker--${mode}`,
              { 'bookbinding-workshop__marker--active': activeHotspot?.id === hotspot.id },
              { 'bookbinding-workshop__marker--next': nextGuidedHotspot?.id === hotspot.id },
            ]"
            :aria-label="`Show info for Zone ${hotspot.unit}`"
            @focus="hoverHotspot(hotspot.id)"
            @blur="clearHoveredHotspot"
            @click="selectHotspot(hotspot.id)"
          >
            <span v-if="mode === 'guided'" class="bookbinding-workshop__marker-number" aria-hidden="true">
              {{ hotspot.unit }}
            </span>
            <span class="sr-only">{{ hotspot.label }}</span>
          </button>

          <div
            v-if="hoveredId === hotspot.id"
            class="bookbinding-workshop__popup ui-surface-card"
            :class="popupClass(hotspot)"
            role="dialog"
            :aria-label="`Codicology information for Zone ${hotspot.unit}`"
            @mouseenter="hoverHotspot(hotspot.id)"
            @mouseleave="clearHoveredHotspot"
          >
            <h3 class="bookbinding-workshop__popup-title">Zone {{ hotspot.unit }}</h3>
            <p class="bookbinding-workshop__popup-text">{{ zoneInfoByUnit[hotspot.unit] ?? hotspot.summary }}</p>
            <RouterLink class="bookbinding-workshop__popup-link ui-button-link ui-button--secondary" :to="getCodicologyPath(hotspot.chapter)">
              Click here to read further.
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bookbinding-workshop {
  display: grid;
  gap: 0.65rem;
}

.bookbinding-workshop__header {
  display: grid;
  gap: 0.5rem;
  justify-items: center;
}

.bookbinding-workshop__intro-note {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  line-height: 1.35;
  color: var(--color-ink);
  font-weight: 600;
}

.bookbinding-workshop__modes {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.bookbinding-workshop__mode-button {
  font-family: var(--font-sans);
}

.bookbinding-workshop__mode-button {
  flex: 1 1 0;
  max-width: 15rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: rgba(255, 252, 246, 0.88);
  padding: 0.55rem 0.9rem;
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.bookbinding-workshop__mode-button--active {
  background: rgba(57, 89, 120, 0.9);
  border-color: rgba(57, 89, 120, 0.95);
  color: #f8f3e7;
}

.bookbinding-workshop__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.1rem;
  align-items: start;
}

.bookbinding-workshop__canvas {
  --bookbinding-guided-marker-size: 2.25rem;
  position: relative;
  overflow: visible;
  isolation: isolate;
  border-radius: 30px;
  border: 1px solid var(--color-border-strong);
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.94), rgba(243, 234, 218, 0.92)),
    radial-gradient(circle at top left, rgba(104, 75, 38, 0.08), transparent 34%);
  box-shadow: var(--shadow-panel);
}

.bookbinding-workshop__image {
  display: block;
  width: 100%;
  height: auto;
  min-height: 0;
  object-fit: contain;
}

.bookbinding-workshop__guided-path {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: 1;
}

.bookbinding-workshop__guided-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.bookbinding-workshop__guided-line--base {
  stroke: rgba(126, 91, 53, 0.45);
  stroke-width: 1.18;
  opacity: 0.95;
  filter: drop-shadow(0 0 0.08rem rgba(78, 54, 29, 0.26));
}

.bookbinding-workshop__guided-line--spark {
  stroke: rgba(156, 113, 66, 0.74);
  stroke-width: 0.9;
  opacity: 0.92;
  filter: drop-shadow(0 0 0.1rem rgba(86, 59, 31, 0.28));
}

.bookbinding-workshop__guided-line--progress {
  stroke: rgba(72, 49, 24, 0.95);
  stroke-width: 1.58;
  opacity: 1;
  filter: drop-shadow(0 0 0.12rem rgba(56, 38, 18, 0.36));
}

.bookbinding-workshop__marker {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  z-index: 2;
}

.bookbinding-workshop__marker-anchor {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  z-index: 2;
}

.bookbinding-workshop__marker-anchor--active {
  z-index: 16;
}

.bookbinding-workshop__marker::before,
.bookbinding-workshop__marker::after {
  content: '';
  position: absolute;
  inset: -0.2rem;
  border-radius: 999px;
  pointer-events: none;
  opacity: 0;
}

.bookbinding-workshop__marker--guided {
  width: var(--bookbinding-guided-marker-size);
  height: var(--bookbinding-guided-marker-size);
  border-radius: 999px;
  background: rgba(36, 28, 18, 0.84);
  box-shadow:
    0 0 0 5px rgba(212, 182, 113, 0.15),
    0 10px 24px rgba(0, 0, 0, 0.2);
}

.bookbinding-workshop__marker--guided .bookbinding-workshop__marker-number {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  font-weight: 700;
  color: #f8f3e7;
}

.bookbinding-workshop__marker--explore {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 999px;
  background: rgba(255, 248, 236, 0.85);
  border: 2px solid rgba(110, 84, 43, 0.88);
  box-shadow: 0 0 0 6px rgba(255, 248, 236, 0.16);
}

.bookbinding-workshop__marker--active {
  transform: scale(1.08);
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--active {
  background: rgba(57, 89, 120, 0.94);
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--active::before {
  border: 1px solid rgba(242, 212, 148, 0.85);
  box-shadow: 0 0 0.9rem rgba(236, 196, 118, 0.65);
  animation: marker-magic-ring 1.6s ease-out infinite;
  opacity: 1;
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--active::after {
  inset: -0.45rem;
  background: radial-gradient(circle, rgba(243, 219, 163, 0.5) 0%, rgba(243, 219, 163, 0) 72%);
  animation: marker-magic-glow 1.25s ease-in-out infinite;
  opacity: 1;
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--active .bookbinding-workshop__marker-number {
  text-shadow: 0 0 0.5rem rgba(251, 238, 208, 0.92), 0 0 1rem rgba(230, 196, 133, 0.7);
  animation: marker-number-flicker 1.7s ease-in-out infinite;
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--next {
  background: rgba(36, 28, 18, 0.84);
  box-shadow:
    0 0 0 5px rgba(212, 182, 113, 0.15),
    0 0 1rem rgba(245, 214, 162, 0.78),
    0 0 1.85rem rgba(236, 196, 118, 0.52),
    0 10px 24px rgba(0, 0, 0, 0.22);
}

.bookbinding-workshop__marker--explore.bookbinding-workshop__marker--active {
  background: rgba(212, 182, 113, 0.92);
}

.bookbinding-workshop__marker--explore.bookbinding-workshop__marker--active::before {
  border: 1px solid rgba(184, 145, 81, 0.8);
  animation: marker-magic-ring 1.7s ease-out infinite;
  opacity: 1;
}

.bookbinding-workshop__popup {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.7rem);
  transform: translateX(-50%);
  width: min(46rem, calc(100vw - 1rem));
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'title'
    'text'
    'link';
  column-gap: 1rem;
  row-gap: 0.55rem;
  padding: 1rem 1.15rem;
  z-index: 999;
  pointer-events: auto;
}

.bookbinding-workshop__popup::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0.78rem;
  height: 0.78rem;
  background: rgba(248, 241, 229, 0.96);
  border-right: 1px solid var(--color-border-strong);
  border-bottom: 1px solid var(--color-border-strong);
  transform: translateX(-50%) rotate(45deg);
}

.bookbinding-workshop__popup--below {
  top: calc(100% + 0.7rem);
  bottom: auto;
}

.bookbinding-workshop__popup--below::after {
  top: auto;
  bottom: 100%;
  border-right: none;
  border-bottom: none;
  border-left: 1px solid var(--color-border-strong);
  border-top: 1px solid var(--color-border-strong);
}

.bookbinding-workshop__popup--align-left {
  left: auto;
  right: 0;
  transform: none;
}

.bookbinding-workshop__popup--align-left::after {
  left: auto;
  right: 0.95rem;
  transform: rotate(45deg);
}

.bookbinding-workshop__popup--align-right {
  left: 0;
  transform: none;
}

.bookbinding-workshop__popup--align-right::after {
  left: 0.95rem;
  transform: rotate(45deg);
}

.bookbinding-workshop__popup-title {
  margin: 0;
  grid-area: title;
  align-self: center;
  font-size: 1.12rem;
}

.bookbinding-workshop__popup-text {
  margin: 0;
  grid-area: text;
  color: var(--color-ink-light);
  line-height: 1.38;
  font-size: 0.97rem;
  overflow-wrap: anywhere;
}

.bookbinding-workshop__popup-link {
  grid-area: link;
  align-self: end;
  justify-self: start;
  width: fit-content;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 940px) {
  .bookbinding-workshop__header,
  .bookbinding-workshop__layout {
    grid-template-columns: 1fr;
    display: grid;
  }
}

@media (max-width: 720px) {
  .bookbinding-workshop__canvas {
    --bookbinding-guided-marker-size: 2rem;
  }

  .bookbinding-workshop__modes {
    flex-direction: column;
    align-items: stretch;
  }

  .bookbinding-workshop__mode-button {
    max-width: none;
  }

  .bookbinding-workshop__guided-line--base {
    stroke-width: 1.02;
  }

  .bookbinding-workshop__guided-line--spark {
    stroke-width: 0.8;
  }

  .bookbinding-workshop__guided-line--progress {
    stroke-width: 1.36;
  }

  .bookbinding-workshop__popup {
    width: min(34rem, calc(100vw - 1rem));
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'text'
      'link';
    row-gap: 0.65rem;
  }

  .bookbinding-workshop__popup-link {
    width: fit-content;
    justify-self: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bookbinding-workshop__marker,
  .bookbinding-workshop__mode-button,
  .bookbinding-workshop__popup-link {
    transition: none !important;
  }

  .bookbinding-workshop__marker--active::before,
  .bookbinding-workshop__marker--active::after,
  .bookbinding-workshop__marker--active .bookbinding-workshop__marker-number {
    animation: none !important;
  }
}

@keyframes marker-magic-ring {
  0% {
    transform: scale(0.82);
    opacity: 0.85;
  }

  70% {
    transform: scale(1.34);
    opacity: 0.1;
  }

  100% {
    transform: scale(1.42);
    opacity: 0;
  }
}

@keyframes marker-magic-glow {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.35;
  }

  50% {
    transform: scale(1.12);
    opacity: 0.7;
  }
}

@keyframes marker-number-flicker {
  0%,
  100% {
    opacity: 1;
  }

  45% {
    opacity: 0.86;
  }

  55% {
    opacity: 0.97;
  }
}
</style>
