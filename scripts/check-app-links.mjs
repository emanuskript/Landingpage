import { appExternalLinks } from '../src/config/externalLinks.js'

const expectedApps = ['fenius', 'mergen', 'proteus', 'seshat']
const expectedRepositories = Object.fromEntries(
  expectedApps.map((appId) => [
    appId,
    `https://github.com/emanuskript/${appId[0].toUpperCase()}${appId.slice(1)}`,
  ]),
)

const configuredApps = Object.keys(appExternalLinks).sort()

if (configuredApps.join(',') !== expectedApps.join(',')) {
  throw new Error(`Expected exactly ${expectedApps.join(', ')}, found ${configuredApps.join(', ')}`)
}

for (const appId of expectedApps) {
  const links = appExternalLinks[appId]

  for (const field of ['landingUrl', 'launchUrl', 'githubUrl']) {
    if (!links[field]) {
      throw new Error(`${appId}.${field} must be configured`)
    }

    const url = new URL(links[field])
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error(`${appId}.${field} must use HTTP or HTTPS`)
    }

    if (url.hostname === 'example.com') {
      throw new Error(`${appId}.${field} still uses a placeholder destination`)
    }
  }

  if (links.landingUrl !== links.launchUrl) {
    throw new Error(`${appId} landing and launch destinations must remain in sync`)
  }

  if (links.githubUrl !== expectedRepositories[appId]) {
    throw new Error(`${appId}.githubUrl must be ${expectedRepositories[appId]}`)
  }
}

const stableProteusRelease = 'https://github.com/emanuskript/Proteus/releases/tag/v2.0.0'
if (appExternalLinks.proteus.launchUrl !== stableProteusRelease) {
  throw new Error(`Proteus must remain pinned to ${stableProteusRelease}`)
}

console.log('Validated launch and repository links for Fenius, Mergen, Proteus, and Seshat.')
