export const bibliographyContent = {
  eyebrow: '',
  title: 'Bibliography',
  lede:
    'Search and browse the eManuSkript bibliography directly from the public Medieval Latin palaeography Zotero group library.',
  kerkoBaseUrl: '',
  kerkoDocsUrl: 'https://whiskyechobravo.github.io/kerko/latest/',
  resultPageSize: 12,
  zotero: {
    libraryId: '5499549',
    libraryType: 'group',
    librarySlug: 'medieval_latin_palaeography',
    title: 'Medieval Latin palaeography Zotero Library',
    webUrl: 'https://www.zotero.org/groups/5499549/medieval_latin_palaeography/library',
    apiBaseUrl: 'https://api.zotero.org/groups/5499549',
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
    'The page uses Zotero’s public Web API for live access to the site bibliography.',
  ],
}
