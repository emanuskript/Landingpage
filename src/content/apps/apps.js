export const appCollection = {
  eyebrow: 'Applications',
  title: 'Four tools, one scholarly ecosystem',
  lede:
    'Explore the four applications that sit alongside the tutorial system, from handwritten text recognition to comparative analysis and multispectral image processing.',
}

export const apps = {
  mergen: {
    id: 'mergen',
    name: 'Mergen',
    tagline: 'Handwritten Text Recognition for manuscript corpora',
    accent: '#4b7252',
    type: 'web',
    statusLabel: 'Launch page',
    description:
      'Mergen is presented as the project environment for handwritten text recognition. It is positioned in the portal as the entry point for model-driven transcription workflows and large-scale manuscript processing.',
    url: null,
    features: [
      'Custom HTR workflows for manuscript collections',
      'Batch-oriented recognition and review',
      'Research-friendly export pathways',
      'Designed to sit alongside the tutorial system',
    ],
    highlights: [
      'Use Mergen after the palaeography and glossary sections to connect script knowledge with transcription practice.',
      'The launch area is ready for a public destination as soon as it is available.',
    ],
  },
  seshat: {
    id: 'seshat',
    name: 'Seshat',
    tagline: 'Comparative manuscript analysis environment',
    accent: '#a06e32',
    type: 'web',
    statusLabel: 'Launch page',
    description:
      'Seshat is framed in the project files as a comparative analysis platform for manuscript research. Its portal page positions it as a destination for close study, annotation, and cross-manuscript comparison.',
    url: null,
    features: [
      'Comparative viewing and analysis workflows',
      'Support for manuscript-oriented research questions',
      'Designed to complement the script and glossary units',
      'Configured as a launch target when the live environment is available',
    ],
    highlights: [
      'The launch area is ready for a public destination as soon as it is available.',
      'The scholarly framing keeps Seshat tied to the tutorial system instead of feeling like a separate product site.',
    ],
  },
  proteus: {
    id: 'proteus',
    name: 'Proteus',
    tagline: 'Desktop multispectral image processing',
    accent: '#395978',
    type: 'download',
    statusLabel: 'Download-oriented page',
    description:
      'Proteus appears in the MSI materials as a desktop application for advanced image processing. The site therefore treats it as a software product page rather than a live web app.',
    downloadUrl: null,
    screenshots: [],
    releaseNotes: null,
    installGuidance:
      'Platform-specific installers, release notes, and setup details can be published here as the public software distribution is finalized.',
    platforms: [
      { label: 'macOS', url: null },
      { label: 'Windows', url: null },
      { label: 'Linux', url: null },
    ],
    features: [
      'Principal component analysis and related MSI processing steps',
      'Bridges directly from the MSI tutorial sequence',
      'Structured platform cards for installers and release notes',
      'Ready for screenshots when the application UI assets are available',
    ],
    highlights: [
      'The MSI lesson on Proteus links straight into this page.',
      'Platform-specific download cards are rendered from config so future URLs can be added without touching the layout.',
    ],
  },
  fenius: {
    id: 'fenius',
    name: 'Fenius',
    tagline: 'Classification support for script research',
    accent: '#8f4338',
    type: 'web',
    statusLabel: 'Launch page',
    description:
      'Fenius is introduced on the landing tree as one of the four core applications. The portal frames it as a research-facing environment for script classification and manuscript analysis support.',
    url: null,
    features: [
      'Script-oriented research support',
      'Designed to sit near the Scripts tutorial pathway',
      'Config-based launch target once the public URL is known',
      'Consistent app page architecture shared with Mergen and Seshat',
    ],
    highlights: [
      'The launch area is ready for a public destination as soon as it is available.',
      'The visual language ties Fenius back to the tree artwork instead of treating it as a generic SaaS card.',
    ],
  },
}

export const appOrder = ['mergen', 'seshat', 'proteus', 'fenius']
