export const bibliographyContent = {
  eyebrow: 'Bibliography',
  title: 'Bibliography',
  lede:
    'Search and browse the Digital Palaeography bibliography directly from the public Zotero group library, with a Kerko deployment path ready for a fuller faceted interface.',
  kerkoBaseUrl: '',
  kerkoDocsUrl: 'https://whiskyechobravo.github.io/kerko/latest/',
  resultPageSize: 12,
  zotero: {
    libraryId: '6352684',
    libraryType: 'group',
    librarySlug: 'digital_palaeography',
    title: 'Digital Palaeography Zotero Library',
    webUrl: 'https://www.zotero.org/groups/6352684/digital_palaeography/library',
    apiBaseUrl: 'https://api.zotero.org/groups/6352684',
  },
  sortOptions: [
    { value: 'date', label: 'Publication date' },
    { value: 'creator', label: 'Author' },
    { value: 'title', label: 'Title' },
    { value: 'dateAdded', label: 'Date added' },
    { value: 'itemType', label: 'Resource type' },
  ],
  quickTypes: [
    { value: 'journalArticle', label: 'Journal articles' },
    { value: 'book', label: 'Books' },
    { value: 'bookSection', label: 'Book chapters' },
    { value: 'conferencePaper', label: 'Conference papers' },
    { value: 'report', label: 'Reports' },
    { value: 'thesis', label: 'Theses' },
    { value: 'webpage', label: 'Webpages' },
  ],
  notes: [
    'The page uses Zotero’s public Web API for live access to the current library.',
    'Set `kerkoBaseUrl` when the Kerko service is deployed to enable the advanced bibliography handoff.',
  ],
}
