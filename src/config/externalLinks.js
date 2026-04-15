// Temporary external destinations for the landing-page apples until the live app URLs are published.
const placeholderLandingAppUrls = {
  fenius: 'https://example.com/emanuskript/fenius',
  mergen: 'https://example.com/emanuskript/mergen',
  seshat: 'https://example.com/emanuskript/seshat',
}

export const appExternalLinks = {
  fenius: {
    landingUrl: 'https://fenius-ten.vercel.app/',
    launchUrl: 'https://fenius-ten.vercel.app/',
    launchLabel: 'Open Fenius',
    launchTodo: null,
    githubUrl: 'https://github.com/emanuskript/Fenius',
    zenodoUrl: null,
    zenodoTodo: 'Replace with the public Zenodo record for Fenius in src/config/externalLinks.js.',
  },
  mergen: {
    landingUrl: placeholderLandingAppUrls.mergen,
    launchUrl: null,
    launchLabel: 'Launch Mergen',
    launchTodo: 'Replace with the public Mergen URL in src/config/externalLinks.js.',
    githubUrl: 'https://github.com/emanuskript/Mergen',
    zenodoUrl: null,
    zenodoTodo: 'Replace with the public Zenodo record for Mergen in src/config/externalLinks.js.',
  },
  proteus: {
    landingUrl: 'https://github.com/emanuskript/Proteus#readme',
    launchUrl: 'https://github.com/emanuskript/Proteus#readme',
    launchLabel: 'Open Proteus README',
    launchTodo: 'Replace with the README URL from the Proteus GitHub repository in src/config/externalLinks.js.',
    githubUrl: 'https://github.com/emanuskript/Proteus',
    zenodoUrl: null,
    zenodoTodo: 'Replace with the public Zenodo record for Proteus in src/config/externalLinks.js.',
  },
  seshat: {
    landingUrl: 'http://v021067.vm.gwdguser.de/',
    launchUrl: 'http://v021067.vm.gwdguser.de/',
    launchLabel: 'Open Seshat',
    launchTodo: null,
    githubUrl: 'https://github.com/emanuskript/Seshat',
    zenodoUrl: null,
    zenodoTodo: 'Replace with the public Zenodo record for Seshat in src/config/externalLinks.js.',
  },
}

export const projectExternalLinks = {
  repositoryUrl: null,
  repositoryTodo: 'Add the public project repository URL in src/config/externalLinks.js.',
  projectCodeUrl: null,
  projectCodeTodo: 'Add the public project-code URL in src/config/externalLinks.js.',
  zenodoRecordUrl: null,
  zenodoRecordTodo: 'Add the Zenodo project record URL in src/config/externalLinks.js.',
  doiUrl: null,
  doiTodo: 'Add the DOI URL in src/config/externalLinks.js.',
}
