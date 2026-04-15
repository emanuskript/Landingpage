import { routePaths } from '../../config/siteLinks'

export const tutorialsOverview = {
  eyebrow: 'Tutorials',
  title: 'Tutorials',
  lede: 'The website includes four tutorials: The History of Medieval Scripts, Digital Palaeography, Multispectral Imaging for Medieval Manuscripts, and The Creation of a Medieval Codex.',
}

export const tutorialCollections = [
  {
    slug: 'codicology',
    title: 'The Creation of a Medieval Codex',
    route: routePaths.tutorialPages.codicology,
    kind: 'Illustrated tutorial',
    summary:
      'A ten-unit codicology and bookmaking tutorial with an interactive scriptorium gateway and an added unit on Islamic codicology and bookbinding.',
  },
  {
    slug: 'scripts',
    title: 'The History of Medieval Scripts',
    route: routePaths.tutorialPages.scripts,
    kind: 'Twelve-unit tutorial',
    summary:
      'A twelve-unit medieval palaeography tutorial following the principal scripts of the Latin West from Roman antiquity to the early modern period.',
  },
  {
    slug: 'msi',
    title: 'Multispectral Imaging for Medieval Manuscripts',
    route: routePaths.tutorialPages.msi,
    kind: 'Course sequence',
    summary:
      'A seven-unit lesson sequence on MSI concepts, equipment, Hoku, Proteus, current challenges, and future manuscript applications.',
  },
  {
    slug: 'digital-palaeography',
    title: 'Digital Palaeography',
    route: routePaths.tutorialPages.digitalPalaeography,
    kind: 'Interactive mind map',
    summary:
      'A source-aligned OrgPad page with a collapsible introduction, eight topic branches, and a Zotero reference link.',
  },
]
