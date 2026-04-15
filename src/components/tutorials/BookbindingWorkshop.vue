<script setup>
import { computed, ref } from 'vue'
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

const selectedHotspot = computed(() => props.hotspots.find((hotspot) => hotspot.id === selectedId.value) ?? props.hotspots[0] ?? null)
const orderedHotspots = computed(() => [...props.hotspots].sort((a, b) => a.unit - b.unit))
const selectedIndex = computed(() => orderedHotspots.value.findIndex((hotspot) => hotspot.id === selectedHotspot.value?.id))
const nextGuidedHotspot = computed(() =>
  mode.value === 'guided' && selectedIndex.value >= 0 ? orderedHotspots.value[selectedIndex.value + 1] ?? null : null,
)

function buildGuidedPath(hotspots) {
  if (!hotspots.length) return ''

  let path = `M ${hotspots[0].x} ${hotspots[0].y}`

  for (let index = 1; index < hotspots.length; index += 1) {
    const previous = hotspots[index - 1]
    const current = hotspots[index]
    const midX = (previous.x + current.x) / 2
    const midY = (previous.y + current.y) / 2
    const deltaX = current.x - previous.x
    const deltaY = current.y - previous.y
    const distance = Math.hypot(deltaX, deltaY) || 1
    const curveDirection = index % 2 === 0 ? -1 : 1
    const offset = Math.min(4.5, distance * 0.16) * curveDirection
    const controlX = midX + (-deltaY / distance) * offset
    const controlY = midY + (deltaX / distance) * offset

    path += ` Q ${controlX} ${controlY} ${current.x} ${current.y}`
  }

  return path
}

const guidedPath = computed(() => buildGuidedPath(orderedHotspots.value))
const guidedProgressPath = computed(() =>
  selectedIndex.value >= 0 ? buildGuidedPath(orderedHotspots.value.slice(0, selectedIndex.value + 1)) : '',
)

function markerStyle(hotspot) {
  return {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
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
</script>

<template>
  <section class="bookbinding-workshop">
    <header class="bookbinding-workshop__header">
      <div class="bookbinding-workshop__intro">
        <p class="bookbinding-workshop__eyebrow">Scriptorium gateway</p>
        <h2>Choose a reading mode</h2>
        <p>
          Follow the suggested tour through the numbered regions, or explore the workshop freely and open each unit from
          its zone card.
        </p>
      </div>

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
      <div class="bookbinding-workshop__canvas">
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

          <g class="bookbinding-workshop__guided-dust">
            <circle
              v-for="hotspot in orderedHotspots"
              :key="`${hotspot.id}-dust`"
              class="bookbinding-workshop__guided-dust-point"
              :class="{ 'bookbinding-workshop__guided-dust-point--active': selectedHotspot?.id === hotspot.id }"
              :cx="hotspot.x"
              :cy="hotspot.y"
              r="0.7"
            />
          </g>
        </svg>

        <button
          v-for="hotspot in hotspots"
          :key="hotspot.id"
          type="button"
          class="bookbinding-workshop__marker"
          :class="[
            `bookbinding-workshop__marker--${mode}`,
            { 'bookbinding-workshop__marker--active': selectedHotspot?.id === hotspot.id },
            { 'bookbinding-workshop__marker--next': nextGuidedHotspot?.id === hotspot.id },
          ]"
          :style="markerStyle(hotspot)"
          :aria-label="`Open ${hotspot.label}`"
          @click="selectHotspot(hotspot.id)"
        >
          <span v-if="mode === 'guided'" class="bookbinding-workshop__marker-number" aria-hidden="true">
            {{ hotspot.unit }}
          </span>
          <span class="sr-only">{{ hotspot.label }}</span>
        </button>
      </div>

      <aside v-if="selectedHotspot" class="bookbinding-workshop__panel" aria-live="polite">
        <p class="bookbinding-workshop__panel-kicker">
          {{ mode === 'guided' ? `Unit ${selectedHotspot.numeral}` : `Zone ${selectedHotspot.unit}` }}
        </p>
        <h3>{{ selectedHotspot.label }}</h3>
        <p>{{ selectedHotspot.summary }}</p>
        <RouterLink class="bookbinding-workshop__panel-link" :to="getCodicologyPath(selectedHotspot.chapter)">
          Click here to read further
        </RouterLink>

        <ol class="bookbinding-workshop__zone-list">
          <li v-for="hotspot in hotspots" :key="`${hotspot.id}-link`">
            <button
              type="button"
              class="bookbinding-workshop__zone-button"
              :class="[
                { 'bookbinding-workshop__zone-button--active': selectedHotspot.id === hotspot.id },
                { 'bookbinding-workshop__zone-button--next': nextGuidedHotspot?.id === hotspot.id },
              ]"
              @click="selectHotspot(hotspot.id)"
            >
              <span>{{ hotspot.unit }}</span>
              <strong>{{ hotspot.label }}</strong>
            </button>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.bookbinding-workshop {
  display: grid;
  gap: 1rem;
}

.bookbinding-workshop__header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 24px;
  background: rgba(255, 251, 243, 0.72);
  border: 1px solid var(--color-border-soft);
}

.bookbinding-workshop__intro {
  max-width: 60ch;
}

.bookbinding-workshop__eyebrow,
.bookbinding-workshop__panel-kicker {
  margin: 0 0 0.35rem;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.bookbinding-workshop__intro h2,
.bookbinding-workshop__panel h3 {
  margin: 0;
  font-size: 1.3rem;
}

.bookbinding-workshop__intro p:last-child,
.bookbinding-workshop__panel p {
  margin: 0.55rem 0 0;
}

.bookbinding-workshop__modes {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bookbinding-workshop__mode-button,
.bookbinding-workshop__zone-button,
.bookbinding-workshop__panel-link {
  font-family: var(--font-sans);
}

.bookbinding-workshop__mode-button {
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
  position: relative;
  overflow: hidden;
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
  stroke: rgba(94, 63, 28, 0.42);
  stroke-width: 0.44;
  stroke-dasharray: 0.18 1.35;
  opacity: 0.92;
}

.bookbinding-workshop__guided-line--spark {
  stroke: rgba(177, 118, 42, 0.92);
  stroke-width: 0.62;
  stroke-dasharray: 0.22 1.95;
  opacity: 0.92;
  filter: drop-shadow(0 0 0.08rem rgba(110, 70, 22, 0.42)) drop-shadow(0 0 0.2rem rgba(221, 174, 98, 0.28));
  animation: guided-dust-flow 8.6s linear infinite;
}

.bookbinding-workshop__guided-line--progress {
  stroke: rgba(246, 215, 154, 0.98);
  stroke-width: 0.82;
  stroke-dasharray: 0.26 1.62;
  opacity: 1;
  filter: drop-shadow(0 0 0.1rem rgba(128, 84, 26, 0.44)) drop-shadow(0 0 0.24rem rgba(245, 214, 160, 0.34));
  animation: guided-path-glimmer 4.6s ease-in-out infinite;
}

.bookbinding-workshop__guided-dust-point {
  fill: rgba(174, 118, 49, 0.72);
  filter: drop-shadow(0 0 0.3rem rgba(245, 214, 160, 0.58));
  animation: guided-dust-pulse 4.8s ease-in-out infinite;
}

.bookbinding-workshop__guided-dust-point--active {
  fill: rgba(255, 242, 210, 0.95);
  animation-duration: 2.8s;
}

.bookbinding-workshop__marker {
  position: absolute;
  transform: translate(-50%, -50%);
  border: none;
  background: transparent;
  padding: 0;
  z-index: 2;
}

.bookbinding-workshop__marker--guided {
  width: 2.25rem;
  height: 2.25rem;
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
  transform: translate(-50%, -50%) scale(1.08);
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--active {
  background: rgba(57, 89, 120, 0.94);
}

.bookbinding-workshop__marker--guided.bookbinding-workshop__marker--next {
  background: rgba(36, 28, 18, 0.84);
  box-shadow:
    0 0 0 5px rgba(212, 182, 113, 0.15),
    0 0 1rem rgba(245, 214, 162, 0.78),
    0 0 1.85rem rgba(236, 196, 118, 0.52),
    0 10px 24px rgba(0, 0, 0, 0.22);
  animation: guided-next-glow 2.8s ease-in-out infinite;
}

.bookbinding-workshop__marker--explore.bookbinding-workshop__marker--active {
  background: rgba(212, 182, 113, 0.92);
}

.bookbinding-workshop__panel {
  display: grid;
  gap: 0.8rem;
  padding: 1.2rem 1.25rem 1.15rem;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(244, 236, 221, 0.93)),
    radial-gradient(circle at top right, rgba(57, 89, 120, 0.1), transparent 32%);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-panel);
}

.bookbinding-workshop__panel-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 999px;
  padding: 0.6rem 0.95rem;
  background: rgba(57, 89, 120, 0.92);
  color: #f8f3e7;
  text-decoration: none;
}

.bookbinding-workshop__panel-link:hover {
  color: #fffdf7;
  background: rgba(33, 56, 79, 0.95);
}

.bookbinding-workshop__zone-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.65rem;
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.bookbinding-workshop__zone-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-align: left;
  padding: 0.65rem 0.75rem;
  border-radius: 18px;
  border: 1px solid var(--color-border-soft);
  background: rgba(255, 251, 243, 0.72);
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.bookbinding-workshop__zone-button span {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  background: rgba(57, 89, 120, 0.1);
  color: var(--color-primary);
  font-weight: 700;
}

.bookbinding-workshop__zone-button strong {
  font-size: 0.96rem;
  line-height: 1.4;
}

.bookbinding-workshop__zone-button--active {
  border-color: var(--color-branch);
  background: rgba(255, 253, 248, 0.95);
}

.bookbinding-workshop__zone-button--next {
  border-color: rgba(188, 143, 58, 0.52);
  background:
    linear-gradient(180deg, rgba(255, 252, 244, 0.96), rgba(247, 238, 221, 0.94)),
    radial-gradient(circle at left center, rgba(230, 196, 131, 0.18), transparent 42%);
  box-shadow: 0 0 0 1px rgba(214, 175, 104, 0.14), 0 10px 22px rgba(139, 105, 44, 0.08);
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

@keyframes guided-dust-flow {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.36;
  }

  50% {
    opacity: 0.95;
  }

  100% {
    stroke-dashoffset: -7.8;
    opacity: 0.36;
  }
}

@keyframes guided-path-glimmer {
  0%, 100% {
    opacity: 0.58;
    stroke-width: 0.62;
  }

  50% {
    opacity: 1;
    stroke-width: 0.82;
  }
}

@keyframes guided-dust-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes guided-next-glow {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.14);
  }
}

@media (max-width: 940px) {
  .bookbinding-workshop__header,
  .bookbinding-workshop__layout {
    grid-template-columns: 1fr;
    display: grid;
  }
}

@media (max-width: 720px) {
  .bookbinding-workshop__zone-list {
    grid-template-columns: 1fr;
  }

  .bookbinding-workshop__guided-line--base {
    stroke-width: 0.58;
  }

  .bookbinding-workshop__guided-line--spark {
    stroke-width: 0.72;
  }

  .bookbinding-workshop__guided-line--progress {
    stroke-width: 0.96;
  }

  .bookbinding-workshop__marker--guided {
    width: 2rem;
    height: 2rem;
  }

  .bookbinding-workshop__header {
    padding: 0.95rem 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bookbinding-workshop__guided-line--spark,
  .bookbinding-workshop__guided-line--progress,
  .bookbinding-workshop__guided-dust-point,
  .bookbinding-workshop__marker--guided.bookbinding-workshop__marker--next {
    animation: none !important;
  }
}
</style>
