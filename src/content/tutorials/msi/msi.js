import { routePaths } from '../../../config/siteLinks'

const imageOriginal = (unit, name) => `/images/msi/${unit}/${name}`
const imageCover = (name) => `/images/msi/covers/${name}`
const docxSource = (unit) => `/source/msi/${unit}/index.html`

const docxBlock = (unit, transformOptions = {}) => ({
  type: 'html-source',
  sourcePath: docxSource(unit),
  selector: '',
  transform: 'msi-docx',
  transformOptions,
})

export const msiOverview = {
  eyebrow: 'Tutorials',
  title: 'Multispectral Imaging for Medieval Manuscripts',
  lede:
    'Seven core MSI tutorial units with a separate bibliography section for projects and references.',
  coverImage: imageCover('unit01-cover.jpg'),
  coverAlt: 'MSI tutorial cover image.',
  coverCaption: '',
}

export const msiLessons = [
  {
    number: 1,
    numeral: 'I',
    slug: 'introduction',
    title: 'Introduction',
    description: 'MSI basics, history, digital palaeography, example applications, and core project links.',
    intro: '',
    coverImage: imageCover('unit01-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit I cover image.',
    coverImageCaption: '',
    blocks: [
      docxBlock('unit01', {
        leadingParagraph:
          'Multispectral imaging (MSI) is the technique of capturing and processing images in multiple (non-)visible wavelengths of light across defined regions of the spectrum, ranging from the ultraviolet (UV) through the visible (VIS) to the near infrared (NIR). By illuminating an object with different wavelengths, it generates an optical reaction, of, e.g., reflectance or absorption, to gather more data and information on an object by analyzing different image outcomes. In contrast to conventional photography, which operates within the VIS, MSI produces a sequence of images under controlled illuminated conditions. These datasets can be combined and post-processed to enhance otherwise illegible or hidden features.',
      }),
    ],
  },
  {
    number: 2,
    numeral: 'II',
    slug: 'msi-equipment-and-techniques-for-manuscripts',
    title: 'MSI Equipment and Techniques for Manuscripts',
    description: 'Phase One Rainbow system, cameras, lights, filters, Rainbow software, and case studies.',
    intro: '',
    coverImage: imageCover('unit02-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit II cover image.',
    coverImageCaption: '',
    blocks: [
      docxBlock('unit02', {
        leadingParagraph:
          'In this tutorial, we will be talking about Phase One - Rainbow MSI System that we use in Göttingen.',
      }),
    ],
  },
  {
    number: 3,
    numeral: 'III',
    slug: 'hoku-beginner',
    title: 'Hoku [Beginner]',
    description: 'Creating and executing jobs, ReadImage, WriteImage, enhancement modules, modifications, and ReadStack.',
    intro: '',
    coverImage: imageCover('unit03-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit III cover image.',
    coverImageCaption: '',
    blocks: [
      docxBlock('unit03', {
        leadingParagraph:
          'Hoku is a post-processing application, developed by RIT, for processing images that were scanned under multispectral light.',
      }),
    ],
  },
  {
    number: 4,
    numeral: 'IV',
    slug: 'hoku-intermediate',
    title: 'Hoku [Intermediate]',
    description: 'ICA, PCA, SAM, Image Math, and step-by-step intermediate Hoku post-processing.',
    intro: '',
    coverImage: imageCover('unit04-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit IV cover image.',
    coverImageCaption: '',
    blocks: [docxBlock('unit04')],
  },
  {
    number: 5,
    numeral: 'V',
    slug: 'proteus',
    title: 'Proteus',
    description: 'Installation, interface overview, pseudocolor, thresholding, enhancement tools, and PCA workflows.',
    intro: '',
    coverImage: imageCover('unit05-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit V cover image.',
    coverImageCaption: '',
    blocks: [
      docxBlock('unit05', {
        leadingParagraph:
          'Proteus is an application for scientific image processing. It is designed for the enhancement, analysis, and visualization of grayscale and multi-band images. The application brings together common image-processing operations such as pseudocolor rendering, thresholding, denoising, inversion, rotation, PCA (principle component analysis), annotation, and ROI selection in a single interface. These functions are provided through an interactive graphical environment where the user can open an image, apply transformations directly from the sidebar, annotate or crop selected areas, and save the processed result.',
      }),
    ],
  },
  {
    number: 6,
    numeral: 'VI',
    slug: 'challenges-and-limitations',
    title: 'Challenges and Limitations',
    description: 'Practical constraints around equipment, capture, post-processing, storage, software, and expertise.',
    intro: '',
    coverImage: imageCover('unit06-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit VI cover image.',
    coverImageCaption: '',
    blocks: [
      docxBlock('unit06', {
        leadingParagraph:
          'Multispectral imaging is a significant technique in cultural heritage in general and palaeography specifically for deciphering manuscripts and recovering or unveiling undertext. However, it presents various practical and technical challenges and limitations.',
      }),
    ],
  },
  {
    number: 7,
    numeral: 'VII',
    slug: 'future-of-msi-applications-and-potential-advancements',
    title: 'Future of MSI Applications and Potential Advancements',
    description: 'Institutional uptake, more accessible tools, technical developments, and AI-assisted workflows.',
    intro: '',
    coverImage: imageCover('unit07-cover.jpg'),
    coverImagePosition: 'center center',
    coverImageAlt: 'MSI tutorial unit VII cover image.',
    coverImageCaption: '',
    blocks: [
      docxBlock('unit07', {
        leadingParagraph:
          'While gradually evolving into a tool for scholars, research about multispectral imaging (MSI) applications in the field of cultural heritage, in contrast to fields like medicine, agriculture or forestry, is meager and needs further investigation to allow for future advancement.',
      }),
    ],
  },
  {
    number: 8,
    numeral: 'VIII',
    slug: 'bibliography',
    title: 'Bibliography',
    description: 'Comprehensive bibliography of MSI literature and references for further research.',
    intro: '',
    coverImage: '',
    coverImagePosition: 'center center',
    coverImageAlt: '',
    coverImageCaption: '',
    blocks: [docxBlock('unit08')],
  },
]

export function getMsiPath(lessonSlug = '') {
  return lessonSlug ? `${routePaths.tutorialPages.msi}/${lessonSlug}` : routePaths.tutorialPages.msi
}

export function getMsiLesson(slug) {
  return msiLessons.find((lesson) => lesson.slug === slug)
}
