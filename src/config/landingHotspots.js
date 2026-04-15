import { routePaths } from './siteLinks'

const appSparklePattern = [
  { x: 28, y: 14, size: 1.3, delay: '-0.6s', duration: '4.2s', rotate: 12, driftX: 1.5, driftY: -1.2 },
  { x: 76, y: 32, size: 1.0, delay: '-2.1s', duration: '5.0s', rotate: -18, driftX: -1.2, driftY: 1.0 },
  { x: 42, y: 52, size: 0.8, delay: '-3.5s', duration: '4.6s', rotate: 22, driftX: 0.8, driftY: -0.6 },
]

const tutorialSparklePattern = [
  { x: 58, y: 18, size: 1.1, delay: '-1.4s', duration: '6.8s', rotate: 5, driftX: 1.2, driftY: -1.0 },
  { x: 30, y: 60, size: 0.8, delay: '-4.8s', duration: '7.4s', rotate: -10, driftX: -0.9, driftY: 0.8 },
]

function staggerPattern(pattern, offsetSec) {
  return pattern.map((g) => ({
    ...g,
    delay: `${parseFloat(g.delay) - offsetSec}s`,
  }))
}

const sparkleConfig = {
  fenius: {
    tone: 'gold',
    glints: staggerPattern(appSparklePattern, 0),
  },
  seshat: {
    tone: 'gold',
    glints: staggerPattern(appSparklePattern, 1.1),
  },
  mergen: {
    tone: 'gold',
    glints: staggerPattern(appSparklePattern, 2.3),
  },
  proteus: {
    tone: 'gold',
    glints: staggerPattern(appSparklePattern, 3.4),
  },
  scripts: {
    tone: 'silver',
    glints: staggerPattern(tutorialSparklePattern, 0),
  },
  codicology: {
    tone: 'silver',
    glints: staggerPattern(tutorialSparklePattern, 1.8),
  },
  'digital-palaeography': {
    tone: 'silver',
    glints: staggerPattern(tutorialSparklePattern, 3.5),
  },
  msi: {
    tone: 'silver',
    glints: staggerPattern(tutorialSparklePattern, 5.2),
  },
  'about-project': {
    tone: 'bronze',
    glints: [
      { x: 30, y: 30, size: 0.6, delay: '-4.3s', duration: '12.6s', rotate: 7, driftX: 0.5, driftY: -0.4 },
      { x: 68, y: 52, size: 0.42, delay: '-9.4s', duration: '13.8s', rotate: -10, driftX: -0.3, driftY: 0.3 },
    ],
  },
  team: {
    tone: 'bronze',
    glints: [
      { x: 28, y: 34, size: 0.58, delay: '-4.8s', duration: '13.2s', rotate: -4, driftX: 0.4, driftY: -0.3 },
      { x: 73, y: 55, size: 0.4, delay: '-9.8s', duration: '14.4s', rotate: 9, driftX: -0.3, driftY: 0.3 },
    ],
  },
  'site-map': {
    tone: 'bronze',
    glints: [
      { x: 42, y: 28, size: 0.56, delay: '-4.1s', duration: '12.9s', rotate: 3, driftX: 0.4, driftY: -0.3 },
      { x: 72, y: 50, size: 0.38, delay: '-9.5s', duration: '14.1s', rotate: -7, driftX: -0.2, driftY: 0.2 },
    ],
  },
  bibliography: {
    tone: 'bronze',
    glints: [
      { x: 34, y: 31, size: 0.6, delay: '-4.5s', duration: '12.7s', rotate: 5, driftX: 0.4, driftY: -0.3 },
      { x: 70, y: 53, size: 0.42, delay: '-9.1s', duration: '13.9s', rotate: -8, driftX: -0.3, driftY: 0.3 },
    ],
  },
}

export const landingArtwork = {
  src: '/images/tree/tree-portrait-soft.png',
  alt: 'Illustrated eManuSkript tree with apples for applications, oak galls for tutorials, and roots for informational pages.',
  ratio: {
    width: 1279,
    height: 1809,
  },
}

export const landingCopy = {
  eyebrow: 'eManuSkript',
  title: 'eManuSkript: A Digital Toolkit for Teaching and Learning Medieval Manuscripts',
}

export const landingHotspots = [
  {
    id: 'fenius',
    kind: 'app',
    kindLabel: 'Application',
    title: 'Fenius',
    description: 'A three-part app for understanding and documenting bookbindings.',
    to: routePaths.appPages.fenius,
    accent: '#8b4938',
    sparkle: sparkleConfig.fenius,
    rect: { left: 7.7, top: 33.6, width: 23.0, height: 15.1 },
  },
  {
    id: 'seshat',
    kind: 'app',
    kindLabel: 'Application',
    title: 'Seshat',
    description: 'A multifaceted tool for analysing scripts.',
    to: routePaths.appPages.seshat,
    accent: '#9d6a34',
    sparkle: sparkleConfig.seshat,
    rect: { left: 20.2, top: 53.3, width: 23.3, height: 15.7 },
  },
  {
    id: 'mergen',
    kind: 'app',
    kindLabel: 'Application',
    title: 'Mergen',
    description: 'A segmentation model for page layouts.',
    to: routePaths.appPages.mergen,
    accent: '#4f6d4d',
    sparkle: sparkleConfig.mergen,
    rect: { left: 62.2, top: 26.9, width: 22.4, height: 15.8 },
  },
  {
    id: 'proteus',
    kind: 'app',
    kindLabel: 'Application',
    title: 'Proteus',
    description: 'An easy-to-use interface for enhancing digital images.',
    to: routePaths.appPages.proteus,
    accent: '#456277',
    sparkle: sparkleConfig.proteus,
    rect: { left: 70.3, top: 48.6, width: 21.6, height: 15.1 },
  },
  {
    id: 'scripts',
    kind: 'tutorial',
    kindLabel: 'Tutorial',
    title: 'The History of Medieval Scripts',
    to: routePaths.tutorialPages.scripts,
    accent: '#80653d',
    sparkle: sparkleConfig.scripts,
    rect: { left: 40.8, top: 23.1, width: 11.0, height: 7.9 },
  },
  {
    id: 'codicology',
    kind: 'tutorial',
    kindLabel: 'Tutorial',
    title: 'The Creation of a Medieval Codex',
    to: routePaths.tutorialPages.codicology,
    accent: '#715331',
    sparkle: sparkleConfig.codicology,
    rect: { left: 33.9, top: 37.4, width: 11.9, height: 8.1 },
  },
  {
    id: 'digital-palaeography',
    kind: 'tutorial',
    kindLabel: 'Tutorial',
    title: 'Digital Palaeography',
    to: routePaths.tutorialPages.digitalPalaeography,
    accent: '#705b37',
    sparkle: sparkleConfig['digital-palaeography'],
    rect: { left: 84.7, top: 33.6, width: 12.4, height: 8.2 },
  },
  {
    id: 'msi',
    kind: 'tutorial',
    kindLabel: 'Tutorial',
    title: 'MSI for Medieval Manuscripts',
    to: routePaths.tutorialPages.msi,
    accent: '#675338',
    sparkle: sparkleConfig.msi,
    rect: { left: 58.4, top: 48.9, width: 12.4, height: 8.0 },
  },

  // Root navigation hotspots
  {
    id: 'about-project',
    kind: 'root',
    kindLabel: 'Project Page',
    title: 'About the Project',
    to: routePaths.aboutProject,
    accent: '#6f5533',
    sparkle: sparkleConfig['about-project'],
    rect: { left: 19.5, top: 75.8, width: 27.8, height: 5.2 },
    labelAnchor: { x: 33.2, y: 78.3 },
  },
  {
    id: 'team',
    kind: 'root',
    kindLabel: 'Project Page',
    title: 'About the Team',
    to: routePaths.team,
    accent: '#654b2e',
    sparkle: sparkleConfig.team,
    rect: { left: 62.0, top: 76.4, width: 24.1, height: 4.7 },
    labelAnchor: { x: 74.1, y: 78.7 },
  },
  {
    id: 'site-map',
    kind: 'root',
    kindLabel: 'Project Page',
    title: 'Site Map',
    to: routePaths.siteMap,
    accent: '#6a5437',
    sparkle: sparkleConfig['site-map'],
    rect: { left: 16.9, top: 89.4, width: 16.8, height: 5.5 },
    labelAnchor: { x: 25.5, y: 92.1 },
  },
  {
    id: 'bibliography',
    kind: 'root',
    kindLabel: 'Project Page',
    title: 'Bibliography',
    to: routePaths.bibliography,
    accent: '#715738',
    sparkle: sparkleConfig.bibliography,
    rect: { left: 78.2, top: 87.9, width: 21.8, height: 6.5 },
    labelAnchor: { x: 89.2, y: 91.1 },
  },
]
