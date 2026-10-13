function normalizeLookupKey(value) {
  return value ? value.normalize('NFC') : value
}

const htmlFragmentCache = new Map()

function createPlaceholderFigure(document, label, href = '') {
  const wrapper = document.createElement('figure')
  wrapper.className = 'source-placeholder-figure'

  const title = document.createElement('strong')
  title.textContent = 'Image preview unavailable in this view'
  wrapper.appendChild(title)

  const description = document.createElement('span')
  description.textContent = label
  wrapper.appendChild(description)

  if (href && isSafeNavigationUrl(href)) {
    const link = document.createElement('a')
    link.href = href
    link.target = '_blank'
    link.rel = 'noreferrer noopener'
    link.textContent = 'View image'
    wrapper.appendChild(link)
  }

  return wrapper
}

function isSafeNavigationUrl(value = '') {
  const trimmedValue = value.trim()
  if (!trimmedValue) return false

  try {
    const url = new URL(trimmedValue, window.location.origin)
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)
  } catch {
    return false
  }
}

function resolveMappedValue(value, map = {}) {
  if (!value) return value
  if (map[value]) return map[value]

  const normalizedValue = normalizeLookupKey(value)
  if (normalizedValue && map[normalizedValue]) return map[normalizedValue]

  const basename = value.split('/').pop()
  if (basename && map[basename]) return map[basename]

  const normalizedBasename = normalizeLookupKey(basename)
  return normalizedBasename && map[normalizedBasename] ? map[normalizedBasename] : value
}

function parseQuotedArgument(source, index) {
  const quote = source[index]
  if (quote !== "'" && quote !== '"') {
    return null
  }

  let value = ''
  let cursor = index + 1

  while (cursor < source.length) {
    const char = source[cursor]

    if (char === '\\') {
      const escaped = source[cursor + 1]
      if (escaped) {
        value += escaped
        cursor += 2
        continue
      }
    }

    if (char === quote) {
      return { value, nextIndex: cursor + 1 }
    }

    value += char
    cursor += 1
  }

  return null
}

function parseCheckAnswerCall(expression) {
  if (!expression?.startsWith('checkAnswer(') || !expression.endsWith(')')) {
    return null
  }

  let cursor = 'checkAnswer('.length
  const values = []

  while (cursor < expression.length - 1 && values.length < 3) {
    while (/\s/.test(expression[cursor])) cursor += 1

    const parsed = parseQuotedArgument(expression, cursor)
    if (!parsed) return null

    values.push(parsed.value)
    cursor = parsed.nextIndex

    while (/\s/.test(expression[cursor])) cursor += 1

    if (values.length < 3) {
      if (expression[cursor] !== ',') return null
      cursor += 1
    }
  }

  return values.length === 3 && /^[A-Za-z][A-Za-z0-9_-]*$/.test(values[0])
    ? {
        questionId: values[0],
        correctAnswer: values[1],
        message: values[2],
      }
    : null
}

function sanitizeImageInlineStyle(styleText = '') {
  const allowedProperties = new Set([
    'width',
    'max-width',
    'min-width',
    'height',
    'max-height',
    'min-height',
    'margin',
    'margin-inline',
    'margin-inline-start',
    'margin-inline-end',
    'display',
    'object-fit',
    'object-position',
  ])

  const blockedValuePattern = /(url\(|expression\(|javascript:)/i
  const sanitizedDeclarations = []

  styleText
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .forEach((declaration) => {
      const separatorIndex = declaration.indexOf(':')
      if (separatorIndex <= 0) return

      const property = declaration.slice(0, separatorIndex).trim().toLowerCase()
      const value = declaration.slice(separatorIndex + 1).trim()

      if (!allowedProperties.has(property)) return
      if (!value || blockedValuePattern.test(value)) return

      sanitizedDeclarations.push(`${property}: ${value}`)
    })

  return sanitizedDeclarations.join('; ')
}

function isBlankText(value = '') {
  return !value.replace(/\u00a0/g, ' ').trim()
}

function resolveRelativeUrl(value, sourcePath) {
  if (!value) return value
  if (/^(?:[a-z]+:|#|\/)/i.test(value)) return value

  try {
    const baseUrl = new URL(sourcePath, window.location.origin)
    const resolved = new URL(value, baseUrl)
    return resolved.origin === window.location.origin
      ? `${resolved.pathname}${resolved.search}${resolved.hash}`
      : resolved.toString()
  } catch {
    return value
  }
}

function stripTrackingParams(value) {
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    return value
  }

  try {
    const url = new URL(value)
    url.searchParams.delete('utm_source')
    return url.toString()
  } catch {
    return value
  }
}

function isDocxHeading(node) {
  if (!node || node.tagName !== 'P') return false
  if (node.querySelector('img, table, ul, ol, figure, a, em, sub, sup')) return false

  const text = (node.textContent || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
  if (!text || text.length > 90) return false
  if (/[.!?]$/.test(text) && !text.endsWith(':')) return false

  const elementChildren = [...node.children]
  const strongOnly =
    elementChildren.length > 0 &&
    elementChildren.every((child) => ['STRONG', 'B', 'BR'].includes(child.tagName))

  if (text === text.toUpperCase()) return true
  if (strongOnly) return true

  return text.split(/\s+/).length <= 8
}

function headingTagForDocx(text = '') {
  return /^(?:\d+[\.\)]?|Add|sub|Mul|Div|Max|Min|Mod|Atan2|Power|Invert|Rotate|Denoise|PCA(?: - SVD)?|ROI|Readstack)/.test(
    text,
  )
    ? 'h3'
    : 'h2'
}

function normalizeText(value = '') {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

function injectLeadingParagraph(fragment, document, leadingParagraph = '') {
  const normalizedLeadingParagraph = normalizeText(leadingParagraph)
  if (!normalizedLeadingParagraph) return

  const firstMeaningfulChild = [...fragment.children].find((node) => normalizeText(node.textContent || ''))

  if (firstMeaningfulChild && normalizeText(firstMeaningfulChild.textContent || '') === normalizedLeadingParagraph) {
    return
  }

  const paragraph = document.createElement('p')
  paragraph.textContent = leadingParagraph
  fragment.insertBefore(paragraph, fragment.firstElementChild)
}

function normalizeDocxMsiFragment(fragment, document, transformOptions = {}) {
  fragment.classList?.add('source-fragment--msi-docx')

  const firstParagraph = [...fragment.children].find(
    (node) => node.tagName === 'P' && !isBlankText(node.textContent || ''),
  )

  if (firstParagraph && /^(?:MSI Tutorial|Lesson \d+:)/i.test(firstParagraph.textContent.trim())) {
    firstParagraph.remove()
  }

  injectLeadingParagraph(fragment, document, transformOptions.leadingParagraph)

  let cursor = fragment.firstElementChild
  while (cursor) {
    const text = (cursor.textContent || '').replace(/\u00a0/g, ' ').trim()

    if (cursor.tagName === 'P' && /^•/.test(text)) {
      const list = document.createElement('ul')
      fragment.insertBefore(list, cursor)

      let bulletNode = cursor
      while (
        bulletNode &&
        bulletNode.tagName === 'P' &&
        /^•/.test((bulletNode.textContent || '').replace(/\u00a0/g, ' ').trim())
      ) {
        const listItem = document.createElement('li')
        listItem.innerHTML = bulletNode.innerHTML.replace(/^\s*•\s*/, '')
        list.appendChild(listItem)
        const nextBullet = bulletNode.nextElementSibling
        bulletNode.remove()
        bulletNode = nextBullet
      }

      // Continue from the first non-bullet sibling after the removed bullet block.
      cursor = bulletNode
      continue
    }

    cursor = cursor.nextElementSibling
  }

  fragment.querySelectorAll('p').forEach((node) => {
    if (!isDocxHeading(node)) return

    const text = (node.textContent || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
    const heading = document.createElement(headingTagForDocx(text))
    heading.innerHTML = node.innerHTML
    node.replaceWith(heading)
  })
}

export async function fetchHtmlFragment(
  sourcePath,
  selector,
  routeMap = {},
  assetMap = {},
  transform = 'default',
  transformOptions = {},
) {
  const cacheKey = JSON.stringify([sourcePath, selector, routeMap, assetMap, transform, transformOptions])
  const cached = htmlFragmentCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const fragmentPromise = (async () => {
    const response = await fetch(sourcePath)

    if (!response.ok) {
      throw new Error('Unable to load tutorial content.')
    }

    const raw = await response.text()
    const parser = new DOMParser()
    const document = parser.parseFromString(raw, 'text/html')
    const fragment = selector ? document.querySelector(selector) : document.body

    if (!fragment) {
      throw new Error('Unable to render this tutorial section.')
    }

    fragment
      .querySelectorAll('script, style, link, meta, base, object, embed, iframe, .site-nav, .site-footer, .pager')
      .forEach((node) => {
      node.remove()
      })

    fragment.querySelectorAll('.quiz-btn[onclick]').forEach((button) => {
      const parsed = parseCheckAnswerCall(button.getAttribute('onclick') || '')
      if (!parsed) return

      button.setAttribute('data-question-id', parsed.questionId)
      button.setAttribute('data-correct-answer', parsed.correctAnswer)
      button.setAttribute('data-feedback-message', parsed.message)
    })

    fragment.querySelectorAll('*').forEach((node) => {
      ;[...node.attributes].forEach((attribute) => {
        if (
          attribute.name.startsWith('on') ||
          ['srcdoc', 'formaction', 'action'].includes(attribute.name)
        ) {
          node.removeAttribute(attribute.name)
        }
      })

      if (node.hasAttribute('style')) {
        if (node.tagName === 'IMG') {
          const sanitizedStyle = sanitizeImageInlineStyle(node.getAttribute('style') || '')

          if (sanitizedStyle) {
            node.setAttribute('style', sanitizedStyle)
          } else {
            node.removeAttribute('style')
          }
        } else {
          node.removeAttribute('style')
        }
      }
    })

    fragment.querySelectorAll('a[href]').forEach((anchor) => {
      const originalHref = anchor.getAttribute('href')
      if (!originalHref) return

      const href = resolveRelativeUrl(originalHref, sourcePath)
      if (!href) return

      if (routeMap[href]) {
        anchor.setAttribute('href', routeMap[href])
        return
      }

      const hrefFile = href.split('/').pop()
      if (hrefFile && routeMap[hrefFile]) {
        anchor.setAttribute('href', routeMap[hrefFile])
        return
      }

      const cleanedHref = stripTrackingParams(href)

      if (!isSafeNavigationUrl(cleanedHref)) {
        anchor.removeAttribute('href')
        anchor.removeAttribute('target')
        anchor.removeAttribute('rel')
        return
      }

      anchor.setAttribute('href', cleanedHref)

      if (cleanedHref.startsWith('http://') || cleanedHref.startsWith('https://')) {
        anchor.setAttribute('target', '_blank')
        anchor.setAttribute('rel', 'noreferrer noopener')
      }
    })

    fragment.querySelectorAll('a[src]:not([href])').forEach((anchor) => {
      const originalSrc = anchor.getAttribute('src')
      const src = resolveRelativeUrl(originalSrc, sourcePath)
      if (!src || !isSafeNavigationUrl(src)) {
        anchor.removeAttribute('src')
        return
      }

      anchor.setAttribute('href', src)
      anchor.removeAttribute('src')
      if (src.startsWith('http://') || src.startsWith('https://')) {
        anchor.setAttribute('target', '_blank')
        anchor.setAttribute('rel', 'noreferrer noopener')
      }
    })

    fragment.querySelectorAll('img').forEach((image, index) => {
      const originalSrc = image.getAttribute('src') || ''
      const mappedSrc = resolveMappedValue(originalSrc, assetMap)
      const src = resolveRelativeUrl(mappedSrc, sourcePath)
      const alt = image.getAttribute('alt') || src || 'Illustration'
      const isRemote = src.startsWith('http://') || src.startsWith('https://')
      const isRootRelative = src.startsWith('/')
      const sourceHref =
        image
          .closest('.illustration-block')
          ?.querySelector('.illustration-caption a')
          ?.getAttribute('href') ?? ''
      const shouldPrioritize = transform === 'msi-docx' ? index < 2 : index === 0

      if (src && src !== originalSrc) {
        image.setAttribute('src', src)
      }

      if (!isRemote && !isRootRelative) {
        const placeholder = createPlaceholderFigure(document, alt, sourceHref)
        image.replaceWith(placeholder)
        return
      }

      image.setAttribute('loading', transform === 'msi-docx' ? 'eager' : shouldPrioritize ? 'eager' : 'lazy')
      image.setAttribute('decoding', 'async')
      image.setAttribute('fetchpriority', shouldPrioritize ? 'high' : 'auto')

      if (isRemote) {
        image.setAttribute('referrerpolicy', 'no-referrer')
      }
    })

    if (transform === 'msi-docx') {
      normalizeDocxMsiFragment(fragment, document, transformOptions)
    }

    fragment.querySelectorAll('video').forEach((node) => {
      node.removeAttribute('width')
      node.removeAttribute('height')
    })

    fragment.querySelectorAll('table').forEach((table) => {
      if (table.parentElement?.classList.contains('source-table-wrap')) return

      const wrapper = document.createElement('div')
      wrapper.className = 'source-table-wrap'
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })

    fragment.querySelectorAll('p, div').forEach((node) => {
      if (node.classList?.contains('quiz-feedback') || node.classList?.contains('unit-quiz-score')) {
        return
      }

      if (node.children.length) return
      if (!isBlankText(node.textContent || '')) return
      node.remove()
    })

    return fragment.innerHTML
  })()

  htmlFragmentCache.set(cacheKey, fragmentPromise)

  try {
    return await fragmentPromise
  } catch (error) {
    htmlFragmentCache.delete(cacheKey)
    throw error
  }
}
