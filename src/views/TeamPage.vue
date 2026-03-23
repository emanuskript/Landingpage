<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import TeamMemberCard from '../components/team/TeamMemberCard.vue'
import { teamContent } from '../content/team/team'
</script>

<template>
  <SiteShell :eyebrow="teamContent.eyebrow" :title="teamContent.title" :lede="teamContent.lede" wide>
    <div class="team-page">
      <SectionFrame v-for="group in teamContent.groups" :key="group.id" :title="group.label">
        <div class="team-page__members">
          <TeamMemberCard v-for="member in group.members" :key="member.name" :member="member" />
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
</style>
