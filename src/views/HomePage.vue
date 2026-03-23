<script setup>
import { appHotspots, landingArtwork, landingIntro, tutorialHotspots } from '../content/landing'
</script>

<template>
  <section class="home-page">
    <div class="home-page__intro">
      <p class="home-page__eyebrow">{{ landingIntro.eyebrow }}</p>
      <h1>{{ landingIntro.title }}</h1>
      <p class="home-page__lede">{{ landingIntro.lede }}</p>

      <div class="home-page__actions">
        <RouterLink class="home-page__action home-page__action--primary" to="/tutorials">
          Enter tutorials
        </RouterLink>
        <RouterLink class="home-page__action" to="/apps">
          Explore apps
        </RouterLink>
      </div>

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
    </div>

    <div class="home-page__art">
      <div class="home-page__image-wrap">
        <img :src="landingArtwork.src" :alt="landingArtwork.alt" />

        <RouterLink
          v-for="hotspot in appHotspots"
          :key="hotspot.id"
          :to="hotspot.route"
          class="home-page__hotspot home-page__hotspot--app"
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
          :style="{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }"
        >
          <span class="home-page__hotspot-name">{{ hotspot.name }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(1rem, 3vw, 2rem);
}

.home-page__intro {
  display: grid;
  align-content: start;
  gap: 1rem;
  padding: clamp(1.4rem, 3vw, 2.1rem);
  background: rgba(255, 250, 241, 0.72);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border-strong);
  border-radius: 30px;
  box-shadow: var(--shadow-panel);
}

.home-page__eyebrow {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-primary);
}

.home-page h1 {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  line-height: 0.98;
}

.home-page__lede {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-ink-soft);
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
  display: grid;
  gap: 0.8rem;
  margin-top: 0.4rem;
}

.home-page__legend h2 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.home-page__legend p {
  margin: 0;
  color: var(--color-ink-soft);
}

.home-page__art {
  min-width: 0;
}

.home-page__image-wrap {
  position: relative;
  max-width: min(900px, 100%);
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
  .home-page {
    grid-template-columns: 1fr;
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
</style>
