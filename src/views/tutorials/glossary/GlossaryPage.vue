<script setup>
import { computed, ref } from 'vue'
import SiteShell from '../../../components/layout/SiteShell.vue'
import GlossaryTerm from '../../../components/glossary/GlossaryTerm.vue'
import { glossaryOverview, glossaryTerms } from '../../../content/glossary/glossary'
import { groupGlossaryTermsByLetter } from '../../../composables/useGlossary'

const query = ref('')

const filteredTerms = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) return glossaryTerms
  return glossaryTerms.filter((term) => {
    const haystack = [term.term, term.definition, term.slug, ...(term.aliases || [])].join(' ').toLowerCase()
    return haystack.includes(needle)
  })
})

const grouped = computed(() => {
  const groups = groupGlossaryTermsByLetter(filteredTerms.value)
  return Object.keys(groups)
    .sort()
    .map((letter) => ({ letter, terms: groups[letter].sort((a, b) => a.term.localeCompare(b.term)) }))
})

const alphabet = computed(() => grouped.value.map((group) => group.letter))
</script>

<template>
  <SiteShell :eyebrow="glossaryOverview.eyebrow" :title="glossaryOverview.title" :lede="glossaryOverview.lede" wide>
    <div class="glossary-page">
      <label class="glossary-page__search">
        <span>Search the glossary</span>
        <input v-model="query" type="search" placeholder="Search terms, definitions, and aliases" />
      </label>

      <nav v-if="alphabet.length" class="glossary-page__alphabet" aria-label="Glossary letters">
        <a v-for="letter in alphabet" :key="letter" :href="`#letter-${letter}`">{{ letter }}</a>
      </nav>

      <section v-for="group in grouped" :id="`letter-${group.letter}`" :key="group.letter" class="glossary-page__group">
        <h2>{{ group.letter }}</h2>
        <div class="glossary-page__grid">
          <GlossaryTerm v-for="term in group.terms" :key="term.slug" :term="term" />
        </div>
      </section>
    </div>
  </SiteShell>
</template>

<style scoped>
.glossary-page {
  display: grid;
  gap: 1.4rem;
}

.glossary-page__search {
  display: grid;
  gap: 0.5rem;
  font-family: var(--font-sans);
}

.glossary-page__search span {
  font-size: 0.9rem;
  color: var(--color-ink-soft);
}

.glossary-page__search input {
  padding: 0.9rem 1rem;
  border-radius: 18px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.72);
}

.glossary-page__alphabet {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.glossary-page__alphabet a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-strong);
  text-decoration: none;
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 0.84rem;
  box-shadow: var(--shadow-panel);
}

.glossary-page__group {
  display: grid;
  gap: 0.8rem;
}

.glossary-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
