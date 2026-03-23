<script setup>
import { appHotspots, landingArtwork, landingIntro, tutorialHotspots } from '../content/landing'
</script>

<template>
  <section class="home-page">
    <header class="home-page__topbar">
      <div class="home-page__topbar-copy">
        <p class="home-page__eyebrow">{{ landingIntro.eyebrow }}</p>
      </div>

      <div class="home-page__actions">
        <RouterLink class="home-page__action home-page__action--primary" to="/tutorials">
          Enter tutorials
        </RouterLink>
        <RouterLink class="home-page__action" to="/apps">
          Explore apps
        </RouterLink>
      </div>
    </header>

    <div class="home-page__art">
      <div class="home-page__image-wrap">
        <img :src="landingArtwork.src" :alt="landingArtwork.alt" />

        <RouterLink
          v-for="hotspot in appHotspots"
          :key="hotspot.id"
          :to="hotspot.route"
          class="home-page__hotspot home-page__hotspot--app"
          :aria-label="`Open ${hotspot.name}`"
          :style="{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, '--hotspot-color': hotspot.color }"
        >
          <span class="home-page__hotspot-name">{{ hotspot.name }}</span>
          <span class="home-page__hotspot-summary">{{ hotspot.summary }}</span>
        </RouterLink>

        <RouterLink
          v-for="hotspot in tutorialHotspots"
          :key="hotspot.id"
          :to="hotspot.route"
          class="home-page__hotspot home-page__hotspot--tutorial"
          :aria-label="`Open ${hotspot.name} tutorial`"
          :style="{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }"
        >
          <span class="home-page__hotspot-name">{{ hotspot.name }}</span>
        </RouterLink>
      </div>
    </div>

    <footer class="home-page__bottombar">
      <div class="home-page__legend">
        <div>
          <h2>Applications</h2>
          <p>The apples carry the four project tools.</p>
        </div>
        <div>
          <h2>Tutorial gateways</h2>
          <p>The smaller growths lead into the tutorial pathways.</p>
        </div>
      </div>

      <nav class="home-page__index" aria-label="Landing page quick links">
        <p class="home-page__index-title">Project routes</p>
        <div class="home-page__index-links">
          <RouterLink to="/apps">Apps</RouterLink>
          <RouterLink to="/tutorials">Tutorials</RouterLink>
          <RouterLink to="/bibliography">Bibliography</RouterLink>
          <RouterLink to="/about">About the Project</RouterLink>
          <RouterLink to="/team">Team</RouterLink>
        </div>
      </nav>
    </footer>
  </section>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: clamp(0.85rem, 2.4vw, 1.5rem);
  padding: clamp(1rem, 3vw, 2rem);
}

.home-page__topbar,
.home-page__bottombar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  padding: clamp(1rem, 2.4vw, 1.45rem) clamp(1.1rem, 2.8vw, 1.75rem);
  background: rgba(255, 250, 241, 0.72);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border-strong);
  border-radius: 30px;
  box-shadow: var(--shadow-panel);
}

.home-page__topbar-copy {
  min-width: 0;
}

.home-page__eyebrow {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-primary);
}

.home-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.home-page__action {
  padding: 0.8rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.68);
  text-decoration: none;
  font-family: var(--font-sans);
}

.home-page__action--primary {
  background: var(--color-primary);
  color: white;
  border-color: transparent;
}

.home-page__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.2rem;
}

.home-page__legend h2 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.home-page__legend p {
  margin: 0;
  color: var(--color-ink-soft);
}

.home-page__index {
  display: grid;
  gap: 0.7rem;
}

.home-page__index-title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.home-page__index-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.home-page__index-links a {
  display: inline-flex;
  align-items: center;
  padding: 0.52rem 0.78rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid var(--color-border-soft);
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.86rem;
}

.home-page__index-links a:hover {
  background: rgba(255, 255, 255, 0.78);
}

.home-page__art {
  min-width: 0;
  display: grid;
  align-items: center;
}

.home-page__image-wrap {
  position: relative;
  max-width: min(1040px, 100%);
  margin: 0 auto;
}

.home-page__image-wrap img {
  width: 100%;
  height: auto;
  border-radius: 32px;
  box-shadow: 0 24px 60px rgba(38, 28, 16, 0.18);
}

.home-page__hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  display: grid;
  gap: 0.2rem;
  min-width: 110px;
  max-width: 220px;
  padding: 0.55rem 0.75rem;
  border-radius: 16px;
  text-decoration: none;
  text-align: left;
  transition: transform var(--transition-base), box-shadow var(--transition-base), background var(--transition-base);
}

.home-page__hotspot:focus-visible,
.home-page__hotspot:hover {
  transform: translate(-50%, -50%) scale(1.03);
}

.home-page__hotspot--app {
  background: color-mix(in srgb, var(--hotspot-color) 76%, white);
  color: white;
  box-shadow: 0 10px 25px color-mix(in srgb, var(--hotspot-color) 35%, transparent);
}

.home-page__hotspot--tutorial {
  background: rgba(249, 243, 229, 0.86);
  color: var(--color-ink);
  border: 1px solid rgba(106, 83, 43, 0.24);
  box-shadow: 0 10px 25px rgba(69, 49, 23, 0.12);
}

.home-page__hotspot-name {
  font-family: var(--font-sans);
  font-weight: 700;
}

.home-page__hotspot-summary {
  font-size: 0.78rem;
  line-height: 1.25;
}

@media (max-width: 980px) {
  .home-page__topbar,
  .home-page__bottombar {
    flex-direction: column;
    align-items: flex-start;
  }

  .home-page__image-wrap {
    max-width: 720px;
  }

  .home-page__hotspot {
    min-width: 90px;
    max-width: 150px;
    padding: 0.45rem 0.55rem;
    font-size: 0.78rem;
  }

  .home-page__hotspot-summary {
    display: none;
  }
}

@media (max-width: 640px) {
  .home-page__actions,
  .home-page__index-links {
    width: 100%;
  }
}
</style>
