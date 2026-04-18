import { appExternalLinks } from '../../config/externalLinks'
import { routePaths } from '../../config/siteLinks'

export const aboutContent = {
  eyebrow: '',
  title: 'About the Project',
  lede: '',
  meta: ['April 2024 - March 2026'],
  overview: {
    id: 'project-overview',
    title: '',
    resources: {
      id: 'ai-safety-resources',
      label: 'Resources about AI Safety and Best Practices',
      href: 'https://owncloud.gwdg.de/index.php/s/PyQ2nN6aKpypKfG?path=%2FWebsite%2FResources%20on%20AI%20Policies',
    },
    paragraphs: [
      [
        { text: 'This project (April 2024-March 2026) was funded by the ' },
        { text: 'Stiftung Innovation in der Hochschullehre', href: 'https://stiftung-hochschullehre.de/' },
        {
          text:
            ' and led by Dr. Anna Dorofeeva in the Institute for Digital Humanities at the University of Göttingen. Its goal was to build an extensive platform for learning about medieval western Latin manuscripts in the digital environment in which many students now first encounter them. Despite the growing accessibility of medieval manuscripts through digitisation, the study of these historical artefacts still presumes a high level of specialist knowledge. Moreover, the sciences of palaeography and codicology still largely depend on unbarred access to the physical objects themselves. To this end, the project team developed a concept for a comprehensive pedagogical website outfitted with several apps intended for learning about manuscript study and practising it. Its goal was to build tools that would meet learners and researchers where they are, whether in the classroom, at an archive, or online.',
        },
      ],
    ],
  },
  applications: {
    id: 'applications',
    title: 'Apps',
    items: [
      {
        id: 'mergen',
        title: 'Mergen',
        description:
          'Mergen is an AI-based layout segmentation app for detecting key textual, paratextual and non-textual elements on a manuscript page.',
        to: routePaths.appPages.mergen,
        githubHref: appExternalLinks.mergen.githubUrl,
      },
      {
        id: 'proteus',
        title: 'Proteus',
        description:
          'Proteus simplifies multispectral imaging (MSI) workflows for hard-to-read texts and can also enhance regular visible-light images.',
        to: routePaths.appPages.proteus,
        githubHref: appExternalLinks.proteus.githubUrl,
      },
      {
        id: 'seshat',
        title: 'Seshat',
        description:
          'Seshat is an annotation tool for marking digital manuscript images in several ways and supporting the analysis of scribal hands.',
        to: routePaths.appPages.seshat,
        githubHref: appExternalLinks.seshat.githubUrl,
      },
      {
        id: 'fenius',
        title: 'Fenius',
        description:
          'Fenius is a multi-level application with three tools for understanding and documenting codicology and bookbinding.',
        to: routePaths.appPages.fenius,
        githubHref: appExternalLinks.fenius.githubUrl,
      },
    ],
  },
  tutorials: {
    id: 'tutorials',
    title: 'Tutorials',
    intro: 'This suite of apps is accompanied by four tutorials:',
    items: [
      {
        id: 'scripts',
        title: 'The History of Medieval Scripts',
        summary: 'Descriptive survey of script types',
        to: routePaths.tutorialPages.scripts,
      },
      {
        id: 'digital-palaeography',
        title: 'Digital Palaeography',
        summary: 'Mind map exploring the use of digital technologies in palaeography and manuscript studies',
        to: routePaths.tutorialPages.digitalPalaeography,
      },
      {
        id: 'msi',
        title: 'Multispectral Imaging for Medieval Manuscripts',
        summary: 'Guide for understanding and setting up a multispectral imaging workflow',
        to: routePaths.tutorialPages.msi,
      },
      {
        id: 'codicology',
        title: 'The Creation of a Medieval Codex',
        summary: 'Step-by-step description of the process of making a parchment codex in a scriptorium',
        to: routePaths.tutorialPages.codicology,
      },
    ],
  },
  bibliography: {
    id: 'bibliography-note',
    title: 'Bibliography',
    text: 'The website also integrates a comprehensive bibliography built in Zotero.',
    to: routePaths.bibliography,
    linkLabel: 'Open the bibliography page',
  },
  acknowledgements: {
    id: 'acknowledgements',
    title: 'Partners and Support',
    logos: [
      {
        id: 'stiftung',
        label: 'Stiftung Innovation in der Hochschullehre',
        alt: 'Logo of Stiftung Innovation in der Hochschullehre.',
        src: '/images/partners/stil.svg',
        href: 'https://stiftung-hochschullehre.de/',
      },
      {
        id: 'sub',
        label: 'SUB Göttingen',
        alt: 'Logo of the Göttingen State and University Library.',
        src: '/images/partners/sub.svg',
        href: 'https://www.sub.uni-goettingen.de/sub-aktuell/',
      },
      {
        id: 'uni-goettingen',
        label: 'Universität Göttingen',
        alt: 'Logo of Georg-August-Universität Göttingen.',
        src: '/images/partners/ugoe.svg',
        href: 'https://www.uni-goettingen.de/',
      },
      {
        id: 'ifdh',
        label: 'Institute for Digital Humanities',
        alt: 'Logo of the Institute for Digital Humanities.',
        src: '/images/partners/ifdh.png',
        href: 'https://www.uni-goettingen.de/de/597374.html',
      },
    ],
  },
}
