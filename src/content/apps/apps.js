import { appExternalLinks } from '../../config/externalLinks'
import { routePaths } from '../../config/siteLinks'

export const appCollection = {
  eyebrow: 'Applications',
  title: 'Four tools, one manuscript-focused toolkit',
  lede:
    'Each application page introduces a focused manuscript tool and highlights how it supports study, analysis, and teaching workflows.',
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
      'Fenius is a research-facing environment for studying the physical structure of manuscripts, with emphasis on bookbinding observation and documentation.',
    features: [
      'Connects directly to codicology-oriented study',
      'Designed for understanding, describing, and comparing bindings',
      'Supports structured recording of binding components for consistent analysis',
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
      'Helps isolate text blocks, decorations, and marginal elements for downstream workflows',
    ],
    resources: {
      to: {
        path: routePaths.aboutProject,
        hash: '#ai-safety-resources',
      },
      label: 'Resources about AI Safety and Best Practices',
    },
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
      'Improves visual legibility through contrast and channel-based image adjustments',
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
      'Seshat is a multifaceted environment for script analysis, comparison, and other close palaeographic work.',
    features: [
      'Supports detailed script-focused investigation',
      'Complements the site’s historical and digital manuscript routes',
      'Enables comparative examination of letterforms across hands and manuscript witnesses',
    ],
    resources: {
      to: {
        path: routePaths.aboutProject,
        hash: '#ai-safety-resources',
      },
      label: 'Resources about AI Safety and Best Practices',
    },
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
        howToUse:
          appId === 'proteus'
            ? {
                to: `${routePaths.tutorialPages.msi}/proteus`,
                label: 'How to use',
              }
            : null,
        github: {
          href: external.githubUrl,
          label: `${app.name} on GitHub`,
        },
      },
    ]
  }),
)
