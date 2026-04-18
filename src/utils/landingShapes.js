export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function clonePoint(point) {
  return { x: point.x, y: point.y }
}

export function boundsFromPoints(points = []) {
  if (!points.length) {
    return { left: 0, top: 0, width: 0, height: 0 }
  }

  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const left = Math.min(...xs)
  const right = Math.max(...xs)
  const top = Math.min(...ys)
  const bottom = Math.max(...ys)

  return {
    left,
    top,
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top),
  }
}

export function rectToPoints(rect, curveMode = 'curved') {
  const left = rect.left
  const top = rect.top
  const right = rect.left + rect.width
  const bottom = rect.top + rect.height
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2

  if (curveMode === 'straight') {
    return [
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
    ]
  }

  return [
    { x: cx, y: top },
    { x: left + rect.width * 0.22, y: top + rect.height * 0.1 },
    { x: left, y: cy },
    { x: left + rect.width * 0.22, y: bottom - rect.height * 0.1 },
    { x: cx, y: bottom },
    { x: right - rect.width * 0.22, y: bottom - rect.height * 0.1 },
    { x: right, y: cy },
    { x: right - rect.width * 0.22, y: top + rect.height * 0.1 },
  ]
}

export function normalizeHotspot(hotspot) {
  const curveMode = hotspot.curveMode ?? (hotspot.kind === 'root' ? 'straight' : 'curved')
  const points = hotspot.points?.length ? hotspot.points.map(clonePoint) : rectToPoints(hotspot.rect, curveMode)
  const rect = hotspot.rect ? { ...hotspot.rect } : boundsFromPoints(points)

  return {
    ...hotspot,
    rect,
    curveMode,
    points,
    labelAnchor: hotspot.labelAnchor ? { ...hotspot.labelAnchor } : undefined,
  }
}

export function syncRectFromPoints(hotspot) {
  hotspot.rect = boundsFromPoints(hotspot.points)
  return hotspot
}

function catmullRomToBezier(points, index) {
  const pointCount = points.length
  const p0 = points[(index - 1 + pointCount) % pointCount]
  const p1 = points[index]
  const p2 = points[(index + 1) % pointCount]
  const p3 = points[(index + 2) % pointCount]

  return {
    cp1x: p1.x + (p2.x - p0.x) / 6,
    cp1y: p1.y + (p2.y - p0.y) / 6,
    cp2x: p2.x - (p3.x - p1.x) / 6,
    cp2y: p2.y - (p3.y - p1.y) / 6,
    x: p2.x,
    y: p2.y,
  }
}

export function shapePathD(hotspot) {
  const points = hotspot.points ?? []
  if (!points.length) return ''

  if (hotspot.curveMode !== 'curved' || points.length < 3) {
    return `M ${points.map((point) => `${point.x} ${point.y}`).join(' L ')} Z`
  }

  const first = points[0]
  const segments = points.map((_, index) => catmullRomToBezier(points, index))
  const commands = segments.map((segment) => `C ${segment.cp1x} ${segment.cp1y}, ${segment.cp2x} ${segment.cp2y}, ${segment.x} ${segment.y}`)

  return `M ${first.x} ${first.y} ${commands.join(' ')} Z`
}

export function sampleShapePoints(hotspot, stepsPerSegment = 10) {
  const points = hotspot.points ?? []
  if (!points.length) return []

  if (hotspot.curveMode !== 'curved' || points.length < 3) {
    return points.map(clonePoint)
  }

  const sampled = []

  points.forEach((_, index) => {
    const segment = catmullRomToBezier(points, index)
    const start = points[index]

    for (let step = 0; step < stepsPerSegment; step += 1) {
      const t = step / stepsPerSegment
      const mt = 1 - t
      sampled.push({
        x:
          mt ** 3 * start.x +
          3 * mt ** 2 * t * segment.cp1x +
          3 * mt * t ** 2 * segment.cp2x +
          t ** 3 * segment.x,
        y:
          mt ** 3 * start.y +
          3 * mt ** 2 * t * segment.cp1y +
          3 * mt * t ** 2 * segment.cp2y +
          t ** 3 * segment.y,
      })
    }
  })

  return sampled
}

export function clipPathPolygon(hotspot) {
  const bounds = hotspot.rect ?? boundsFromPoints(hotspot.points)
  const width = Math.max(bounds.width, 0.001)
  const height = Math.max(bounds.height, 0.001)
  const sampled = sampleShapePoints(hotspot, 12)

  return `polygon(${sampled
    .map((point) => `${(((point.x - bounds.left) / width) * 100).toFixed(3)}% ${(((point.y - bounds.top) / height) * 100).toFixed(3)}%`)
    .join(', ')})`
}
