export const aboutContent = {
  eyebrow: 'About the Project',
  title: 'About eManuskript',
  lede:
    'A structured project page prepared for final editorial copy, implementation links, acknowledgements, and partner identities.',
  basicInfo: {
    id: 'basic-info',
    title: 'Basic info',
    placeholder:
      'Placeholder for the public project description. Anna and Jeremy will supply the final overview text with input from the team.',
    notes: [
      'Use this section for the concise public explanation of the portal, its research aims, and its relationship to the four applications and tutorial pathways.',
    ],
  },
  howToUse: {
    id: 'how-to-use',
    title: 'How to use',
    placeholder:
      'Placeholder for visitor guidance. Final instructional copy should explain how to move from the landing tree into apps, tutorials, glossary support, and bibliography use.',
    indexTitle: 'Portal index',
    indexItems: [
      { label: 'Landing page', to: '/' },
      { label: 'Apps', to: '/apps' },
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'Bibliography', to: '/bibliography' },
      { label: 'Team', to: '/team' },
    ],
  },
  projectLinks: {
    id: 'project-links',
    title: 'GitHub and Zenodo',
    intro:
      'Project-code and publication links should be maintained from config so Mo can add the final destinations without editing the page layout.',
    groups: [
      {
        id: 'github',
        title: 'GitHub',
        note: 'Mo to add the GitHub repository and any project-code links.',
        links: [
          { label: 'Main repository', href: null, todo: 'Add public GitHub repository URL.' },
          { label: 'Project code', href: null, todo: 'Add public code/package URL if separate.' },
        ],
      },
      {
        id: 'zenodo',
        title: 'Zenodo',
        note: 'Mo to add Zenodo records, DOI links, and archival references.',
        links: [
          { label: 'Zenodo project record', href: null, todo: 'Add Zenodo record URL.' },
          { label: 'Project DOI', href: null, todo: 'Add DOI link when available.' },
        ],
      },
      {
        id: 'bibliography',
        title: 'Bibliography',
        note: 'The live project bibliography is already integrated in the portal.',
        links: [{ label: 'Open bibliography', to: '/bibliography' }],
      },
    ],
  },
  acknowledgements: {
    id: 'acknowledgements',
    title: 'Acknowledgements',
    placeholder:
      'Placeholder for the formal acknowledgements, funding language, and contribution notes supplied by the project team.',
  },
  partnerLogos: {
    id: 'partner-logos',
    title: 'Partner logos',
    items: [
      { id: 'stil', label: 'StIL', image: null, todo: 'Add StIL logo asset.' },
      { id: 'ugoe', label: 'UGoe', image: null, todo: 'Add UGoe logo asset.' },
      { id: 'sub', label: 'SUB', image: null, todo: 'Add SUB logo asset.' },
      { id: 'ifdh', label: 'IfDH', image: null, todo: 'Add IfDH logo asset.' },
    ],
  },
}
