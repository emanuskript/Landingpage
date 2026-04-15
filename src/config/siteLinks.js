export const routePaths = {
  landing: '/',
  apps: '/apps',
  tutorialsIndex: '/tutorials',
  bibliography: '/bibliography',
  aboutProject: '/about-project',
  team: '/team',
  siteMap: '/site-map',
  appPages: {
    fenius: '/apps/fenius',
    mergen: '/apps/mergen',
    proteus: '/apps/proteus',
    seshat: '/apps/seshat',
  },
  tutorialPages: {
    codicology: '/tutorials/codicology',
    msi: '/tutorials/msi',
    scripts: '/tutorials/scripts',
    digitalPalaeography: '/tutorials/digital-palaeography',
  },
}

export const appPageLinks = [
  {
    id: 'fenius',
    label: 'Fenius',
    to: routePaths.appPages.fenius,
    description: 'A three-part app for understanding and documenting bookbindings.',
  },
  {
    id: 'mergen',
    label: 'Mergen',
    to: routePaths.appPages.mergen,
    description: 'A segmentation model for page layouts.',
  },
  {
    id: 'proteus',
    label: 'Proteus',
    to: routePaths.appPages.proteus,
    description: 'An easy-to-use interface for enhancing digital images.',
  },
  {
    id: 'seshat',
    label: 'Seshat',
    to: routePaths.appPages.seshat,
    description: 'A multifaceted tool for analysing scripts.',
  },
]

export const tutorialPageLinks = [
  {
    id: 'scripts',
    label: 'The History of Medieval Scripts',
    shortLabel: 'Scripts',
    to: routePaths.tutorialPages.scripts,
    description: 'A historical route through scripts and their development.',
  },
  {
    id: 'codicology',
    label: 'The Creation of a Medieval Codex',
    shortLabel: 'Codicology',
    to: routePaths.tutorialPages.codicology,
    description: 'An illustrated codicology and bookmaking tutorial.',
  },
  {
    id: 'digital-palaeography',
    label: 'Digital Palaeography',
    shortLabel: 'Digital Palaeography',
    to: routePaths.tutorialPages.digitalPalaeography,
    description: 'A conceptual guide to digital manuscript methods.',
  },
  {
    id: 'msi',
    label: 'Multispectral Imaging for Medieval Manuscripts',
    shortLabel: 'MSI',
    to: routePaths.tutorialPages.msi,
    description: 'A guided route into multispectral imaging workflows.',
  },
]

export const infoPageLinks = [
  {
    id: 'about-project',
    label: 'About the Project',
    to: routePaths.aboutProject,
    description: 'Project framing, acknowledgements, and future public links.',
  },
  {
    id: 'team',
    label: 'About the Team',
    shortLabel: 'Team',
    to: routePaths.team,
    description: 'The people shaping the project and its scholarly work.',
  },
  {
    id: 'site-map',
    label: 'Site Map',
    to: routePaths.siteMap,
    description: 'A simple index of the internal site structure.',
  },
  {
    id: 'bibliography',
    label: 'Bibliography',
    to: routePaths.bibliography,
    description: 'Search and browse the shared project bibliography.',
  },
]

export const siteMapSections = [
  {
    id: 'project-information',
    title: 'Project Information',
    description: 'Project framing, team information, orientation, and reference material.',
    links: [
      infoPageLinks.find(({ id }) => id === 'about-project'),
      infoPageLinks.find(({ id }) => id === 'team'),
      infoPageLinks.find(({ id }) => id === 'site-map'),
      infoPageLinks.find(({ id }) => id === 'bibliography'),
    ],
  },
  {
    id: 'applications',
    title: 'Applications',
    description: 'The four manuscript-study applications linked from the apples of the tree.',
    links: [
      {
        id: 'fenius',
        label: 'Fenius',
        to: routePaths.appPages.fenius,
        description: 'A three-part app for understanding and documenting codicology and bookbinding.',
      },
      {
        id: 'seshat',
        label: 'Seshat',
        to: routePaths.appPages.seshat,
        description: 'A multifaceted tool for analysing scripts.',
      },
      {
        id: 'mergen',
        label: 'Mergen',
        to: routePaths.appPages.mergen,
        description: 'A layout segmentation model for identifying the elements on a manuscript page.',
      },
      {
        id: 'proteus',
        label: 'Proteus',
        to: routePaths.appPages.proteus,
        description: 'An easy-to-use interface for enhancing digital images.',
      },
    ],
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'The four guided study routes linked from the oak galls of the tree.',
    links: [
      {
        id: 'scripts',
        label: 'The History of Medieval Scripts',
        to: routePaths.tutorialPages.scripts,
        description: 'Palaeographical survey.',
      },
      {
        id: 'digital-palaeography',
        label: 'Digital Palaeography',
        to: routePaths.tutorialPages.digitalPalaeography,
        description: 'Digital approaches to palaeography and manuscript studies.',
      },
      {
        id: 'msi',
        label: 'Multispectral Imaging for Medieval Manuscripts',
        to: routePaths.tutorialPages.msi,
        description: 'MSI.',
      },
      {
        id: 'codicology',
        label: 'The Creation of a Medieval Codex',
        to: routePaths.tutorialPages.codicology,
        description: 'Codicology and bookbinding.',
      },
    ],
  },
]

export function getCodicologyPath(chapterSlug = '') {
  return chapterSlug ? `${routePaths.tutorialPages.codicology}/${chapterSlug}` : routePaths.tutorialPages.codicology
}
