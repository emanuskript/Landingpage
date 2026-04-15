import { appExternalLinks } from '../../config/externalLinks'
import { routePaths } from '../../config/siteLinks'

export const appCollection = {
  eyebrow: 'Applications',
  title: 'Four tools, one manuscript-focused toolkit',
  lede:
    'Each application page is configured from shared route and link data so public launch URLs can be published later without reworking the interface.',
}

const appDefinitions = {
  fenius: {
    id: 'fenius',
    name: 'Fenius',
    accent: '#8b4938',
    route: routePaths.appPages.fenius,
    statusLabel: 'Configured app page',
    tagline: 'A three-part app for understanding and documenting bookbindings.',
    description:
      'Fenius is positioned as a research-facing environment for studying the physical structure of manuscripts, with emphasis on bookbinding observation and documentation.',
    features: [
      'Connects directly to codicology-oriented study',
      'Designed for understanding, describing, and comparing bindings',
      'Ready for a public launch URL when the live environment is available',
    ],
    notes: [
      'Its access link remains centralized so the public URL can be added later without touching the page layout.',
      'The GitHub repository is already wired in as a stable reference point.',
    ],
  },
  mergen: {
    id: 'mergen',
    name: 'Mergen',
    accent: '#4f6d4d',
    route: routePaths.appPages.mergen,
    statusLabel: 'Configured app page',
    tagline: 'A segmentation model for page layouts.',
    description:
      'Mergen focuses on page-layout segmentation for manuscript images and prepares complex pages for more structured analysis downstream.',
    features: [
      'Page-region segmentation for manuscript material',
      'Useful where layout structure matters before deeper processing',
      'Configured for a future public launch destination',
    ],
    notes: [
      'The internal page keeps the project framing scholarly and concise until the public tool URL is finalized.',
      'Its GitHub link is already centralized with the other application references.',
    ],
  },
  proteus: {
    id: 'proteus',
    name: 'Proteus',
    accent: '#456277',
    route: routePaths.appPages.proteus,
    statusLabel: 'Configured app page',
    tagline: 'An easy-to-use interface for enhancing digital images.',
    description:
      'Proteus sits alongside the imaging material as an approachable interface for enhancing, comparing, and interpreting manuscript images.',
    features: [
      'Closely aligned with multispectral imaging teaching material',
      'Suited to enhancement and inspection workflows',
      'Prepared for a future README-based public access link',
    ],
    notes: [
      'The eventual public link should point to the README in the Proteus repository.',
      'Keeping that link in shared config makes the swap straightforward later.',
    ],
  },
  seshat: {
    id: 'seshat',
    name: 'Seshat',
    accent: '#9d6a34',
    route: routePaths.appPages.seshat,
    statusLabel: 'Configured app page',
    tagline: 'A multifaceted tool for analysing scripts.',
    description:
      'Seshat is framed as a multifaceted environment for script analysis, comparison, and other close palaeographic work.',
    features: [
      'Supports detailed script-focused investigation',
      'Complements the site’s historical and digital manuscript routes',
      'Ready for a public launch link when the deployed tool is available',
    ],
    notes: [
      'The access link stays configurable so publication timing does not force a layout change.',
      'Its repository link provides a stable project reference in the meantime.',
    ],
  },
}

export const appOrder = ['fenius', 'mergen', 'proteus', 'seshat']

export const apps = Object.fromEntries(
  appOrder.map((appId) => {
    const app = appDefinitions[appId]
    const external = appExternalLinks[appId]

    return [
      appId,
      {
        ...app,
        access: {
          href: external.launchUrl,
          label: external.launchLabel,
          todo: external.launchTodo,
        },
        github: {
          href: external.githubUrl,
          label: `${app.name} on GitHub`,
        },
      },
    ]
  }),
)
