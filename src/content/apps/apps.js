export const appCollection = {
  eyebrow: 'Applications',
  title: 'Four tools, one scholarly ecosystem',
  lede:
    'Each application is configured from structured content so public launch links and downloads can be published cleanly when they are ready.',
}

export const apps = {
  mergen: {
    id: 'mergen',
    name: 'Mergen',
    tagline: 'Handwritten Text Recognition for manuscript corpora',
    accent: '#4b7252',
    route: '/apps/mergen',
    type: 'web',
    statusLabel: 'Launch page',
    description:
      'Mergen is presented as the project environment for handwritten text recognition. It is positioned in the portal as the entry point for model-driven transcription workflows and large-scale manuscript processing.',
    launch: {
      href: null,
      label: 'Launch Mergen',
      todo: 'Add the public Mergen URL in src/content/apps/apps.js.',
    },
    features: [
      'Custom HTR workflows for manuscript collections',
      'Batch-oriented recognition and review',
      'Research-friendly export pathways',
      'Designed to sit alongside the tutorial system',
    ],
    notes: [
      'Use Mergen after the palaeography and glossary sections to connect script knowledge with transcription practice.',
      'The launch area is configured for a public destination as soon as it is available.',
    ],
  },
  seshat: {
    id: 'seshat',
    name: 'Seshat',
    tagline: 'Comparative manuscript analysis environment',
    accent: '#a06e32',
    route: '/apps/seshat',
    type: 'web',
    statusLabel: 'Launch page',
    description:
      'Seshat is framed in the project files as a comparative analysis platform for manuscript research. Its portal page positions it as a destination for close study, annotation, and cross-manuscript comparison.',
    launch: {
      href: null,
      label: 'Launch Seshat',
      todo: 'Add the public Seshat URL in src/content/apps/apps.js.',
    },
    features: [
      'Comparative viewing and analysis workflows',
      'Support for manuscript-oriented research questions',
      'Designed to complement the script and glossary units',
      'Configured as a launch target when the live environment is available',
    ],
    notes: [
      'The launch area is configured for a public destination as soon as it is available.',
      'The scholarly framing keeps Seshat tied to the tutorial system instead of feeling like a separate product site.',
    ],
  },
  proteus: {
    id: 'proteus',
    name: 'Proteus',
    tagline: 'Desktop multispectral image processing',
    accent: '#395978',
    route: '/apps/proteus',
    type: 'download',
    statusLabel: 'Download-oriented page',
    description:
      'Proteus appears in the MSI materials as a desktop application for advanced image processing. The site therefore treats it as a software product page rather than a live web app.',
    downloadsNote: 'Add public platform builds and release notes in src/content/apps/apps.js when distribution is ready.',
    screenshots: [],
    releaseNotes: null,
    installGuidance:
      'Platform-specific installers, release notes, and setup details can be published here as the public software distribution is finalized.',
    platforms: [
      { label: 'macOS', url: null, todo: 'Add the macOS build URL.' },
      { label: 'Windows', url: null, todo: 'Add the Windows build URL.' },
      { label: 'Linux', url: null, todo: 'Add the Linux build URL.' },
    ],
    features: [
      'Principal component analysis and related MSI processing steps',
      'Bridges directly from the MSI tutorial sequence',
      'Structured platform cards for installers and release notes',
      'Ready for screenshots when the application UI assets are available',
    ],
    notes: [
      'The MSI lesson on Proteus links straight into this page.',
      'Platform-specific download cards are rendered from config so future URLs can be added without touching the layout.',
    ],
  },
  fenius: {
    id: 'fenius',
    name: 'Fenius',
    tagline: 'Classification support for script research',
    accent: '#8f4338',
    route: '/apps/fenius',
    type: 'web',
    statusLabel: 'Launch page',
    description:
      'Fenius is introduced on the landing tree as one of the four core applications. The portal frames it as a research-facing environment for script classification and manuscript analysis support.',
    launch: {
      href: null,
      label: 'Launch Fenius',
      todo: 'Add the public Fenius URL in src/content/apps/apps.js.',
    },
    features: [
      'Script-oriented research support',
      'Designed to sit near the Scripts tutorial pathway',
      'Config-based launch target once the public URL is known',
      'Consistent app page architecture shared with Mergen and Seshat',
    ],
    notes: [
      'The launch area is configured for a public destination as soon as it is available.',
      'The visual language ties Fenius back to the tree artwork instead of treating it as a generic SaaS card.',
    ],
  },
}

export const appOrder = ['mergen', 'seshat', 'proteus', 'fenius']

export const rootlingApps = appOrder.map((appId) => ({
  label: apps[appId].name,
  to: apps[appId].route,
}))
