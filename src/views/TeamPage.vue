<script setup>
import { computed } from 'vue'
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import { teamGroups, teamMembers } from '../content/team/team'

const grouped = computed(() =>
  teamGroups.map((group) => ({
    ...group,
    members: teamMembers.filter((member) => member.group === group.id),
  })),
)

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
  <SiteShell eyebrow="Team" title="Project team" lede="A grouped presentation of the people and contribution areas represented in the local project materials." wide>
    <div class="team-page">
      <SectionFrame v-for="group in grouped" :key="group.id" :title="group.label">
        <div class="team-page__members">
          <article v-for="member in group.members" :key="member.name" class="team-page__member">
            <div class="team-page__portrait">{{ initials(member.name) }}</div>
            <div>
              <h3>{{ member.name }}</h3>
              <p class="team-page__role">{{ member.role }}</p>
              <p>{{ member.bio }}</p>
            </div>
          </article>
        </div>
      </SectionFrame>
    </div>
  </SiteShell>
</template>

<style scoped>
.team-page {
  display: grid;
  gap: 1rem;
}

.team-page__members {
  display: grid;
  gap: 1rem;
}

.team-page__member {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.team-page__portrait {
  aspect-ratio: 4 / 5;
  display: grid;
  place-items: center;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(57, 89, 120, 0.16), rgba(212, 182, 113, 0.16));
  border: 1px solid var(--color-border-strong);
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-primary);
}

.team-page__member h3 {
  margin: 0;
}

.team-page__role {
  margin: 0.25rem 0 0.6rem;
  font-family: var(--font-sans);
  color: var(--color-primary);
}

@media (max-width: 680px) {
  .team-page__member {
    grid-template-columns: 1fr;
  }

  .team-page__portrait {
    max-width: 180px;
  }
}
</style>
