<script setup>
const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
})

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] || '')
    .join('')
    .toUpperCase()
}
</script>

<template>
  <article class="team-member-card">
    <div class="team-member-card__identity">
      <div v-if="member.photo" class="team-member-card__portrait">
        <img :src="member.photo" :alt="member.photoAlt || `${member.name} portrait`" />
      </div>
      <div v-else class="team-member-card__portrait team-member-card__portrait--placeholder" aria-hidden="true">
        {{ initials(member.name) }}
      </div>

      <div class="team-member-card__identity-copy">
        <h3 class="team-member-card__name">
          <a v-if="member.profileUrl" :href="member.profileUrl" target="_blank" rel="noreferrer noopener">{{ member.name }}</a>
          <span v-else>{{ member.name }}</span>
        </h3>
        <p class="team-member-card__meta">
          <span v-if="member.profileUrlTodo">{{ member.profileUrlTodo }}</span>
          <span v-else-if="!member.photo">Photo placeholder until final image is supplied.</span>
        </p>
      </div>
    </div>

    <div class="team-member-card__summary">
      <p v-if="member.summary">{{ member.summary }}</p>
      <p v-else class="team-member-card__placeholder">{{ member.placeholder }}</p>
    </div>
  </article>
</template>

<style scoped>
.team-member-card {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: 1.2rem;
  align-items: start;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border-soft);
}

.team-member-card:first-child {
  border-top: none;
  padding-top: 0;
}

.team-member-card__identity {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 0.9rem;
  align-items: start;
}

.team-member-card__portrait {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.62);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.team-member-card__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member-card__portrait--placeholder {
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, rgba(57, 89, 120, 0.12), rgba(212, 182, 113, 0.16));
  font-family: var(--font-display);
  font-size: 1.65rem;
  color: var(--color-primary);
}

.team-member-card__name {
  margin: 0;
  font-size: 1.14rem;
}

.team-member-card__name a {
  color: inherit;
  text-decoration: none;
}

.team-member-card__name a:hover {
  color: var(--color-primary);
}

.team-member-card__meta {
  margin: 0.35rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.84rem;
  color: var(--color-ink-soft);
}

.team-member-card__summary {
  min-width: 0;
}

.team-member-card__summary p {
  margin: 0;
}

.team-member-card__placeholder {
  color: var(--color-ink-soft);
}

@media (max-width: 760px) {
  .team-member-card {
    grid-template-columns: 1fr;
  }
}
</style>
