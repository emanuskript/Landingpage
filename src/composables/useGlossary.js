import { glossaryTerms } from '../content/glossary/glossary'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const lookup = new Map()

for (const term of glossaryTerms) {
  lookup.set(term.term.toLowerCase(), term)
  for (const alias of term.aliases || []) {
    lookup.set(alias.toLowerCase(), term)
  }
}

const tokens = [...lookup.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp)
const matcher = tokens.length
  ? new RegExp(`(?<![\\p{L}\\p{N}-])(${tokens.join('|')})(?![\\p{L}\\p{N}-])`, 'giu')
  : null

export function findGlossaryTerm(value) {
  if (!value) return null
  return (
    glossaryTerms.find((term) => term.slug === value) ||
    lookup.get(String(value).toLowerCase()) ||
    null
  )
}

export function annotateGlossary(text) {
  if (!text || !matcher) {
    return [{ type: 'text', value: text || '' }]
  }

  const result = []
  let lastIndex = 0

  for (const match of text.matchAll(matcher)) {
    const [value] = match
    const index = match.index ?? 0

    if (index > lastIndex) {
      result.push({ type: 'text', value: text.slice(lastIndex, index) })
    }

    const term = lookup.get(value.toLowerCase())
    if (term) {
      result.push({ type: 'term', value, term })
    } else {
      result.push({ type: 'text', value })
    }

    lastIndex = index + value.length
  }

  if (lastIndex < text.length) {
    result.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return result
}

export function groupGlossaryTermsByLetter(terms = glossaryTerms) {
  return terms.reduce((groups, term) => {
    const letter = term.term.charAt(0).toUpperCase()
    groups[letter] ||= []
    groups[letter].push(term)
    return groups
  }, {})
}
