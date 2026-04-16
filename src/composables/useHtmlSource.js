function normalizeLookupKey(value) {
  return value ? value.normalize('NFC') : value
}

function createPlaceholderFigure(document, label, href = '') {
  const wrapper = document.createElement('figure')
  wrapper.className = 'source-placeholder-figure'
  wrapper.innerHTML = `
    <strong>Image preview unavailable in this view</strong>
    <span>${label}</span>
    ${href ? `<a href="${href}" target="_blank" rel="noreferrer noopener">View image</a>` : ''}
  `
  return wrapper
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

  return values.length === 3
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

export async function fetchHtmlFragment(sourcePath, selector, routeMap = {}, assetMap = {}) {
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

  fragment.querySelectorAll('script, style, .site-nav, .site-footer, .pager').forEach((node) => {
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
      if (attribute.name.startsWith('on')) {
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
    const href = anchor.getAttribute('href')
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

    if (href.startsWith('http://') || href.startsWith('https://')) {
      anchor.setAttribute('target', '_blank')
      anchor.setAttribute('rel', 'noreferrer noopener')
    }
  })

  fragment.querySelectorAll('a[src]:not([href])').forEach((anchor) => {
    const src = anchor.getAttribute('src')
    if (!src) return
    anchor.setAttribute('href', src)
    anchor.removeAttribute('src')
    if (src.startsWith('http://') || src.startsWith('https://')) {
      anchor.setAttribute('target', '_blank')
      anchor.setAttribute('rel', 'noreferrer noopener')
    }
  })

  fragment.querySelectorAll('img').forEach((image) => {
    const originalSrc = image.getAttribute('src') || ''
    const src = resolveMappedValue(originalSrc, assetMap)
    const alt = image.getAttribute('alt') || src || 'Illustration'
    const isRemote = src.startsWith('http://') || src.startsWith('https://')
    const isRootRelative = src.startsWith('/')
    const sourceHref =
      image
        .closest('.illustration-block')
        ?.querySelector('.illustration-caption a')
        ?.getAttribute('href') ?? ''

    if (src && src !== originalSrc) {
      image.setAttribute('src', src)
    }

    if (!isRemote && !isRootRelative) {
      const placeholder = createPlaceholderFigure(document, alt, sourceHref)
      image.replaceWith(placeholder)
      return
    }

    image.setAttribute('loading', 'lazy')
    image.setAttribute('decoding', 'async')
    image.setAttribute('fetchpriority', 'low')

    if (isRemote) {
      image.setAttribute('referrerpolicy', 'no-referrer')
    }
  })

  fragment.querySelectorAll('img, iframe, video').forEach((node) => {
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
    if (node.textContent?.trim()) return
    node.remove()
  })

  return fragment.innerHTML
}
