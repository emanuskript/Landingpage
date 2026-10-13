<script setup>
import { computed } from 'vue'
import TutorialBreadcrumb from '../../../components/navigation/TutorialBreadcrumb.vue'
import { routePaths } from '../../../config/siteLinks'
import { getMsiPath, msiLessons, msiOverview } from '../../../content/tutorials/msi/msi'

const coverLessons = computed(() => msiLessons.filter((lesson) => lesson.slug !== 'bibliography'))
const bibliographyLesson = computed(() => msiLessons.find((lesson) => lesson.slug === 'bibliography'))

const coverPoses = [
  { left: '9%', depth: '12px', yaw: '15deg' },
  { left: '22.5%', depth: '8px', yaw: '11deg' },
  { left: '36%', depth: '4px', yaw: '7deg' },
  { left: '49.5%', depth: '0px', yaw: '2deg' },
  { left: '63%', depth: '4px', yaw: '-4deg' },
  { left: '76.5%', depth: '8px', yaw: '-9deg' },
  { left: '90%', depth: '12px', yaw: '-13deg' },
]

function coverStyle(index) {
  const pose = coverPoses[index] || coverPoses[coverPoses.length - 1]
  return {
    '--book-left': pose.left,
    '--book-depth': pose.depth,
    '--book-yaw': pose.yaw,
    '--book-layer': String(index + 1),
  }
}
</script>

<template>
  <section class="msi-overview">
    <div class="msi-overview__inner">
      <TutorialBreadcrumb
        class="msi-overview__breadcrumb"
        :crumbs="[
          { label: 'Tutorials', to: routePaths.tutorialsIndex },
          { label: msiOverview.title, to: getMsiPath() },
        ]"
      />

      <header class="msi-overview__hero">
        <p class="ui-eyebrow">{{ msiOverview.eyebrow }}</p>
        <h1>{{ msiOverview.title }}</h1>
        <p>{{ msiOverview.lede }}</p>
      </header>

      <section class="msi-overview__scene" aria-label="MSI tutorial unit covers">
        <div class="msi-overview__shelf" aria-hidden="true">
          <span class="msi-overview__shelf-back" />
          <span class="msi-overview__shelf-top" />
          <span class="msi-overview__shelf-base" />
          <span class="msi-overview__shelf-shadow" />
        </div>

        <div class="msi-overview__stack">
          <RouterLink
            v-for="(lesson, index) in coverLessons"
            :key="lesson.slug"
            :to="getMsiPath(lesson.slug)"
            class="msi-overview__book"
            :style="coverStyle(index)"
            :aria-label="`Open Unit ${lesson.numeral}: ${lesson.title}`"
          >
            <span class="msi-overview__book-spine" aria-hidden="true" />
            <span class="msi-overview__book-pages" aria-hidden="true" />

            <span class="msi-overview__book-front">
              <span class="msi-overview__book-art">
                <img
                  :src="lesson.coverImage"
                  :alt="lesson.coverImageAlt || lesson.title"
                  :style="{ objectPosition: lesson.coverImagePosition || 'center center' }"
                  loading="eager"
                  decoding="async"
                />
              </span>

              <span class="msi-overview__book-copy">
                <span class="msi-overview__book-unit">Unit {{ lesson.numeral }}</span>
                <strong>{{ lesson.title }}</strong>
              </span>
            </span>
          </RouterLink>
        </div>
      </section>

      <div v-if="bibliographyLesson" class="msi-overview__footer">
        <RouterLink :to="getMsiPath(bibliographyLesson.slug)" class="msi-overview__bibliography-button ui-button-link">
          <span class="msi-overview__bibliography-meta">Unit {{ bibliographyLesson.numeral }}</span>
          <span class="msi-overview__bibliography-title">{{ bibliographyLesson.title }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.msi-overview {
  padding: 2.3rem 0 3.8rem;
}

.msi-overview__inner {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
}

.msi-overview__breadcrumb {
  margin-bottom: 1.1rem;
}

.msi-overview__hero {
  display: grid;
  gap: 0.95rem;
  padding: 1.4rem;
  background:
    linear-gradient(180deg, rgba(255, 252, 244, 0.95), rgba(244, 236, 221, 0.92)),
    radial-gradient(circle at top right, rgba(104, 75, 38, 0.13), transparent 35%);
  border: 1px solid var(--color-border-strong);
  border-radius: 28px;
  box-shadow: var(--shadow-panel);
}

.msi-overview__hero p,
.msi-overview__hero h1 {
  margin: 0;
}

.msi-overview__hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.02;
  overflow-wrap: anywhere;
}

.msi-overview__hero p:last-child {
  width: 100%;
  max-width: none;
  font-size: 1rem;
  line-height: 1.62;
  color: var(--color-ink);
}

.msi-overview__scene {
  position: relative;
  min-height: clamp(28rem, 38vw, 31rem);
  margin-top: 0.25rem;
  perspective: 4200px;
  transform-style: preserve-3d;
  overflow: visible;
  isolation: isolate;
}

.msi-overview__stack {
  position: relative;
  width: min(1120px, calc(100% - 0.4rem));
  min-height: inherit;
  margin: 0 auto;
  transform-style: preserve-3d;
}

.msi-overview__shelf {
  position: absolute;
  inset: 1.4rem 0 0;
  pointer-events: none;
  transform-style: preserve-3d;
}

.msi-overview__shelf-back,
.msi-overview__shelf-top,
.msi-overview__shelf-base,
.msi-overview__shelf-shadow {
  position: absolute;
  display: block;
}

.msi-overview__shelf-back {
  inset: 1.6rem 4.2% 4rem;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(175, 148, 103, 0.16), rgba(123, 94, 54, 0.08)),
    linear-gradient(90deg, rgba(255, 248, 236, 0.18), rgba(121, 94, 56, 0.05), rgba(255, 248, 236, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 248, 236, 0.36),
    inset 0 -1px 0 rgba(105, 77, 44, 0.14);
  transform: translateZ(-90px);
}

.msi-overview__shelf-top,
.msi-overview__shelf-base {
  left: 2.8%;
  right: 2.8%;
  height: 1.1rem;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(184, 151, 101, 0.95), rgba(126, 95, 56, 0.96)),
    linear-gradient(90deg, rgba(255, 246, 226, 0.3), transparent 20%, transparent 80%, rgba(72, 52, 27, 0.22));
  box-shadow:
    inset 0 1px 0 rgba(255, 248, 236, 0.36),
    0 12px 18px rgba(78, 56, 31, 0.14);
}

.msi-overview__shelf-top {
  top: 1rem;
  transform: translateZ(-20px);
}

.msi-overview__shelf-base {
  bottom: 2.15rem;
  transform: translateZ(0);
}

.msi-overview__shelf-shadow {
  inset: auto 6% 0.2rem;
  height: 5.2rem;
  background: radial-gradient(circle at center, rgba(93, 70, 40, 0.18), rgba(93, 70, 40, 0.07) 44%, transparent 76%);
  filter: blur(24px);
  opacity: 0.85;
}

.msi-overview__book {
  position: absolute;
  left: var(--book-left);
  bottom: 2.95rem;
  z-index: var(--book-layer);
  width: clamp(9.4rem, 13.7vw, 11rem);
  text-decoration: none;
  color: inherit;
  transform-style: preserve-3d;
  transform-origin: center bottom;
  transform:
    translateX(-50%)
    translateZ(var(--book-depth))
    rotateY(var(--book-yaw));
  transition:
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 320ms ease;
  outline: none;
  will-change: transform;
}

.msi-overview__book-front {
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.42rem;
  min-height: clamp(20rem, 30vw, 24rem);
  padding: 0.52rem 0.56rem 0.74rem;
  border-radius: 18px 16px 16px 18px;
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.98), rgba(245, 236, 221, 0.95)),
    linear-gradient(135deg, rgba(57, 89, 120, 0.06), transparent 40%);
  border: 1px solid rgba(106, 83, 43, 0.18);
  box-shadow: 0 18px 34px rgba(66, 48, 25, 0.16);
  overflow: hidden;
}

.msi-overview__book-front::after {
  content: '';
  position: absolute;
  inset: auto 0.62rem 3rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(106, 83, 43, 0.18), transparent);
}

.msi-overview__book-spine {
  position: absolute;
  top: 0.82rem;
  bottom: 3.44rem;
  left: -1rem;
  width: 1rem;
  border-radius: 12px 0 0 12px;
  background:
    linear-gradient(180deg, rgba(170, 144, 95, 0.96), rgba(120, 96, 58, 0.96)),
    linear-gradient(90deg, rgba(255, 255, 255, 0.28), transparent 55%);
  border: 1px solid rgba(106, 83, 43, 0.22);
  border-right: 0;
  transform-origin: right center;
  transform: rotateY(-72deg);
  box-shadow: inset 1px 0 0 rgba(255, 252, 246, 0.32);
}

.msi-overview__book-pages {
  position: absolute;
  top: 0.82rem;
  right: -0.6rem;
  bottom: 3.44rem;
  width: 0.7rem;
  border-radius: 0 12px 12px 0;
  background:
    linear-gradient(180deg, rgba(255, 251, 243, 0.98), rgba(228, 220, 201, 0.92));
  border: 1px solid rgba(106, 83, 43, 0.14);
  border-left: 0;
  transform-origin: left center;
  transform: rotateY(76deg);
}

.msi-overview__book-art {
  display: grid;
  place-items: center;
  min-height: 0;
  padding: 0.26rem;
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(222, 226, 231, 0.9), rgba(244, 239, 231, 0.92));
  border: 1px solid rgba(106, 83, 43, 0.12);
}

.msi-overview__book-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 11px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
}

.msi-overview__book-copy {
  display: grid;
  gap: 0.14rem;
  min-height: 3rem;
  align-content: start;
}

.msi-overview__book-unit {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.msi-overview__book-copy strong {
  font-family: var(--font-display);
  font-size: 0.92rem;
  line-height: 1.08;
  color: var(--color-primary-strong);
}

.msi-overview__book:hover,
.msi-overview__book:focus-visible {
  z-index: 40;
  transform:
    translateX(-50%)
    translateY(-1rem)
    translateZ(calc(var(--book-depth) + 112px))
    rotateY(0deg)
    scale(1.04);
  filter: saturate(1.03);
}

.msi-overview__book:hover .msi-overview__book-front,
.msi-overview__book:focus-visible .msi-overview__book-front {
  box-shadow: 0 28px 56px rgba(66, 48, 25, 0.24);
}

.msi-overview__book:hover .msi-overview__book-art img,
.msi-overview__book:focus-visible .msi-overview__book-art img {
  animation: msi-book-pop 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.msi-overview__book:hover .msi-overview__book-spine,
.msi-overview__book:focus-visible .msi-overview__book-spine {
  transform: rotateY(-82deg);
}

.msi-overview__book:hover .msi-overview__book-pages,
.msi-overview__book:focus-visible .msi-overview__book-pages {
  transform: rotateY(82deg);
}

.msi-overview__book:focus-visible .msi-overview__book-front {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

.msi-overview__footer {
  display: flex;
  justify-content: center;
  margin-top: 0.2rem;
}

.msi-overview__bibliography-button {
  width: 100%;
  justify-content: center;
  gap: 0.7rem;
  min-height: 0;
  padding: 1rem 1.4rem;
  border-radius: 28px;
  border: 1px solid var(--color-border-strong);
  background:
    linear-gradient(180deg, rgba(255, 252, 244, 0.95), rgba(244, 236, 221, 0.92)),
    radial-gradient(circle at top right, rgba(104, 75, 38, 0.13), transparent 35%);
  box-shadow: var(--shadow-panel);
  color: var(--color-primary-strong);
}

.msi-overview__bibliography-meta,
.msi-overview__bibliography-title {
  display: block;
}

.msi-overview__bibliography-meta {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
  opacity: 1;
}

.msi-overview__bibliography-title {
  font-family: var(--font-display);
  font-size: 1.08rem;
}

.msi-overview__bibliography-button:hover,
.msi-overview__bibliography-button:focus-visible {
  background:
    linear-gradient(180deg, rgba(255, 253, 249, 0.98), rgba(246, 238, 225, 0.94)),
    var(--color-panel-hover);
  border-color: var(--color-branch);
  box-shadow: 0 18px 38px rgba(69, 49, 23, 0.13);
  color: var(--color-primary-strong);
}

@keyframes msi-book-pop {
  0% {
    transform: scale(1);
  }

  55% {
    transform: scale(1.035);
  }

  100% {
    transform: scale(1.015);
  }
}

@media (max-width: 980px) {
  .msi-overview__scene {
    min-height: 23.5rem;
  }

  .msi-overview__book {
    width: clamp(7rem, 15vw, 8rem);
  }

  .msi-overview__book-front {
    min-height: 15.6rem;
  }

  .msi-overview__shelf-back {
    inset: 1.4rem 2.8% 3.2rem;
  }

  .msi-overview__shelf-top,
  .msi-overview__shelf-base {
    left: 1.8%;
    right: 1.8%;
  }
}

@media (max-width: 760px) {
  .msi-overview {
    padding: 1.25rem 0 2.4rem;
  }

  .msi-overview__inner {
    width: min(1180px, calc(100% - 1rem));
  }

  .msi-overview__breadcrumb {
    margin-bottom: 0.8rem;
  }

  .msi-overview__hero {
    padding: 1rem;
    border-radius: 22px;
  }

  .msi-overview__hero h1 {
    font-size: clamp(1.8rem, 9vw, 2.4rem);
    line-height: 1.06;
  }

  .msi-overview__scene {
    min-height: 17.8rem;
  }

  .msi-overview__book {
    width: 4.8rem;
    bottom: 2.7rem;
  }

  .msi-overview__book-front {
    min-height: 9.8rem;
    padding: 0.28rem 0.28rem 0.42rem;
    gap: 0.25rem;
  }

  .msi-overview__book-front::after {
    inset: auto 0.4rem 1.7rem;
  }

  .msi-overview__book-spine,
  .msi-overview__book-pages {
    display: none;
  }

  .msi-overview__book-copy {
    min-height: 1.2rem;
  }

  .msi-overview__book-unit {
    font-size: 0.38rem;
  }

  .msi-overview__book-copy strong {
    font-size: 0.46rem;
  }

  .msi-overview__book:hover,
  .msi-overview__book:focus-visible {
    transform:
      translateX(-50%)
      translateY(-0.45rem)
      translateZ(calc(var(--book-depth) + 24px))
      rotateY(0deg)
      scale(1.03);
  }

  .msi-overview__shelf-top,
  .msi-overview__shelf-base {
    height: 0.82rem;
  }

  .msi-overview__shelf-base {
    bottom: 1.9rem;
  }
}
</style>
