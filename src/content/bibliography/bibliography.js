export const bibliographyContent = {
  eyebrow: '',
  title: 'Bibliography',
  lede:
    'Search and browse the Zotero Digital Palaeography bibliography of over 2,500 entries directly on eManuSkript.',
  kerkoBaseUrl: '',
  kerkoDocsUrl: 'https://whiskyechobravo.github.io/kerko/latest/',
  resultPageSize: 12,
  zotero: {
    libraryId: '5499549',
    libraryType: 'group',
    librarySlug: 'medieval_latin_palaeography',
    title:
      'Reference collection focused on research into medieval Latin manuscripts produced by Prof. Dr. Georg Vogeler and his team, and kindly shared with the Göttingen Digital Palaeography team. This library has been combined with a smaller library and made available here. It may contain errors or duplicates. The tags are in both English and German, and do not follow a single consistent system.',
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
