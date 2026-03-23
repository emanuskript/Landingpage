export const digitalPalaeographyContent = {
  eyebrow: 'Tutorials',
  title: 'Digital Palaeography',
  lede:
    'In its most basic articulation, Digital Palaeography is the study of ancient handwriting supported and enhanced by digital technologies.',
  sourceFiles: [
    'Tutorials/2. Digital Palaeography/DigiPal_tutorial_Website.pdf',
    'Tutorials/2. Digital Palaeography/2. Glossary.xlsx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Introduction.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Links.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Peter Tutorials Script - for side menu.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Database and Archiving.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Digital Editions.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/GIS.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/IIIF.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Named Entity Recognition.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Transcription.docx',
    'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/XML.docx',
  ],
  intro: [
    'This present tutorial on Digital Palaeography, organised as a sort of mind map, introduces some of these digital technologies.',
    'In the center of the mind map is a node called "Digital Palaeography - Click here to Begin". It is connected by yellow lines to other boxes containing concepts related to Digital Palaeography, for example GIS, XML, and annotations.',
    'By tracing the links between the boxes, the reader should gain a high-level overview of what Digital Palaeography is and how it works.',
  ],
  mindMap: {
    image: '/images/digipal/orgpad-preview.webp',
    alt: 'Preview of the live Digital Palaeography concept map hosted on OrgPad.',
    fullScreenUrl: 'https://orgpad.info/s/EqHdVl9S3mq',
    note: 'Open the live concept map in OrgPad to move through the connected tutorial nodes, follow branches between topics, and explore the material in its intended interactive format.',
  },
  resources: [
    {
      label: 'Browse the Digital Palaeography bibliography',
      to: '/bibliography',
    },
    {
      label: 'Introduction references',
      to: { path: '/bibliography', query: { collection: 'XWR4ID82' } },
    },
  ],
  concepts: [
    {
      id: 'transcription',
      title: 'Transcription',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Transcription.docx',
      summary:
        'Transcription is the process of converting the content of a manuscript, print, or other source document into machine-readable or human-readable text. In scholarly workflows, transcription often serves as the foundational step before markup, editing, or publication.',
      bullets: [
        'Manual transcription is usually carried out by human experts who can read and transcribe texts from source materials such as manuscripts and scanned images.',
        'Automatic transcription is performed by OCR or HTR systems that recognize and convert text from images using algorithms and machine learning models.',
        'The workflow described in the source moves through input and preprocessing, layout recognition, text recognition, and post-processing.',
      ],
      bibliographyLink: {
        label: 'Browse Transcription references',
        to: { path: '/bibliography', query: { collection: 'EBC64JHC' } },
      },
    },
    {
      id: 'xml',
      title: 'XML',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/XML.docx',
      summary:
        'XML is a flexible, self-descriptive markup language designed to store and transport structured data in a way that is both human-readable and machine-readable.',
      bullets: [
        'XML uses user-defined tags rather than predefined ones.',
        'It organizes data hierarchically as a tree structure with root, parent, child, and sibling elements.',
        'In Digital Palaeography it is fundamental through standards like TEI for transcriptions, annotations, and manuscript description.',
      ],
      bibliographyLink: {
        label: 'Browse XML references',
        to: { path: '/bibliography', query: { collection: 'W6CWTT6J' } },
      },
    },
    {
      id: 'iiif',
      title: 'IIIF',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/IIIF.docx',
      summary:
        'IIIF, the International Image Interoperability Framework, is a standardized way to deliver images and audio or visual files from servers for interaction on the web.',
      bullets: [
        'It enables functionality such as deep zoom, comparison, structure, and annotation.',
        'A IIIF object is described through a manifest in JSON format.',
        'Common viewers in this ecosystem include Mirador, Universal Viewer, Glycerine Viewer, Clover, Annona, IIIF Curation Viewer, Tify, and OpenSeadragon.',
      ],
      bibliographyLink: {
        label: 'Browse IIIF references',
        to: { path: '/bibliography', query: { collection: 'H23TZCFJ' } },
      },
    },
    {
      id: 'lod',
      title: 'Linked Open Data',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Linked Open Data.docx',
      summary:
        'Linked Data is a set of design principles for sharing machine-readable interlinked data on the Web. When combined with Open Data, it is called Linked Open Data, or LOD.',
      bullets: [
        'LOD combines open data with machine-readable links to create a reusable web of information.',
        'The source explains LOD through RDF, URIs, HTTP URIs, links to external datasets, and SPARQL.',
        'The Mapping Manuscript Migrations project is given as a Digital Palaeography example for linking manuscript-related data from different sources.',
      ],
      bibliographyLink: {
        label: 'Browse Linked Open Data references',
        to: { path: '/bibliography', query: { collection: 'M63XMKFI' } },
      },
    },
    {
      id: 'ner',
      title: 'Named Entity Recognition',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Named Entity Recognition.docx',
      summary:
        'Named Entity Recognition, or NER, identifies named entities and classifies them into predefined categories such as persons, locations, organizations, or miscellaneous entities.',
      bullets: [
        'The main objective is to identify proper nouns and assign a semantic tag to them, transforming unstructured text into structured data.',
        'The source traces NER from classical machine-learning approaches such as HMMs and CRFs to neural models such as LSTMs and transformer-based systems.',
        'For Digital Palaeography, the side-menu script highlights manuscript annotation and historical-context reconstruction through entities such as scribes, locations, institutions, and dates.',
      ],
      bibliographyLink: {
        label: 'Browse NER references',
        to: { path: '/bibliography', query: { collection: 'ZCUG5PJZ' } },
      },
    },
    {
      id: 'gis',
      title: 'GIS',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/GIS.docx',
      summary:
        'A Geographic Information System is a computational system designed for the collection, management, analysis, and visualisation of spatial data.',
      bullets: [
        'GIS links geometric representation of space with attribute data such as metadata, bibliography, or researcher annotations.',
        'The source frames GIS as a tool for analysing provenance, workshops, donor networks, material production context, and regional script change.',
        'QGIS is used in the text as the main example because it is open source, transparent, and flexible for Digital Humanities work.',
      ],
      bibliographyLink: {
        label: 'Browse GIS references',
        to: { path: '/bibliography', query: { collection: 'DF7HMRXD' } },
      },
    },
    {
      id: 'database-archiving',
      title: 'Database and Archiving',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Database and Archiving.docx',
      summary:
        'A database is a systematically structured collection of data that supports controlled storage, retrieval, querying, and updates.',
      bullets: [
        'In the Digital Humanities, databases may archive material, collect sources, support research, create digital editions, or build corpora.',
        'The text stresses that data modelling is not only technical: selection, categorization, and structure reflect scholarly decisions.',
        'A digitized object is described not as a simple image, but as a complex research object containing image data, metadata, and transcriptions.',
      ],
      bibliographyLink: {
        label: 'Browse Database and Archiving references',
        to: { path: '/bibliography', query: { collection: '7QFM957E' } },
      },
    },
    {
      id: 'digital-editions',
      title: 'Digital Editions',
      sourceFile: 'Tutorials/2. Digital Palaeography/Finish and Feedback/Texts/Digital Editions.docx',
      summary:
        'Digital scholarly editions provide access to historical texts using standardized editorial methods appropriate to their subject and tradition.',
      bullets: [
        'The source distinguishes digital editions from merely digitized print editions.',
        'It describes a separation between the core data layer, often TEI-XML, and the presentation layer delivered through an interface.',
        'Digital editions are presented as one possible final product of palaeographical research because they capture manuscript detail during transcription and then publish it through visualization tools.',
      ],
      bibliographyLink: {
        label: 'Browse Digital Editions references',
        to: { path: '/bibliography', query: { collection: 'V8HDZX7A' } },
      },
    },
  ],
  furtherReading: [
    'Use the live OrgPad map as the main interactive guide through the unit.',
    'Use the integrated bibliography to continue from each concept into the project library without leaving the portal.',
  ],
}
