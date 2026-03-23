export const glossaryOverview = {
  eyebrow: 'Tutorials',
  title: 'Glossary',
  lede:
    'Search manuscript, script, codicological, and digital-method terms used across the tutorials, then open individual entries for fuller definitions.',
  sourceFiles: [
    'Tutorials/7. Glossary/Glossary.xlsx',
    'Tutorials/2. Digital Palaeography/2. Glossary.xlsx',
    'Tutorials/4. Scripts/html/unit01.html through unit10.html',
    'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  ],
}

export const glossaryCategories = [
  { id: 'digital', label: 'Digital Methods' },
  { id: 'palaeography', label: 'Palaeography' },
  { id: 'letterforms', label: 'Letterforms' },
  { id: 'codicology', label: 'Codicology' },
  { id: 'materials', label: 'Materials' },
  { id: 'context', label: 'Historical Context' },
]

export const glossaryTerms = [
  {
    term: 'allograph',
    slug: 'allograph',
    definition: 'Different form and ductus of the same letter in the same palaeographical unit or sample.',
    category: 'letterforms',
    aliases: ['allographs'],
    sourceLabel: 'Glossary spreadsheet',
    sourceFile: 'Tutorials/7. Glossary/Glossary.xlsx',
  },
  {
    term: 'ampersand',
    slug: 'ampersand',
    definition: 'The et ligature.',
    category: 'letterforms',
    sourceLabel: 'Glossary spreadsheet',
    sourceFile: 'Tutorials/7. Glossary/Glossary.xlsx',
  },
  {
    term: 'bifolium',
    slug: 'bifolium',
    definition: 'A single sheet folded once to create two leaves (four pages). Nested bifolia form a quire.',
    category: 'codicology',
    aliases: ['bifolia'],
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'biting or fusion',
    slug: 'biting-or-fusion',
    definition:
      'A characteristic feature of Gothic textualis in which two adjacent convex curves share a single stroke, reducing visual waste and producing dense texture.',
    category: 'letterforms',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit10.html',
  },
  {
    term: 'boustrophedon',
    slug: 'boustrophedon',
    definition: 'From the Greek for "ox-turning": a writing pattern in which alternate lines run in opposite directions.',
    category: 'palaeography',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit01.html',
  },
  {
    term: 'bow',
    slug: 'bow',
    definition: 'Curved stroke in a letter, for example b or o.',
    category: 'letterforms',
    sourceLabel: 'Glossary spreadsheet',
    sourceFile: 'Tutorials/7. Glossary/Glossary.xlsx',
  },
  {
    term: 'catchwords',
    slug: 'catchwords',
    definition:
      'A word or phrase written at the foot of the last page of a quire, repeating the opening word or words of the next quire.',
    category: 'codicology',
    aliases: ['catchword'],
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'chiaroscuro',
    slug: 'chiaroscuro',
    definition: 'The contrast between heavy and fine strokes within a script.',
    category: 'letterforms',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit10.html',
  },
  {
    term: 'clubbing',
    slug: 'clubbing',
    definition:
      'A characteristic widening at the top of ascender strokes, formed by a short approach stroke from the left before the main downstroke.',
    category: 'letterforms',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit07.html',
  },
  {
    term: 'codex',
    slug: 'codex',
    definition:
      'A book formed from bound stacked sheets, as opposed to the scroll or roll. The codex gradually replaced the roll from the second century onward.',
    category: 'codicology',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'counter',
    slug: 'counter',
    definition: 'The enclosed or partially enclosed space within a letter, such as the interior of an O or the bowl of a P.',
    category: 'letterforms',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit02.html',
  },
  {
    term: 'display script',
    slug: 'display-script',
    definition:
      'A script used for titles, headings, colophons, or other text elements intended to stand out visually from the main body of a manuscript.',
    category: 'palaeography',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit01.html',
  },
  {
    term: 'ductus',
    slug: 'ductus',
    definition:
      'The sequence and direction of pen strokes used to construct a letter. Ductus is a fundamental concept in palaeography because it helps identify how a script was written.',
    category: 'palaeography',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit01.html',
  },
  {
    term: 'endbands',
    slug: 'endbands',
    definition:
      'Structural and decorative elements at the head and tail of a book spine, originally sewn through the gatherings to stabilize and protect the spine edges.',
    category: 'codicology',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'foliation',
    slug: 'foliation',
    definition: 'The numbering of leaves in a manuscript, as opposed to pagination, which numbers pages.',
    category: 'codicology',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'Gregory\'s Rule',
    slug: 'gregorys-rule',
    definition:
      'The observation that in medieval parchment manuscripts hair sides face hair sides and flesh sides face flesh sides across each opening.',
    category: 'codicology',
    aliases: ['Gregorys Rule', 'Gregory rule'],
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'IIIF',
    slug: 'iiif',
    definition:
      'International Image Interoperability Framework, a standardized way to deliver images and audio or visual files from servers for interaction on the web.',
    category: 'digital',
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/IIIF.docx',
  },
  {
    term: 'interpunct',
    slug: 'interpunct',
    definition: 'A raised or mid-line dot used in Roman writing to separate words.',
    category: 'letterforms',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit02.html',
  },
  {
    term: 'iron-gall ink',
    slug: 'iron-gall-ink',
    definition:
      'The dominant writing ink of the medieval period, made from tannic acid extracted from oak galls combined with iron sulfate and a binder such as gum arabic.',
    category: 'materials',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'linked data',
    slug: 'linked-data',
    definition: 'A set of design principles for sharing machine-readable interlinked data on the Web.',
    category: 'digital',
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
  },
  {
    term: 'linked open data',
    slug: 'linked-open-data',
    definition:
      'When Linked Data is combined with Open Data, data that can be freely used and distributed, it is called Linked Open Data, or LOD.',
    category: 'digital',
    aliases: ['LOD'],
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
  },
  {
    term: 'litterae caelestes',
    slug: 'litterae-caelestes',
    definition:
      'Literally "heavenly letters": the elaborate bureaucratic hand reserved by the imperial chancery as a graphic sign of imperial authority.',
    category: 'palaeography',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit03.html',
  },
  {
    term: 'lunellum',
    slug: 'lunellum',
    definition:
      'A crescent-shaped scraping tool used by the parchment-maker to thin and smooth the stretched skin as it dried.',
    category: 'materials',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'mise-en-page',
    slug: 'mise-en-page',
    definition:
      'The overall layout of a manuscript page: the arrangement of text columns, margins, ruling lines, initials, and decorative elements.',
    category: 'codicology',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'multispectral imaging',
    slug: 'multispectral-imaging',
    definition:
      'A technique that captures images at multiple wavelengths of light, visible, infrared, and ultraviolet, to reveal materials invisible to the naked eye.',
    category: 'digital',
    aliases: ['MSI'],
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'named entity recognition',
    slug: 'named-entity-recognition',
    definition:
      'A system which uses machine-learning methods to identify named entities and classify them into predefined categories such as persons, locations, or organizations.',
    category: 'digital',
    aliases: ['NER'],
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Named Entity Recognition.docx',
  },
  {
    term: 'open data',
    slug: 'open-data',
    definition: 'Data that can be freely used and distributed.',
    category: 'digital',
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
  },
  {
    term: 'parchment',
    slug: 'parchment',
    definition:
      'A writing material made from the skin of a calf, sheep, or goat, prepared by de-hairing, liming, stretching under tension on a frame, and scraping with a lunellum.',
    category: 'materials',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'pounce',
    slug: 'pounce',
    definition:
      'A fine powder dusted onto parchment or paper to reduce grease and prevent ink from spreading. It could also be used after writing to absorb excess ink.',
    category: 'materials',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'quill',
    slug: 'quill',
    definition:
      'A writing pen made from the flight feather of a large bird, most often a goose, but also swan, peacock, or crow.',
    category: 'materials',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'quire',
    slug: 'quire',
    definition:
      'Also called a gathering or fascicle. A set of nested bifolia sewn together through their central fold.',
    category: 'codicology',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'RDF',
    slug: 'rdf',
    definition:
      'Resource Description Framework, a way of modelling data through machine-readable subject-predicate-object triples.',
    category: 'digital',
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
  },
  {
    term: 'scriptorium',
    slug: 'scriptorium',
    definition:
      'The writing room of a medieval monastery or cathedral, where manuscripts were copied and decorated.',
    category: 'context',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'sewing supports',
    slug: 'sewing-supports',
    definition:
      'Cords or thongs stretched across the spine onto which quires are sewn, forming the structural backbone of medieval bindings.',
    category: 'codicology',
    sourceLabel: 'Bookbinding HTML glossary',
    sourceFile: 'Tutorials/5. Codicology and Bookbinding/medieval_bookbinding_revised2.html',
  },
  {
    term: 'serif',
    slug: 'serif',
    definition:
      'Short finishing strokes at the ends of the main strokes of a letter. In Roman square capitals, they probably originated in the brushwork used to sketch letters before incision.',
    category: 'letterforms',
    aliases: ['serifs'],
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit01.html',
  },
  {
    term: 'textualis formata',
    slug: 'textualis-formata',
    definition:
      'The most calligraphic grade of Gothic textualis, characterized by highly regular letterforms, systematic hairline decoration, and carefully controlled feet.',
    category: 'palaeography',
    sourceLabel: 'Scripts HTML glossary',
    sourceFile: 'Tutorials/4. Scripts/html/unit10.html',
  },
  {
    term: 'URI',
    slug: 'uri',
    definition:
      'A Uniform Resource Identifier, used in Linked Open Data to give every object, concept, person, or event a global, unique, and permanent identifier.',
    category: 'digital',
    sourceLabel: 'Digital Palaeography text',
    sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
  },
  {
    term: 'XML',
    slug: 'xml',
    definition:
      'A highly flexible method for encoding or structuring data. Unlike HTML, XML is extensible and can be expanded to include whatever sections and sub-sections are needed.',
    category: 'digital',
    sourceLabel: 'Digital Palaeography glossary spreadsheet',
    sourceFile: 'Tutorials/2. Digital Palaeography/2. Glossary.xlsx',
  },
]
