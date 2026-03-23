export const tutorialsOverview = {
  eyebrow: 'Tutorial System',
  title: 'Tutorials',
  lede:
    'Choose a route into palaeography, digital methods, manuscript imaging, script history, bookmaking, historical context, and reference terminology.',
  introduction: [
    'The tutorial system combines different reading modes rather than forcing every subject into the same format. Some units are guided lesson sequences, some are visual gateways, and others are best explored chronologically or through search.',
    'Start with a pathway below, then move through each unit using local side navigation, the glossary, and timeline links whenever you want to deepen the historical or technical context.',
  ],
}

export const tutorialCollections = [
  {
    slug: 'palaeography',
    title: 'Palaeography',
    route: '/tutorials/palaeography',
    kind: 'Orientation',
    summary:
      'A concise introduction to the field, its key terms, the palaeographer’s task, and the role of historical context.',
  },
  {
    slug: 'digital-palaeography',
    title: 'Digital Palaeography',
    route: '/tutorials/digital-palaeography',
    kind: 'Mind map',
    summary:
      'A conceptual tour through transcription, XML, IIIF, linked data, GIS, databases, digital editions, and named-entity recognition.',
  },
  {
    slug: 'msi',
    title: 'MSI',
    route: '/tutorials/msi',
    kind: 'Course sequence',
    summary:
      'Six connected lessons on multispectral imaging, from capture equipment and wavelengths to Hoku workflows, Proteus, and future directions.',
  },
  {
    slug: 'scripts',
    title: 'Scripts',
    route: '/tutorials/scripts',
    kind: 'Chronological pathway',
    summary:
      'A twelve-unit sequence following Latin scripts from Roman antiquity through humanist hands, with manuscript examples throughout.',
  },
  {
    slug: 'bookbinding',
    title: 'Bookbinding',
    route: '/tutorials/bookbinding',
    kind: 'Workshop and reader',
    summary:
      'Enter through an immersive workshop scene, then move through chapters on supports, folding, sewing, boards, covering, and decoration.',
  },
  {
    slug: 'timeline',
    title: 'Historical Timeline',
    route: '/tutorials/timeline',
    kind: 'Context module',
    summary:
      'A split-screen timeline connecting script history to Roman inscriptions, monasticism, Montecassino, and the history of the alphabet.',
  },
  {
    slug: 'glossary',
    title: 'Glossary',
    route: '/tutorials/glossary',
    kind: 'Reference layer',
    summary:
      'A searchable glossary for manuscript terms, book structures, letterforms, and digital methods used throughout the site.',
  },
]
