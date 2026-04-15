<script setup>
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import TeamMemberCard from '../components/team/TeamMemberCard.vue'
import { teamContent } from '../content/team/team'
</script>

<template>
  <SiteShell :eyebrow="teamContent.eyebrow" :title="teamContent.title" :lede="teamContent.lede" wide>
    <div class="team-page">
      <SectionFrame :id="teamContent.intro.id" :title="teamContent.intro.title">
        <div class="team-page__prose">
          <p
            v-for="(paragraph, paragraphIndex) in teamContent.intro.paragraphs"
            :key="`${teamContent.intro.id}-${paragraphIndex}`"
            class="team-page__paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </SectionFrame>

      <SectionFrame
        v-for="section in teamContent.sections"
        :id="section.id"
        :key="section.id"
        :title="section.title"
        :tone="section.id === 'further-acknowledgements' ? 'muted' : 'default'"
      >
        <div v-if="section.intro" class="team-page__prose team-page__section-intro">
          <p class="team-page__paragraph">{{ section.intro }}</p>
        </div>

        <div class="team-page__members">
          <TeamMemberCard v-for="member in section.members" :key="member.id" :member="member" />
        </div>
      </SectionFrame>
    </div>
  </SiteShell>
</template>

<style scoped>
.team-page {
  display: grid;
  gap: 1.35rem;
}

.team-page__prose {
  max-width: 76ch;
}

.team-page__section-intro {
  margin-bottom: 1.3rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(113, 89, 54, 0.12);
}

.team-page__paragraph {
  line-height: 1.75;
}

.team-page__paragraph:last-child {
  margin-bottom: 0;
}

.team-page__members {
  display: grid;
}
</style>
