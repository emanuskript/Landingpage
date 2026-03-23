<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteShell from '../components/layout/SiteShell.vue'
import SectionFrame from '../components/ui/SectionFrame.vue'
import BibliographyResultCard from '../components/bibliography/BibliographyResultCard.vue'
import { useZoteroBibliography } from '../composables/useZoteroBibliography'
import { bibliographyContent } from '../content/bibliography/bibliography'

const route = useRoute()
const router = useRouter()

const searchInput = ref('')
const selectedCollection = ref('')
const selectedType = ref('')
const selectedSort = ref(bibliographyContent.sortOptions[0]?.value || 'date')

function syncFormWithRoute() {
  searchInput.value = typeof route.query.q === 'string' ? route.query.q : ''
  selectedCollection.value = typeof route.query.collection === 'string' ? route.query.collection : ''
  selectedType.value = typeof route.query.type === 'string' ? route.query.type : ''
  selectedSort.value = typeof route.query.sort === 'string' ? route.query.sort : bibliographyContent.sortOptions[0]?.value || 'date'
}

watch(
  () => route.query,
  () => {
    syncFormWithRoute()
  },
  { immediate: true },
)

const currentPage = computed(() => {
  const page = Number(route.query.page || 1)
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
})

const params = computed(() => ({
  q: typeof route.query.q === 'string' ? route.query.q : '',
  collection: typeof route.query.collection === 'string' ? route.query.collection : '',
  itemType: typeof route.query.type === 'string' ? route.query.type : '',
  sort: typeof route.query.sort === 'string' ? route.query.sort : bibliographyContent.sortOptions[0]?.value || 'date',
  direction: 'desc',
  start: (currentPage.value - 1) * bibliographyContent.resultPageSize,
  limit: bibliographyContent.resultPageSize,
}))

const { collections, error, items, loading, loadingCollections, totalPages, totalResults } = useZoteroBibliography(
  bibliographyContent.zotero,
  params,
)

const activeCollection = computed(() =>
  collections.value.find((collection) => collection.key === (typeof route.query.collection === 'string' ? route.query.collection : '')),
)

const activeType = computed(() =>
  bibliographyContent.quickTypes.find((type) => type.value === (typeof route.query.type === 'string' ? route.query.type : '')),
)

const resultsLabel = computed(() => {
  if (loading.value) return 'Loading bibliography...'
  if (!totalResults.value) return 'No results'

  const start = (currentPage.value - 1) * bibliographyContent.resultPageSize + 1
  const end = Math.min(currentPage.value * bibliographyContent.resultPageSize, totalResults.value)
  return `${start}-${end} of ${totalResults.value} references`
})

function replaceQuery(page = 1) {
  const nextQuery = {
    ...(searchInput.value.trim() ? { q: searchInput.value.trim() } : {}),
    ...(selectedCollection.value ? { collection: selectedCollection.value } : {}),
    ...(selectedType.value ? { type: selectedType.value } : {}),
    ...(selectedSort.value && selectedSort.value !== bibliographyContent.sortOptions[0]?.value ? { sort: selectedSort.value } : {}),
    ...(page > 1 ? { page: String(page) } : {}),
  }

  router.replace({ query: nextQuery })
}

function submitSearch() {
  replaceQuery(1)
}

function toggleCollection(key) {
  selectedCollection.value = selectedCollection.value === key ? '' : key
  replaceQuery(1)
}

function toggleType(value) {
  selectedType.value = selectedType.value === value ? '' : value
  replaceQuery(1)
}

function changeSort() {
  replaceQuery(1)
}

function clearFilters() {
  searchInput.value = ''
  selectedCollection.value = ''
  selectedType.value = ''
  selectedSort.value = bibliographyContent.sortOptions[0]?.value || 'date'
  replaceQuery(1)
}

function goToPage(page) {
  replaceQuery(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <SiteShell
    :eyebrow="bibliographyContent.eyebrow"
    :title="bibliographyContent.title"
    :lede="bibliographyContent.lede"
    :meta="['Live Zotero browser', 'Kerko-ready integration']"
    wide
  >
    <div class="bibliography-page">
      <SectionFrame title="Bibliography access" tone="muted">
        <p>
          This page searches the public Zotero group library directly so the bibliography is usable immediately inside the
          eManuskript interface.
        </p>
        <div class="bibliography-page__actions">
          <a :href="bibliographyContent.zotero.webUrl" target="_blank" rel="noreferrer noopener">
            Open the Zotero library
          </a>
          <a v-if="bibliographyContent.kerkoBaseUrl" :href="bibliographyContent.kerkoBaseUrl" target="_blank" rel="noreferrer noopener">
            Open the Kerko bibliography
          </a>
          <a :href="bibliographyContent.kerkoDocsUrl" target="_blank" rel="noreferrer noopener">Kerko documentation</a>
        </div>
        <ul>
          <li v-for="note in bibliographyContent.notes" :key="note">{{ note }}</li>
        </ul>
      </SectionFrame>

      <div class="bibliography-layout">
        <aside class="bibliography-layout__sidebar">
          <SectionFrame title="Refine the bibliography">
            <form class="bibliography-filters" @submit.prevent="submitSearch">
              <label class="bibliography-field">
                <span>Keyword search</span>
                <input v-model="searchInput" type="search" placeholder="Search title, author, or year" />
              </label>

              <label class="bibliography-field">
                <span>Sort by</span>
                <select v-model="selectedSort" @change="changeSort">
                  <option v-for="option in bibliographyContent.sortOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </label>

              <div class="bibliography-filters__buttons">
                <button type="submit">Apply search</button>
                <button type="button" class="bibliography-filters__clear" @click="clearFilters">Clear</button>
              </div>
            </form>
          </SectionFrame>

          <SectionFrame title="Resource types" tone="muted">
            <div class="bibliography-chips">
              <button
                v-for="type in bibliographyContent.quickTypes"
                :key="type.value"
                type="button"
                :class="['bibliography-chip', { 'bibliography-chip--active': selectedType === type.value }]"
                :aria-pressed="selectedType === type.value"
                @click="toggleType(type.value)"
              >
                {{ type.label }}
              </button>
            </div>
          </SectionFrame>

          <SectionFrame title="Collections" tone="muted">
            <p v-if="loadingCollections" class="bibliography-page__sidebar-note">Loading collection list...</p>
            <div v-else class="bibliography-collections">
              <button
                v-for="collection in collections"
                :key="collection.key"
                type="button"
                :class="['bibliography-collection', { 'bibliography-collection--active': selectedCollection === collection.key }]"
                :aria-pressed="selectedCollection === collection.key"
                @click="toggleCollection(collection.key)"
              >
                <span>{{ collection.name }}</span>
                <strong>{{ collection.numItems }}</strong>
              </button>
            </div>
          </SectionFrame>
        </aside>

        <div class="bibliography-layout__results">
          <SectionFrame title="Results">
            <div class="bibliography-results__header">
              <div>
                <p class="bibliography-results__count">{{ resultsLabel }}</p>
                <p v-if="activeCollection || activeType" class="bibliography-results__context">
                  <span v-if="activeCollection">{{ activeCollection.name }}</span>
                  <span v-if="activeCollection && activeType"> · </span>
                  <span v-if="activeType">{{ activeType.label }}</span>
                </p>
              </div>
            </div>

            <p v-if="error" class="bibliography-results__error">{{ error }}</p>
            <p v-else-if="loading" class="bibliography-results__empty">Loading bibliography records...</p>
            <p v-else-if="!items.length" class="bibliography-results__empty">
              No references matched the current search and filter combination.
            </p>

            <div v-else class="bibliography-results">
              <BibliographyResultCard v-for="item in items" :key="item.key" :item="item" />
            </div>

            <div v-if="totalPages > 1" class="bibliography-pagination">
              <button type="button" :disabled="currentPage <= 1" @click="goToPage(currentPage - 1)">Previous</button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button type="button" :disabled="currentPage >= totalPages" @click="goToPage(currentPage + 1)">Next</button>
            </div>
          </SectionFrame>
        </div>
      </div>
    </div>
  </SiteShell>
</template>

<style scoped>
.bibliography-page {
  display: grid;
  gap: 1rem;
}

.bibliography-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin: 1rem 0;
  font-family: var(--font-sans);
}

.bibliography-layout {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.bibliography-layout__sidebar,
.bibliography-layout__results {
  display: grid;
  gap: 1rem;
}

.bibliography-filters {
  display: grid;
  gap: 1rem;
}

.bibliography-field {
  display: grid;
  gap: 0.45rem;
}

.bibliography-field span {
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--color-ink-soft);
}

.bibliography-field input,
.bibliography-field select {
  width: 100%;
  padding: 0.85rem 0.95rem;
  border-radius: 18px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.72);
}

.bibliography-filters__buttons {
  display: flex;
  gap: 0.7rem;
}

.bibliography-filters__buttons button,
.bibliography-pagination button,
.bibliography-chip,
.bibliography-collection {
  transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
}

.bibliography-filters__buttons button,
.bibliography-pagination button {
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  font-family: var(--font-sans);
}

.bibliography-filters__buttons button:hover,
.bibliography-pagination button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.bibliography-filters__clear {
  background: rgba(255, 255, 255, 0.7) !important;
  color: var(--color-ink) !important;
}

.bibliography-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.bibliography-chip {
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.68);
  font-family: var(--font-sans);
  font-size: 0.84rem;
}

.bibliography-chip--active {
  background: var(--color-primary);
  color: white;
}

.bibliography-collections {
  display: grid;
  gap: 0.55rem;
}

.bibliography-collection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 18px;
  border: 1px solid var(--color-border-strong);
  background: rgba(255, 255, 255, 0.64);
  text-align: left;
}

.bibliography-collection--active {
  border-color: var(--color-primary);
  background: rgba(57, 89, 120, 0.08);
}

.bibliography-collection span {
  min-width: 0;
}

.bibliography-collection strong {
  font-family: var(--font-sans);
  font-size: 0.82rem;
  color: var(--color-primary);
}

.bibliography-page__sidebar-note,
.bibliography-results__count,
.bibliography-results__context,
.bibliography-results__empty,
.bibliography-results__error {
  margin: 0;
}

.bibliography-results__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.bibliography-results__count {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-primary);
}

.bibliography-results__context {
  margin-top: 0.2rem;
  color: var(--color-ink-soft);
}

.bibliography-results__empty,
.bibliography-results__error {
  color: var(--color-ink-soft);
}

.bibliography-results__error {
  color: var(--color-red);
}

.bibliography-results {
  display: grid;
  gap: 1rem;
}

.bibliography-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.2rem;
  font-family: var(--font-sans);
}

.bibliography-pagination button:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (max-width: 980px) {
  .bibliography-layout {
    grid-template-columns: 1fr;
  }
}
</style>
