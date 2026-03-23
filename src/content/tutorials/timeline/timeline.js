export const timelineOverview = {
  eyebrow: 'Tutorials',
  title: 'Historical Timeline',
  lede:
    'Follow key historical contexts for manuscript culture through a split-screen timeline linking scripts, institutions, and the history of writing.',
  sourceFiles: [
    'Tutorials/6. Historical Timeline/Timeline Concept and Design.pdf',
    'Tutorials/6. Historical Timeline/Timeline Concept and Design.pptx',
    'Tutorials/6. Historical Timeline/Timeline Sample History of Roman Alphabet.docx',
    'Tutorials/6. Historical Timeline/Timeline Sample Roman Inscriptions.docx',
    'Tutorials/6. Historical Timeline/Timeline Sample Monasticism.docx',
    'Tutorials/6. Historical Timeline/Timeline Sample Montecassino.docx',
  ],
  introduction: [
    'Select an entry on the left to keep the chronology in view while reading the article on the right.',
    'Each entry is designed to support the tutorial pathways on scripts, codicology, and palaeographical context.',
  ],
}

export const timelineEras = [
  { id: 'antiquity', label: 'Antiquity', start: -700, end: 500, color: '#8d6b3a' },
  { id: 'late-antiquity', label: 'Late Antiquity', start: 250, end: 700, color: '#7a5b47' },
  { id: 'early-medieval', label: 'Early Medieval', start: 500, end: 950, color: '#4c5f75' },
  { id: 'central-medieval', label: 'Central Medieval', start: 950, end: 1250, color: '#607248' },
  { id: 'late-medieval', label: 'Late Medieval', start: 1200, end: 1500, color: '#8a5847' },
  { id: 'renaissance', label: 'Renaissance', start: 1350, end: 1600, color: '#b0853e' },
]

export const timelineEntries = [
  {
    slug: 'history-roman-alphabet',
    title: 'History of the Roman Alphabet',
    period: '8th cent. BCE - 1st cent. CE',
    start: -800,
    end: 100,
    era: 'antiquity',
    summary:
      'The Roman alphabet is presented as the result of exchange between Greeks, Etruscans, and Romans rather than as an isolated invention.',
    sourceStatus: 'Draft seed article',
    sourceFile: 'Tutorials/6. Historical Timeline/Timeline Sample History of Roman Alphabet.docx',
    relatedScripts: ['origins-square-capitals'],
    sections: [
      {
        title: 'Transmission and adaptation',
        paragraphs: [
          'The article begins with older legends about the origins of writing, but then turns to the question of how the Romans acquired their alphabet through exchange between Greeks, Etruscans, and Romans.',
          'The origin of the Latin alphabet is thought to stem from permanent Greek settlements in southern Italy during the eighth century BCE. The Etruscans adopted the alphabet from the western Greek tradition, and the Romans are commonly thought to have adopted it through Etruscan mediation soon after.',
        ],
      },
      {
        title: 'Direction, names, and letter forms',
        paragraphs: [
          'During the archaic Latin period, inscriptions were first written from right to left, following Etruscan practice, or in the alternating boustrophedon style, before left-to-right writing became standard by the middle Republican period.',
          'The sample article also traces changes in letter names and forms, including the addition of Y and Z, the relation between C and G, and the broader adaptation of inherited letters to the needs of Latin.',
        ],
      },
    ],
    references: [
      'Treffort, "De Inventoribus Litterarum"',
      'Ullman, "The Origin and Development of the Alphabet"',
      'Wallace, "The Latin Alphabet and Orthography"',
    ],
  },
  {
    slug: 'roman-inscriptions',
    title: 'Roman Inscriptions',
    period: '7th cent. BCE - 5th cent. CE',
    start: -700,
    end: 450,
    era: 'antiquity',
    summary:
      'The sample article organizes Roman writing by medium and public function, from wax tablets and bronze tablets to stone inscriptions and monuments.',
    sourceStatus: 'Draft seed article',
    sourceFile: 'Tutorials/6. Historical Timeline/Timeline Sample Roman Inscriptions.docx',
    relatedScripts: ['origins-square-capitals', 'rustic-book-capitals', 'roman-cursive'],
    sections: [
      {
        title: 'Media and function',
        paragraphs: [
          'Before papyri or parchments became available to Romans, the dominant writing media were tablets and inscriptions carved on stone. Wax tablets were used for documents, letters, and school exercises, while bronze tablets survive especially for legislative purposes.',
          'Stone inscriptions ranged from gravestones and altars to honorific monuments and graffiti on walls. The source therefore treats material support and social function as inseparable from letter history.',
        ],
      },
      {
        title: 'Why inscriptions matter',
        paragraphs: [
          'The article surveys funerary monuments, public display inscriptions, and tablets that preserve Roman law, administration, and chronology. It repeatedly links these inscriptions to broader questions of authority, memory, and public communication.',
          'Because the article is organised through media and purpose, it works as a context module for the script lessons on square capitals, rustic capitals, and Roman cursive rather than as a detached catalogue.',
        ],
      },
    ],
    references: [
      'Bischoff, Latin Palaeography',
      'Corpus Inscriptionum Latinarum',
      'Epigraphik-Datenbank Clauss / Slaby',
    ],
  },
  {
    slug: 'monasticism',
    title: 'Monasticism and the Preservation of Knowledge',
    period: 'c. 300 - 1200 CE',
    start: 300,
    end: 1200,
    era: 'early-medieval',
    summary:
      'The sample article frames monasteries as post-Roman centers of literacy, libraries, and scriptoria rather than as background scenery.',
    sourceStatus: 'Draft seed article',
    sourceFile: 'Tutorials/6. Historical Timeline/Timeline Sample Monasticism.docx',
    relatedScripts: ['uncial-half-uncial', 'insular', 'merovingian-precaroline', 'caroline-pregothic'],
    sections: [
      {
        title: 'Monasteries and literacy',
        paragraphs: [
          'The article argues that churches and monasteries became increasingly important as sources of institutional continuity and as guardians of the cultural achievements associated with writing in the late Roman and post-Roman world.',
          'By about 700, literacy had become so closely tied to the ecclesiastical and especially monastic layer of society that to be identified as literate was effectively to be identified as a cleric.',
        ],
      },
      {
        title: 'Rule, libraries, and scriptoria',
        paragraphs: [
          'For the western part of the Empire, the Rule of Saint Benedict is presented as a seminal document of monastic formation, shaping the ideals of the monks and nuns who remained principal makers of manuscripts until about 1200.',
          'The article then turns to monastic libraries and scriptoria, the transmission of biblical and secular learning, and the development of distinctive house styles such as Beneventan and the scripts associated with Chelles, Merovingian centers, and Caroline reform.',
        ],
      },
    ],
    references: ['Rule of Saint Benedict', 'Plan of Saint Gall', 'Local Monasticism sample article'],
  },
  {
    slug: 'montecassino',
    title: 'Montecassino and the Beneventan Tradition',
    period: '529 - 1300 CE',
    start: 529,
    end: 1300,
    era: 'central-medieval',
    summary:
      'The Montecassino sample ties Beneventan script to a specific monastery, its disruptions, and its role as a crossroads of textual exchange.',
    sourceStatus: 'Draft seed article',
    sourceFile: 'Tutorials/6. Historical Timeline/Timeline Sample Montecassino.docx',
    relatedScripts: ['beneventan'],
    sections: [
      {
        title: 'Foundation and interruptions',
        paragraphs: [
          'Among the foundations of Benedict of Nursia, the most celebrated was the abbey of Monte Cassino, founded in 529 between Rome and Naples on the site of an earlier temple dedicated to Apollo. Beginning in the late eighth century, the monastery used a distinctive script now named Beneventan.',
          'The article emphasizes that the abbey endured long interruptions through invasion, exile, and occupation. Those disruptions help explain both the losses in its library and the significance of later recoveries and renewed book production.',
        ],
      },
      {
        title: 'A crossroads for books and scripts',
        paragraphs: [
          'Montecassino is presented as culturally rich because southern Italy connected North African, Byzantine, Latin, and Arabic worlds. The article links that setting to the monastery\'s book holdings, its restoration after 950, and the productive scriptoria of abbots such as Desiderius and Oderisius.',
          'Beneventan is therefore shown not as an abstract label but as a regional script tradition rooted in Montecassino, southern Italy, liturgical culture, and the longer transition toward Gothic scripts.',
        ],
      },
    ],
    references: ['Newton, Montecassino', 'Local Montecassino sample article', 'Related Beneventan script lesson'],
  },
]

export function getTimelineEntry(slug) {
  return timelineEntries.find((entry) => entry.slug === slug)
}
