function isLikelyImage(src) {
  return /\.(png|jpe?g|gif|webp|svg|bmp|tiff?|jp2)(\?.*)?$/i.test(src)
}

function createPlaceholderFigure(document, label) {
  const wrapper = document.createElement('div')
  wrapper.className = 'source-placeholder-figure'
  wrapper.innerHTML = `
    <strong>Figure reference</strong>
    <span>${label}</span>
  `
  return wrapper
}

export async function fetchHtmlFragment(sourcePath, selector, routeMap = {}) {
  const response = await fetch(sourcePath)

  if (!response.ok) {
    throw new Error(`Failed to load source fragment from ${sourcePath}`)
  }

  const raw = await response.text()
  const parser = new DOMParser()
  const document = parser.parseFromString(raw, 'text/html')
  const fragment = selector ? document.querySelector(selector) : document.body

  if (!fragment) {
    throw new Error(`Could not find selector "${selector}" in ${sourcePath}`)
  }

  fragment.querySelectorAll('script, style, .site-nav, .site-footer, .pager').forEach((node) => {
    node.remove()
  })

  fragment.querySelectorAll('*').forEach((node) => {
    ;[...node.attributes].forEach((attribute) => {
      if (attribute.name.startsWith('on')) {
        node.removeAttribute(attribute.name)
      }
    })

    if (node.hasAttribute('style')) {
      node.removeAttribute('style')
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

  fragment.querySelectorAll('img').forEach((image) => {
    const src = image.getAttribute('src') || ''
    const alt = image.getAttribute('alt') || src || 'Missing image'
    const isRemote = src.startsWith('http://') || src.startsWith('https://')
    const isRootRelative = src.startsWith('/')

    if ((!isRemote && !isRootRelative) || (isRemote && !isLikelyImage(src))) {
      const placeholder = createPlaceholderFigure(document, alt)
      image.replaceWith(placeholder)
      return
    }

    if (isRemote) {
      image.setAttribute('loading', 'lazy')
      image.setAttribute('referrerpolicy', 'no-referrer')
    }
  })

  fragment.querySelectorAll('img, iframe, video').forEach((node) => {
    node.removeAttribute('width')
    node.removeAttribute('height')
  })

  fragment.querySelectorAll('p, div').forEach((node) => {
    if (node.children.length) return
    if (node.textContent?.trim()) return
    node.remove()
  })

  return fragment.innerHTML
}
