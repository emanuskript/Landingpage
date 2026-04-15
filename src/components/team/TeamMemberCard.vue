<script setup>
import { computed } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
})

const memberLinks = computed(() => props.member.links || [])

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] || '')
    .join('')
    .toUpperCase()
}
</script>

<template>
  <article class="team-member-card">
      <div class="team-member-card__identity ui-surface-card ui-surface-card--soft">
      <div
        v-if="member.photo"
        class="team-member-card__portrait"
      >
        <img
          :src="member.photo"
          :alt="member.photoAlt || `Portrait of ${member.name}`"
          :class="{
            'team-member-card__image--mirrored': member.photoMirror,
            'team-member-card__image--contain': member.photoContain,
          }"
        />
      </div>
      <div
        v-else
        class="team-member-card__portrait team-member-card__portrait--placeholder"
        role="img"
        :aria-label="member.photoAlt || `Photo placeholder for ${member.name}`"
      >
        <span>{{ initials(member.name) }}</span>
      </div>

      <div class="team-member-card__identity-copy">
        <h3 class="team-member-card__name">{{ member.name }}</h3>
        <p v-if="member.title" class="team-member-card__title">{{ member.title }}</p>

        <ul v-if="memberLinks.length" class="team-member-card__links ui-inline-links" aria-label="Related links">
          <li v-for="link in memberLinks" :key="`${member.id}-${link.label}`">
            <a :href="link.href" target="_blank" rel="noreferrer noopener">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="team-member-card__details ui-surface-card ui-surface-card--soft">
      <p class="team-member-card__description">{{ member.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.team-member-card {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  padding: 1.4rem 0;
  border-top: 1px solid var(--color-border-soft);
}

.team-member-card:first-child {
  border-top: none;
  padding-top: 0;
}

.team-member-card__identity {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
  padding: 1rem;
}

.team-member-card__portrait {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid var(--color-border-strong);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.48), rgba(255, 249, 239, 0.86)),
    rgba(245, 236, 222, 0.86);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.team-member-card__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member-card__image--contain {
  object-fit: contain;
  padding: 0.5rem;
  background: rgba(255, 252, 247, 0.92);
}

.team-member-card__image--mirrored {
  transform: scaleX(-1);
}

.team-member-card__portrait--placeholder {
  display: grid;
  place-items: center;
  color: var(--color-primary-strong);
  font-family: var(--font-display);
  font-size: 1.55rem;
  letter-spacing: 0.04em;
}

.team-member-card__identity-copy {
  min-width: 0;
}

.team-member-card__name {
  margin: 0;
  font-size: 1.16rem;
  line-height: 1.2;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.team-member-card__title {
  margin: 0.35rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--color-ink-soft);
}

.team-member-card__links {
  margin: 0.7rem 0 0;
  padding: 0;
  list-style: none;
}

.team-member-card__links a {
  color: var(--color-primary-strong);
}

.team-member-card__details {
  min-width: 0;
  padding: 1rem 1.1rem;
}

.team-member-card__description {
  margin: 0;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .team-member-card {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .team-member-card__identity {
    grid-template-columns: 92px minmax(0, 1fr);
  }
}
</style>
