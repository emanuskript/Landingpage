import { computed, ref, watch } from 'vue'

function itemTypeLabel(value = '') {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, (character) => character.toUpperCase())
}

function creatorName(creator) {
  if (creator.name) return creator.name
  return [creator.firstName, creator.lastName].filter(Boolean).join(' ').trim()
}

function formatCreators(creators = []) {
  const preferred = creators.filter((creator) => ['author', 'editor', 'inventor', 'artist'].includes(creator.creatorType))
  const list = (preferred.length ? preferred : creators).map(creatorName).filter(Boolean)

  if (!list.length) return 'Unknown creator'
  if (list.length === 1) return list[0]
  if (list.length === 2) return `${list[0]} and ${list[1]}`
  return `${list[0]} et al.`
}

function extractYear(item) {
  const parsed = item.meta?.parsedDate || item.data?.date || ''
  const match = parsed.match(/\d{4}/)
  return match ? match[0] : 'n.d.'
}

function stripMarkup(value = '') {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function buildPublicationLine(data) {
  const segments = [
    data.publicationTitle,
    data.proceedingsTitle,
    data.bookTitle,
    data.conferenceName,
    data.publisher,
    data.place,
  ]
    .filter(Boolean)
    .slice(0, 3)

  return segments.join(' · ')
}

function normalizeItem(item) {
  const abstract = stripMarkup(item.data.abstractNote || '')
  const zoteroUrl = item.links?.alternate?.href || ''
  const sourceUrl = item.data.url || ''

  return {
    key: item.key,
    title: item.data.title || 'Untitled record',
    creators: formatCreators(item.data.creators),
    year: extractYear(item),
    itemType: item.data.itemType,
    itemTypeLabel: itemTypeLabel(item.data.itemType),
    publicationLine: buildPublicationLine(item.data),
    abstract: abstract.length > 280 ? `${abstract.slice(0, 277)}...` : abstract,
    tags: (item.data.tags || []).map((tag) => tag.tag).filter(Boolean).slice(0, 5),
    zoteroUrl,
    sourceUrl,
    doi: item.data.DOI || '',
  }
}

function normalizeCollection(collection) {
  return {
    key: collection.key,
    name: collection.data.name,
    numItems: collection.meta?.numItems || 0,
    href: collection.links?.alternate?.href || '',
  }
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`Failed to load bibliography data (${response.status})`)
  }
  return response
}

export function useZoteroBibliography(source, params) {
  const collections = ref([])
  const items = ref([])
  const totalResults = ref(0)
  const loading = ref(false)
  const loadingCollections = ref(false)
  const error = ref('')
  let controller = null

  const totalPages = computed(() => {
    const limit = Number(params.value.limit) || 1
    return Math.max(1, Math.ceil(totalResults.value / limit))
  })

  async function loadCollections() {
    if (!source.apiBaseUrl) return

    loadingCollections.value = true

    try {
      const url = new URL(`${source.apiBaseUrl}/collections/top`)
      url.searchParams.set('format', 'json')
      url.searchParams.set('limit', '100')

      const response = await fetchJson(url.toString())
      const data = await response.json()
      collections.value = data.map(normalizeCollection).sort((left, right) => right.numItems - left.numItems)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Could not load bibliography collections.'
    } finally {
      loadingCollections.value = false
    }
  }

  async function loadItems() {
    if (!source.apiBaseUrl) return

    if (controller) {
      controller.abort()
    }

    controller = new AbortController()
    loading.value = true
    error.value = ''

    try {
      const url = new URL(`${source.apiBaseUrl}/items/top`)
      url.searchParams.set('format', 'json')
      url.searchParams.set('limit', String(params.value.limit || 12))
      url.searchParams.set('start', String(params.value.start || 0))
      url.searchParams.set('sort', params.value.sort || 'date')
      url.searchParams.set('direction', params.value.direction || 'desc')

      if (params.value.q) {
        url.searchParams.set('q', params.value.q)
        url.searchParams.set('qmode', 'titleCreatorYear')
      }

      if (params.value.collection) {
        url.searchParams.set('collection', params.value.collection)
      }

      if (params.value.itemType) {
        url.searchParams.set('itemType', params.value.itemType)
      }

      const response = await fetchJson(url.toString(), { signal: controller.signal })
      totalResults.value = Number(response.headers.get('Total-Results') || '0')

      const data = await response.json()
      items.value = data.map(normalizeItem)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      error.value = err instanceof Error ? err.message : 'Could not load bibliography entries.'
    } finally {
      loading.value = false
    }
  }

  watch(
    () => source.apiBaseUrl,
    () => {
      loadCollections()
    },
    { immediate: true },
  )

  watch(params, loadItems, { immediate: true, deep: true })

  return {
    collections,
    error,
    items,
    loading,
    loadingCollections,
    totalPages,
    totalResults,
  }
}
