import { routePaths } from '../../../config/siteLinks'

const image = (unit, name) => `/images/msi/${unit}/${name.replace(/\.[^.]+$/, '.webp')}`

const msiReferences = {
  bearman:
    'Bearman, Gregory. "Exploring the Limitations and Advantages of Multi-Spectral Imaging in Papyrology: Darkened, Carbonized, and Palimpsest Papyri." Eikonopoiia, 2011.',
  boesch:
    'Boesch, G. "Multispectral Imaging: Looking Beyond the Visible Light." Viso.ai, 3 Apr. 2024, https://viso.ai/deep-learning/multispectral-imaging/.',
  conjeti:
    'Conjeti, Sailesh, Stefanie Demirci, and Vincent Christlein. Image Retrieval in Big Image Data. Elsevier, 2023.',
  cosentino:
    'Cosentino, Antonio. "Identification of Pigments by Multispectral Imaging: A Flowchart Method." Heritage Science, vol. 2, 2014, https://doi.org/10.1186/2050-7445-2-8.',
  daviesZawacki:
    'Davies, Helen, and Alexander Zawacki. "Making Light Work: Manuscripts and Multispectral Imaging." Journal of the Early Book Society, vol. 22, 2019, pp. 183-199.',
  digitripProteus:
    'DigiTRiP-Redaktion. "Proteus - Handschriftengeheimnisse Aufdecken." DigiTRiP, 17 Feb. 2025, https://doi.org/10.58079/13bto.',
  esSebar:
    'Es Sebar, L., et al. "3D Multispectral Imaging for Cultural Heritage Preservation: The Case Study of a Wooden Sculpture of the Museo Egizio di Torino." Heritage, vol. 6, no. 3, 2023, pp. 2783-2795, https://doi.org/10.3390/heritage6030148.',
  dkfz:
    'German Cancer Research Center (DKFZ). "AI and Multispectral Imaging Facilitate Keyhole Surgery." Press release, 13 Mar. 2023, https://www.dkfz.de/en/news/press-releases/detail/ai-and-multispectral-imaging-facilitate-keyhole-surgery.',
  huskinZawackiHeyworth:
    "Huskin, Kathryn A., Alexander J. Zawacki, and Gregory Heyworth. \"Multispectral Recovery of a Fragment of Richard FitzRalph's Summa de Questionibus Armenorum.\" 2019. Manuscript.",
  jones:
    'Jones, Cerys, et al. "Understanding Multispectral Imaging of Cultural Heritage: Determining Best Practice in MSI Analysis of Historical Artefacts." Journal of Cultural Heritage, vol. 45, 2020, pp. 339-350, https://doi.org/10.1016/j.culher.2020.03.004.',
  knoxArchimedes:
    'Knox, Keith, et al. "Multispectral Imaging of the Archimedes Palimpsest." Proceedings of the PICS Conference, 2001, pp. 206-210, https://www.imaging.org/common/uploaded%20files/pdfs/Papers/2001/PICS-0-251/4623.pdf.',
  knoxHoku:
    'Knox, Keith. "Hoku Software." Rochester Institute of Technology, 11 Sept. 2017.',
  leslie:
    "Leslie. \"Gradual Gaussian Blur Using OpenCV.\" Leslie's Blog, 5 Aug. 2020, https://leslietj.github.io/2020/08/05/Gradual-Gaussian-Blur-Using-OpenCV/.",
  liang:
    'Liang, Haida. "Advances in Multispectral and Hyperspectral Imaging for Archaeology and Art Conservation." Applied Physics A, vol. 106, no. 2, 2011, https://doi.org/10.1007/s00339-011-6689-1.',
  mathworks:
    'MathWorks. "Multispectral Semantic Segmentation Using Deep Learning." MathWorks, https://www.mathworks.com/help/vision/ug/multispectral-semantic-segmentation-using-deep-learning.html.',
  moreton:
    'Moreton, Melissa. "Seeing the Invisible: Multispectral Imaging of Ancient and Medieval Manuscripts." Hill Museum & Manuscript Library, 1 July 2019, https://hmml.org/stories/seeing-invisible-multispectral-imaging-ancient-medieval-manuscripts/.',
  mukhtar:
    'Mukhtar, S., et al. "Advances in Spectral Imaging: A Review of Techniques and Technologies." IEEE Access, vol. 13, 2025, pp. 35848-35902, https://doi.org/10.1109/ACCESS.2025.3544476.',
  roepke:
    'Roepke, Brian. "The Magic of Principal Component Analysis through Image Compression." Data Knows All, 22 Mar. 2024, https://dataknowsall.com/blog/imagepca.html.',
  plantcv:
    'Team, PlantCV Development. "Pseudocolor." PlantCV Documentation, https://plantcv.readthedocs.io/en/latest/visualize_pseudocolor/.',
  verhoeven:
    'Verhoeven, Geert J. "Multispectral and Hyperspectral Imaging." The Encyclopedia of Archaeological Sciences, 2018, https://doi.org/10.1002/9781119188230.saseas0395.',
  zahra:
    'Zahra, A., et al. "Current Advances in Imaging Spectroscopy and Its State-of-the-Art Applications." Expert Systems with Applications, vol. 238, 2024, https://doi.org/10.1016/j.eswa.2023.122172.',
  zawackiCaseStudy:
    'Zawacki, Alexander, et al. "Fragments under the Lens: A Case Study of Multispectral versus Hyperspectral Imaging for Manuscript Recovery." Digital Philology, vol. 12, no. 1, 2023, pp. 123-143.',
  zawackiLight:
    'Zawacki, Alexander. "Light on a Living Text: MSI at Gottingen." Digital Palaeography, 2023, https://palaeography.hypotheses.org/298.',
  wikipedia:
    'Multispectral Imaging. Wikipedia, Wikimedia Foundation, https://en.wikipedia.org/wiki/Multispectral_imaging.',
  csmcGuide:
    'Centre for the Study of Manuscript Cultures. "Multispectral Imaging." CSMC Profiling Guide, Universitat Hamburg, https://www.csmc.uni-hamburg.de/profiling-guide/methods-equipment/imaging/msi.html.',
  bianco:
    'Bianco, G., et al. "A Brief History of Multispectral Imaging for Cultural Heritage." Eurographics Workshop on Graphics and Cultural Heritage, 2022, https://diglib.eg.org/bitstream/handle/10.2312/gch20221231/095-098.pdf.',
  manuscience:
    'Multispectral Imaging. ManuScience, https://www.manuscience.com/posts/multispectral-imaging/.',
  chs:
    'Multispectral Imaging for Palimpsests. CHS Open Source, Center for Hellenic Studies, https://chsopensource.org/courses/course-reading-palimpsests-imaging-methods/lessons/multispectral-imaging-for-palimpsests-2/.',
  chabries:
    'Chabries, Douglas M., Steven W. Booras, and Gregory H. Bearman. "Imaging the Past: Recent Applications of Multispectral Imaging Technology to Deciphering Manuscripts." Antiquity 77.296 (2003): 359-372.',
  hmml:
    'Seeing the Invisible: Multispectral Imaging of Ancient and Medieval Manuscripts. Hill Museum & Manuscript Library, https://hmml.org/stories/seeing-invisible-multispectral-imaging-ancient-medieval-manuscripts/.',
}

const allMsiReferences = [
  msiReferences.bearman,
  msiReferences.boesch,
  msiReferences.conjeti,
  msiReferences.cosentino,
  msiReferences.daviesZawacki,
  msiReferences.digitripProteus,
  msiReferences.esSebar,
  msiReferences.dkfz,
  msiReferences.huskinZawackiHeyworth,
  msiReferences.jones,
  msiReferences.knoxArchimedes,
  msiReferences.knoxHoku,
  msiReferences.leslie,
  msiReferences.liang,
  msiReferences.mathworks,
  msiReferences.moreton,
  msiReferences.mukhtar,
  msiReferences.roepke,
  msiReferences.plantcv,
  msiReferences.verhoeven,
  msiReferences.zahra,
  msiReferences.zawackiCaseStudy,
  msiReferences.zawackiLight,
  msiReferences.wikipedia,
  msiReferences.csmcGuide,
  msiReferences.bianco,
  msiReferences.manuscience,
  msiReferences.chs,
  msiReferences.chabries,
  msiReferences.hmml,
]

const lessonProjects = [
  'Lazarus Project',
  'Archimedes Palimpsest',
  'San Lorenzo Palimpsest',
  'Voynich Manuscript',
  'Martellus Map',
]

const lessonCaseStudies = [
  'Recovering Ancient Chinese Records with Multispectral Imaging',
  "Revealing Lost Evidence of Alesund's Fire with Rainbow Multispectral Imaging",
  'The Royal Library of Denmark - Preserving Cultural Heritage',
]

function figure(unit, file, alt, caption, detail = '') {
  return {
    image: image(unit, file),
    alt,
    caption,
    detail,
  }
}

export const msiOverview = {
  eyebrow: 'Tutorials',
  title: 'Multispectral Imaging for Medieval Manuscripts',
  lede:
    'A seven-unit tutorial on multispectral imaging, from introductory concepts and capture workflows to Hoku, Proteus, current challenges, and future applications.',
  coverImage: image('unit01', '365-baader.png'),
  coverAlt: 'Processed manuscript fragment from the local MSI source set.',
  coverCaption: 'Cod. Ms. Syr. 23, fol.145a, Staats- und Universitatsbibliothek, Gottingen, processed.',
  sourceFiles: [
    'MSI Tutorial I - Introduction_.docx',
    'MSI Tutorial II - MSI Equipment and Techniques for Manuscripts.docx',
    'MSI Tutorial III - Hoku [Beginner].docx',
    'MSI Tutorial IV - Hoku [Intermediate].docx',
    'MSI_Tutorial V - Proteus.docx',
    'MSI Tutorial VI - Challenges and Limitations.docx',
    'MSI Tutorial VII - Future of MSI Applications and Potential Advancements .docx',
    'MSI - Bibliograhy_Unit_MSI.docx',
  ],
  introduction: [
    'Multispectral imaging (MSI) is the technique of capturing and processing images in multiple (non-)visible wavelengths of light across defined regions of the spectrum, ranging from the ultraviolet through the visible to the near infrared.',
    'In contrast to conventional photography, which operates within the visible spectrum, MSI produces a sequence of images under controlled illuminated conditions. These datasets can be combined and post-processed to enhance otherwise illegible or hidden features.',
    'The source sequence begins with introductory concepts and manuscript use cases, then moves through equipment and capture, Hoku beginner and intermediate workflows, Proteus, present-day constraints, and future MSI applications and potential advancements.',
  ],
  highlights: [
    'Grounded in the local MSI source documents and lesson image folders.',
    'Includes the full seven-unit sequence required by the source set.',
    'Preserves source-backed lesson titles, figures, captions, and bibliography entries where they are available.',
  ],
  projects: lessonProjects,
  caseStudies: lessonCaseStudies,
  bibliography: allMsiReferences,
}

export const msiLessons = [
  {
    number: 1,
    numeral: 'I',
    slug: 'introduction',
    title: 'Introduction',
    description: 'Definition, history, manuscript use cases, and the basic science behind MSI.',
    intro:
      'Multispectral imaging introduces a controlled way of capturing and processing manuscript images across ultraviolet, visible, and near-infrared wavelengths.',
    coverImage: image('unit01', '365-baader.png'),
    coverImageAlt: 'Processed manuscript fragment from the local MSI source set.',
    coverImageCaption: 'Cod. Ms. Syr. 23, fol.145a, Staats- und Universitatsbibliothek, Gottingen, processed.',
    sourceFiles: ['MSI Tutorial I - Introduction_.docx'],
    blocks: [
      {
        type: 'section',
        title: 'What MSI is',
        paragraphs: [
          'Multispectral imaging (MSI) is the technique of capturing and processing images in multiple (non-)visible wavelengths of light across defined regions of the spectrum, ranging from the ultraviolet (UV) through the visible (VIS) to the near infrared (NIR).',
          'By illuminating an object with different wavelengths, it generates an optical reaction, for example reflectance or absorption, to gather more data and information on an object by analyzing different image outcomes.',
          'In contrast to conventional photography, which operates within the visible spectrum, MSI produces a sequence of images under controlled illuminated conditions. These datasets can be combined and post-processed to enhance otherwise illegible or hidden features.',
          'MSI is non-invasive and therefore a suitable tool for fragile and unique objects, where sampling or invasive analysis would cause damage. Its strength lies in the ability to differentiate materials because of their spectral behavior.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit01',
            '365-baader.png',
            'Processed manuscript fragment from the Lesson I source images.',
            'Cod. Ms. Syr. 23, fol.145a, Staats- und Universitatsbibliothek, Gottingen, processed.',
          ),
          figure(
            'unit01',
            'history-of-msi.png',
            'History diagram from the Lesson I source images.',
            'Brief History of MSI',
            'Local figure from the Lesson I image folder.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'MSI and digital Palaeography',
        paragraphs: [
          'Today MSI is used in many fields, not only palaeography, codicology, archaeology, and art history, but also in the natural sciences such as medicine. In manuscript studies it is used especially to recover texts and images that have been materially obscured by damage.',
          'Deciphering, analyzing, and researching manuscripts and scripts are vital for palaeography and depend on the legibility of the source material. If a manuscript shows the traces of time and historical use, making it difficult to read, MSI can offer a solution.',
          'Different manuscript materials such as ink, parchment, paper, papyrus, paint, glue, chemicals, and dirt react differently to light because of both their composition and the chemical changes they undergo over time. MSI can help distinguish and highlight those differently reacting materials.',
        ],
      },
      {
        type: 'section',
        title: 'Examples of MSI Use in Manuscript Studies',
        subsections: [
          {
            title: 'Palimpsest',
            paragraphs: ['Recovery of erased undertexts through spectral differentiation between an original and an added layer.'],
          },
          {
            title: 'Regaining legibility',
            paragraphs: ['Enhancement of faded or chemically altered text.'],
          },
          {
            title: '(Digital) Preservation',
            paragraphs: [
              'Preventing further deterioration from fading, cracking, flaking, biological growth, or stains, maintaining the object state rather than repairing or reconstructing it, monitoring change over time, and reducing physical handling.',
            ],
          },
          {
            title: 'Discovering hidden details',
            paragraphs: ['Detection of underdrawings, margins, watermarks, ruling, and corrections.'],
          },
          {
            title: '(Digital) Conservation',
            paragraphs: [
              'Because MSI does not need physical sampling, it allows repeated examination to extract information about materials and lost data while reducing the need to handle the original object.',
            ],
          },
          {
            title: '(Digital) Restoration',
            paragraphs: [
              'MSI can support digital restoration and recovery of an original state while preserving the current condition, for example by distinguishing layers, underlying information, retouches, previous restorations, or vanished text.',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'The Science behind MSI',
        paragraphs: [
          'During multispectral imaging an object is illuminated by different external light sources in a darkened room while the light changes image by image. To remain as non-invasive as possible, the tutorial recommends LEDs, which warm less and have little physical contact with a fragile surface.',
          'The object is exposed to wavelengths of roughly 300-900 nm and photographed with special attention to ultraviolet and infrared light, which distinguishes MSI from conventional photographic capture.',
        ],
        items: [
          'Fluorescent: material absorbs light and re-emits a longer wavelength.',
          'Invisible or visible: features that are invisible to the human eye can become legible under different light conditions such as IR or UV.',
          'Absorbent: a material takes in specific wavelengths of light rather than reflecting them.',
          'Reflective: a material bounces light back.',
          'Transmissive: a material allows light to pass through.',
        ],
      },
      {
        type: 'section',
        title: 'Projects',
        paragraphs: ['The source tutorial points readers to the following MSI projects and examples:'],
        items: lessonProjects,
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.bearman,
          msiReferences.bianco,
          msiReferences.chabries,
          msiReferences.knoxArchimedes,
          msiReferences.moreton,
          msiReferences.zawackiLight,
        ],
      },
    ],
  },
  {
    number: 2,
    numeral: 'II',
    slug: 'msi-equipment-and-techniques-for-manuscripts',
    title: 'MSI Equipment and Techniques for Manuscripts',
    description: 'Phase One - Rainbow capture equipment, light sources, filters, calibration, and workflow.',
    intro:
      'This unit follows the Phase One - Rainbow MSI System used in Gottingen and explains the equipment, lighting, filter behavior, calibration, and Rainbow workflow.',
    coverImage: image('unit02', 'setup.jpeg'),
    coverImageAlt: 'Phase One - Rainbow MSI system set-up from the local source images.',
    coverImageCaption: 'Set-up image from the Lesson II source folder.',
    sourceFiles: ['MSI Tutorial II - MSI Equipment and Techniques for Manuscripts.docx'],
    blocks: [
      {
        type: 'section',
        title: 'Phase One - Rainbow MSI System',
        paragraphs: [
          'The source lesson describes the Phase One - Rainbow MSI System used in Gottingen. Rainbow software is designed to provide easy access to the set-up and capture of multispectral image stacks.',
          'The set-up consists of two banks of LED lights, a camera, and a filter wheel. At Gottingen the system is portable, so that it can be brought to the repositories where manuscripts are located.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit02',
            'setup.jpeg',
            'Phase One - Rainbow MSI system set-up.',
            'SetUp',
            'Local source image from Lesson II.',
          ),
          figure(
            'unit02',
            'msi-camera.jpg',
            'MSI camera image from the local Lesson II source set.',
            'MSICamera',
            'Local source image from Lesson II.',
          ),
          figure(
            'unit02',
            'filter-wheel.jpg',
            'Filter wheel image from the local Lesson II source set.',
            'MSIFilter',
            'Local source image from Lesson II.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Cameras / Lenses',
        subsections: [
          {
            title: '1. The Wide Spectrum Sensor',
            paragraphs: [
              'The Phase One iXH 150MP and iXG 100MP cameras use a Wide Spectrum RGB sensor that is sensitive to visible, infrared, and ultraviolet wavelengths.',
              'To switch to normal imaging, users attach the IR/UV cut filter so that only the visible spectrum remains, meeting standards such as Metamorfoze, FADGI, and ISO 19264.',
            ],
          },
          {
            title: '2. Live View and Light Control',
            paragraphs: [
              'The CMOS sensor supports live view, allowing precise adjustments without touching fragile materials.',
              'The camera includes a custom lens shroud attached to the filter wheel to block unwanted light during multispectral capture.',
            ],
          },
          {
            title: '3. Choosing the Right Lens',
            paragraphs: [
              'Schneider Kreuznach 72 mm and 120 mm lenses are presented as the common options, with the 72 mm lens suited to general digitization and flat objects and the 120 mm lens suited to longer working distances.',
            ],
          },
          {
            title: '4. Shutter and Focus Features',
            paragraphs: [
              'The RS leaf shutter is described as highly durable, while the electronic shutter effectively removes mechanical wear.',
              'The focusing mechanism can measure object distance and adjust accordingly, and Auto PPI can set the resolution for the digitization task.',
            ],
          },
        ],
      },
      {
        type: 'section',
        title: 'Light Sources in Multispectral Imaging',
        paragraphs: [
          'The lesson states that light control is just as important as the camera itself. The Rainbow MSI system supports two LED light-source configurations for different imaging goals.',
        ],
        subsections: [
          {
            title: 'Multiband LED Lights',
            paragraphs: [
              'Multiband LED lights combine narrowband UV light, broadband visible light, and both broadband and narrowband IR light.',
              'The source notes that Rainbow includes predefined recipes for these lights following the CHARISMA guidelines so that illumination remains consistent and repeatable.',
            ],
          },
          {
            title: 'Narrowband LED Panels',
            paragraphs: [
              'Narrowband lights provide sixteen distinct wavelengths ranging from UV through visible to IR and are presented as the more specialized option for scientific analysis.',
            ],
          },
          {
            title: 'Preventing Light Pollution',
            paragraphs: [
              'The lesson recommends working in a completely dark room, or using blackout curtains or light-blocking panels if the space cannot be fully darkened.',
            ],
          },
          {
            title: 'Proper Light Positioning',
            paragraphs: [
              'Both LED lights should be set at a 45-degree angle from the object surface at a distance of one to two meters to reduce glare and distribute light evenly.',
            ],
          },
          {
            title: 'Calibration Materials',
            paragraphs: [
              'The source recommends a clean, flat, white A1-sized sheet for flat-field calibration or a background close to the final imaging set-up.',
            ],
            items: [
              'Avoid a completely dark background because dark surfaces can absorb too much infrared light.',
              'If the physical set-up changes, calibration should be repeated before new capture begins.',
            ],
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit02',
            'panel-lights.jpeg',
            'Multiband LED lights from the Lesson II source set.',
            'MSIPanel_Lights',
            'Local source image from Lesson II.',
          ),
          figure(
            'unit02',
            'narrowband-panels.jpeg',
            'Narrowband LED panels from the Lesson II source set.',
            'MSI_Narrowband',
            'Local source image from Lesson II.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Filters',
        subsections: [
          {
            title: 'UV Filter (~380 nm) Short Wave',
            paragraphs: [
              'Ultraviolet imaging concentrates on a short-wave range of roughly 320-380 nm. Because of its shallow penetration depth, it primarily documents features of the top layer of a manuscript.',
              'The lesson highlights UV reflection and fluorescence as particularly effective for documenting mechanical surface damage, erased ink, pigments, application technique, later additions, and restoration materials.',
            ],
          },
          {
            title: 'Visible Light (400-780 nm)',
            paragraphs: [
              'Visible light forms the reference dataset for MSI. The source separates it into blue, green, and red bands so that closely related shades can be differentiated more precisely than in ordinary RGB photography.',
            ],
          },
          {
            title: 'Infrared Filter (780~nm) Long Wave',
            paragraphs: [
              'Infrared imaging typically operates from 780 nm upward and can penetrate deeper into material than UV. The lesson presents it as particularly effective for overwritten texts, water damage, ink corrosion, fading, and bleed-through reduction.',
            ],
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit02',
            'filter-uv.jpg',
            'Ultraviolet MSI example from the local Lesson II source set.',
            'Cod. Ms. Syr. 23, fol.145a, Staats- und Universitatsbibliothek, Gottingen, processed, UV.',
          ),
          figure(
            'unit02',
            'filter-lime.jpg',
            'Visible-band MSI example from the local Lesson II source set.',
            'Cod. Ms. Syr. 23, fol.145a, Staats- und Universitatsbibliothek, Gottingen, processed, "lime".',
          ),
          figure(
            'unit02',
            'filter-ir.jpg',
            'Infrared MSI example from the local Lesson II source set.',
            'Cod. Ms. Syr. 23, fol.145a, Staats- und Universitatsbibliothek, Gottingen, processed, IR.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Imaging Software - Rainbow',
        paragraphs: [
          'The Rainbow software controls the entire imaging process through the workflow stages Project, Recipe, Calibrate, Capture, and Browse. In narrowband mode, an additional Export tab is available.',
          'Project is used to create a new project and define where image data and calibration files will be saved. Recipe selects or creates the filter, light, order, and exposure configuration.',
          'Calibrate covers focus and alignment, flat-field compensation, and exposure compensation. Capture records the image sequence according to the selected recipe, and Browse is used to review and organize the results.',
        ],
      },
      {
        type: 'figure',
        image: image('unit02', 'rainbow-software.jpg'),
        alt: 'Rainbow software interface from the Lesson II source set.',
        caption: 'MSIRainbowSoftware',
        detail: 'Local source image from Lesson II.',
      },
      {
        type: 'section',
        title: 'Case studies using the Phase One Rainbow MSI System',
        paragraphs: ['The source bibliography lists the following case-study titles under the MSI links section:'],
        items: lessonCaseStudies,
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.csmcGuide,
          msiReferences.daviesZawacki,
          msiReferences.jones,
          msiReferences.liang,
          msiReferences.zawackiCaseStudy,
          msiReferences.zawackiLight,
        ],
      },
    ],
  },
  {
    number: 3,
    numeral: 'III',
    slug: 'hoku-beginner',
    title: 'Hoku [Beginner]',
    description: 'Core Hoku workflow construction, read/write modules, enhancement, and basic modifications.',
    intro:
      'The Hoku beginner lesson introduces recipe construction, execution, reading and writing images, enhancement modules, and the first modification tools.',
    coverImage: image('unit03', 'basic-job.png'),
    coverImageAlt: 'Basic Hoku job screenshot from the local source images.',
    coverImageCaption: 'Basic_Job screenshot from the Lesson III image folder.',
    sourceFiles: ['MSI Tutorial III - Hoku [Beginner].docx'],
    blocks: [
      {
        type: 'section',
        title: 'Creating & Executing a Job',
        paragraphs: [
          'Hoku is described as a post-processing application developed by RIT for processing images scanned under multispectral light.',
          'To construct a job, the lesson begins by dragging modules to the desktop, connecting them, drawing around the connected task to turn it into a star, and then selecting execute from the contextual menu.',
          'Each module is unique, so every job recipe will differ even when the example is deliberately simple.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit03',
            'basic-job.png',
            'Basic Hoku job screenshot from the Lesson III source set.',
            'Basic_Job',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'connect-module.png',
            'Module connection screenshot from the Lesson III source set.',
            'connect_module',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'creating-star.png',
            'Star creation screenshot from the Lesson III source set.',
            'Creating_Star',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'execute-job.png',
            'Job execution screenshot from the Lesson III source set.',
            'Execute_Job',
            'Local source image from Lesson III.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'ReadImage and Show',
        paragraphs: [
          'ReadImage is presented as the basic first step in any workflow because it loads an image file into Hoku so that processing can begin.',
          'The source lists TIFF, ENVI, PNG, BMP, JPEG, and text among the supported formats. TIFF and ENVI can contain multiple bands, while JPEG images are limited to one or three bands.',
          'The lesson also explains how to read only a windowed region, how multipage TIFF files are indexed, how calibration files are applied, and how specific bands or band ranges can be selected.',
        ],
        items: [
          'Window parameters define the x and y position of the upper-left corner together with width and height.',
          'Calibration applies only if a valid calibration file exists in the same directory.',
          'Band numbers begin at 0 and can be listed individually or as ranges.',
          'Replacing a colon with a plus sign averages across a band range.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit03',
            'read-image-tiff.png',
            'ReadImage TIFF dialog screenshot from the Lesson III source set.',
            'Read_Image_Tiff',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'read-image-bands.png',
            'ReadImage bands dialog screenshot from the Lesson III source set.',
            'Read_Image_Bands',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'read-image-calibration.png',
            'ReadImage calibration dialog screenshot from the Lesson III source set.',
            'Read_Image_Calibration',
            'Local source image from Lesson III.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'WriteImage',
        paragraphs: [
          'WriteImage saves processed output to disk and supports TIFF, ENVI, JPEG, PNG, BMP, and text output.',
          'The lesson presents TIFF as the preferred archival format, ENVI as useful for scientific or computational work, and JPEG as a display format that should be used with care because it is lossy and irreversible.',
          'TIFF and ENVI can store 8- or 16-bit integers and 32- or 64-bit floating-point data, while JPEG, PNG, and BMP are limited to 8-bit images.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit03',
            'write-image-tiff.png',
            'WriteImage TIFF screenshot from the Lesson III source set.',
            'Write_Image_tiff',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'write-image-envi.png',
            'WriteImage ENVI screenshot from the Lesson III source set.',
            'Write_Image_envi',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'write-image-jpeg.png',
            'WriteImage JPEG screenshot from the Lesson III source set.',
            'Write_Image_Jpeg',
            'Local source image from Lesson III.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Enhancement',
        subsections: [
          {
            title: 'Pack',
            paragraphs: [
              'Pack adjusts the contrast of the input image and converts it into 8-bit unsigned integers, either from image statistics or from extremes.',
            ],
          },
          {
            title: 'Stretch',
            paragraphs: [
              'Stretch enhances contrast by spreading pixel values between chosen minima and maxima, with optional square-root, logarithmic, or threshold transforms.',
            ],
          },
          {
            title: 'Blur / Sharpen',
            paragraphs: ['Blur and Sharpen are introduced exactly as their names suggest: they blur or sharpen the image.'],
          },
          {
            title: 'Invert',
            paragraphs: [
              'Invert flips pixel values. The source gives explicit examples for 8-bit, 16-bit, and 32-bit integer images and explains that floating-point inversion is simply output = -value.',
            ],
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit03',
            'pack.png',
            'Pack module screenshot from the Lesson III source set.',
            'Pack',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'pack-str.png',
            'Pack and Stretch screenshot from the Lesson III source set.',
            'Pack_Str',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'invert-module.png',
            'Invert module screenshot from the Lesson III source set.',
            'Invert_module',
            'Local source image from Lesson III.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Modifications',
        subsections: [
          {
            title: 'Append',
            paragraphs: [
              'Append is used when a process requires multiple input images. It combines two inputs into one image and can also append bands when layers are selected.',
            ],
          },
          {
            title: 'Crop',
            paragraphs: [
              'Crop can define a rectangular spatial window or extract specific spectral bands from a multi-band image. Windows and band selections can be combined.',
            ],
          },
          {
            title: 'Rotate',
            paragraphs: [
              'Rotate can turn the image by 90-degree increments, use a custom angle, create a mirror image, or read TIFF orientation metadata.',
            ],
          },
          {
            title: 'ReadStack',
            paragraphs: [
              'ReadStack follows the same logic as ReadImage, but loads multiple images at once and combines them into one multi-band image. All images must share width, height, and alignment.',
            ],
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit03',
            'append-setup.png',
            'Append setup screenshot from the Lesson III source set.',
            'append_setup',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'append-setup-spectrally.png',
            'Spectral append setup screenshot from the Lesson III source set.',
            'append_setup_spectrally',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'append-spatial-result.png',
            'Append result screenshot from the Lesson III source set.',
            'append_spatial_result',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'crop-band-setup.png',
            'Crop band setup screenshot from the Lesson III source set.',
            'crop_band_setup',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'rotate.png',
            'Rotate screenshot from the Lesson III source set.',
            'rotate',
            'Local source image from Lesson III.',
          ),
          figure(
            'unit03',
            'readstack.png',
            'ReadStack screenshot from the Lesson III source set.',
            'readstack',
            'Local source image from Lesson III.',
          ),
        ],
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.knoxHoku,
          msiReferences.jones,
          msiReferences.roepke,
          msiReferences.zawackiCaseStudy,
        ],
      },
    ],
  },
  {
    number: 4,
    numeral: 'IV',
    slug: 'hoku-intermediate',
    title: 'Hoku [Intermediate]',
    description: 'ICA, PCA, SAM, and ImageMath for more advanced MSI post-processing.',
    intro:
      'The intermediate Hoku lesson moves from core workflow construction into ICA, PCA, SAM, and ImageMath.',
    coverImage: image('unit04', 'pca-result.jpg'),
    coverImageAlt: 'PCA output screenshot from the local Lesson IV source images.',
    coverImageCaption: 'PCA_Resut screenshot from the Lesson IV image folder.',
    sourceFiles: ['MSI Tutorial IV - Hoku [Intermediate].docx'],
    blocks: [
      {
        type: 'section',
        title: 'ICA',
        paragraphs: [
          'ICA is presented as an alternative to PCA. Instead of looking for variance, ICA looks for statistical differences between the spectral bands and tries to separate the data into sets that are statistically independent from one another.',
          'The lesson notes that ICA can sometimes reveal extremely faint text that PCA does not bring out as clearly.',
          'ICA takes two inputs, usually the same multiband image. The ROI image tells ICA where to look when calculating the transform, while the input image is where the transform will be applied.',
          'Output bands are ordered by spatial coherence, from highest to lowest, so the earliest bands often contain the clearest textual structures.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit04',
            'ica-roi-selection.png',
            'ICA ROI selection screenshot from the Lesson IV source set.',
            'ICA_ROI_selection',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'ica-nonlinearity-options.png',
            'ICA nonlinearity options screenshot from the Lesson IV source set.',
            'ICA_nonlinearity_options',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'potential-ica-result.png',
            'ICA result screenshot from the Lesson IV source set.',
            'Potential_ICA_result',
            'Local source image from Lesson IV.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'PCA',
        paragraphs: [
          'PCA, or Principal Components Analysis, helps find patterns in an image by measuring where the largest changes occur across all spectral bands.',
          'The lesson explains that faint or erased text can move into higher-order PCA bands even when the earliest bands contain the strongest variance or contrast.',
          'The ROI image tells PCA which area to analyze when calculating the transform, while the input image is the one to which the transform is applied.',
          'PCA outputs the same number of bands as the input image. The bands are ordered from band 0 as highest variance to the final band as lowest variance and often noise.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit04',
            'pca-inputs.jpg',
            'PCA inputs screenshot from the Lesson IV source set.',
            'PCA_Inputs',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'pca-window-roi.jpg',
            'PCA ROI window screenshot from the Lesson IV source set.',
            'PCA_Window_ROI',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'pca-result.jpg',
            'PCA result screenshot from the Lesson IV source set.',
            'PCA_Resut',
            'Local source image from Lesson IV.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'SAM',
        paragraphs: [
          'SAM, or Spectral Angle Mapping, measures the similarity between two images where one image or region acts as the reference.',
          'The source explains it as a way of comparing how each pixel spectrum points in space relative to the reference image.',
          'In the MSI context, SAM is useful for identifying scraped script, ink, erasures, or palimpsests by comparing their spectral responses.',
          'By default SAM outputs a single grayscale image in which each pixel represents the angular distance between input and reference spectra.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit04',
            'sam-readstack.jpg',
            'SAM ReadStack screenshot from the Lesson IV source set.',
            'SAM_Readstack',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'sam-roi.jpg',
            'SAM ROI screenshot from the Lesson IV source set.',
            'SAM_ROI',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'sam-greyscale.jpg',
            'SAM grayscale result screenshot from the Lesson IV source set.',
            'SAMGreyscale',
            'Local source image from Lesson IV.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'ImageMath',
        paragraphs: [
          'ImageMath performs a mathematical operation between two images, pixel by pixel, to help limit background noise, balance illumination, and amplify subtle contrasts.',
          'The lesson lists eight operations: add, sub, mul, div, max, min, mod, and atan2.',
          'If one image has a single band and the other has multiple bands, the single band is applied across all bands of the other image. If only one image is available, constants can be used as the second input.',
          'The source also describes the scale-factor option, for example using 0.5 and 0.5 with add to average two images together band by band.',
        ],
        items: [
          'add: sums corresponding pixels.',
          'sub: subtracts one image from the other.',
          'mul: multiplies corresponding pixels.',
          'div: divides the input image by the operation image.',
          'max and min: take the higher or lower value for each pixel.',
          'mod: calculates (input-op) / (input+op).',
          'atan2: applies the arctangent and is highlighted as useful for low-contrast details such as fading ink traces.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit04',
            'imagemath-desktop.png',
            'ImageMath desktop screenshot from the Lesson IV source set.',
            'imagemath_desktop',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'imagemath-operations.png',
            'ImageMath operations screenshot from the Lesson IV source set.',
            'imagemath_operations',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'imagemath-atan2.png',
            'ImageMath atan2 result screenshot from the Lesson IV source set.',
            'imagemath_atan2_grayscalex730',
            'Local source image from Lesson IV.',
          ),
          figure(
            'unit04',
            'imagemath-writeimage.png',
            'ImageMath output screenshot from the Lesson IV source set.',
            'imagemath_writeimage',
            'Local source image from Lesson IV.',
          ),
        ],
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.knoxHoku,
          msiReferences.conjeti,
          msiReferences.roepke,
          msiReferences.zawackiCaseStudy,
        ],
      },
    ],
  },
  {
    number: 5,
    numeral: 'V',
    slug: 'proteus',
    title: 'Proteus',
    description: 'Installation requirements, interface overview, core image-processing functions, and PCA workflows.',
    intro:
      'Proteus is introduced as an application for scientific image processing that collects enhancement, visualization, annotation, and PCA tools in a single interface.',
    coverImage: image('unit05', 'proteus-ui.png'),
    coverImageAlt: 'Proteus interface screenshot from the local Lesson V source images.',
    coverImageCaption: 'Proteus_UI screenshot from the Lesson V image folder.',
    sourceFiles: ['MSI_Tutorial V - Proteus.docx'],
    bridgeToApp: true,
    blocks: [
      {
        type: 'section',
        title: 'Proteus',
        paragraphs: [
          'Proteus is described as an application for scientific image processing. It is designed for the enhancement, analysis, and visualization of grayscale and multi-band images.',
          'The source brings together pseudocolor rendering, thresholding, denoising, inversion, rotation, PCA, annotation, and ROI selection inside one interactive graphical interface.',
        ],
      },
      {
        type: 'section',
        title: 'Installation requirements',
        items: [
          'Python: 3.10+',
          'PySide6: 6.5.0+',
          'OpenCV: 4.8.0+',
          'NumPy: 1.24.0+',
        ],
      },
      {
        type: 'section',
        title: 'Interface Overview',
        paragraphs: [
          'The main window is divided into Files / History, View / Annotate, and Image Processing. Files / History includes Open Image, Save Current Image, Clear, Undo, and Redo.',
          'View / Annotate contains Pan, Brush, and ROI together with brush-size control and options to clear annotations or the ROI.',
          'Image Processing groups Pseudocolor, Sharpen / Binarize, Enhance, and PCA tools, while the image canvas on the right displays the current result.',
          'The source emphasizes that Proteus starts by opening an image, then moving through navigation, annotation, ROI selection, and processing before saving the final result.',
        ],
      },
      {
        type: 'figure',
        image: image('unit05', 'proteus-ui.png'),
        alt: 'Proteus interface screenshot from the local Lesson V source images.',
        caption: 'Proteus_UI',
        detail: 'Local source image from Lesson V.',
      },
      {
        type: 'section',
        title: 'Pan / Brush and Region of Interest',
        subsections: [
          {
            title: 'Pan / Brush',
            paragraphs: [
              'Pan is the navigation mode for the canvas and is used to move across a zoomed image.',
              'Brush is used for freehand marking directly on the image, for example to highlight or annotate regions that may contain undertext.',
            ],
          },
          {
            title: 'Region of Interest',
            paragraphs: [
              'ROI stands for region of interest and defines a specific rectangular area as the main focus of inspection or analysis.',
              'The source notes that ROI is especially relevant for PCA, because the selected ROI is automatically applied when PCA or PCA-SVD is performed.',
            ],
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit05',
            'proteus-pan-brush.png',
            'Proteus Pan and Brush screenshot from the Lesson V source set.',
            'Proteus_Pan_Brush',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'proteus-roi.png',
            'Proteus ROI screenshot from the Lesson V source set.',
            'Proteus_ROI',
            'Local source image from Lesson V.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Pseudocolor',
        paragraphs: [
          'Pseudocolor converts grayscale image data into a false-color image by applying a JET colormap after the image has been normalized to an 8-bit grayscale input.',
          'The source explains that darker areas turn blue, mid-range areas green or yellow, and the brightest areas red, making intensity differences easier to inspect visually.',
          'Proteus offers All, Red, Green, Blue, and Merge Two Images under Pseudocolor so that the same image can be compared under different channel emphases.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit05',
            'pseudocolor-original-uv-365.png',
            'Original 365 UV image from the Lesson V source set.',
            'Pseudocolor_Original_UV_365',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'pseudocolor-all.png',
            'All-channel pseudocolor result from the Lesson V source set.',
            'Pseudocolor_Proteus_All',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'pseudocolor-red.png',
            'Red-channel pseudocolor result from the Lesson V source set.',
            'Pseudocolor_red',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'pseudocolor-green.png',
            'Green-channel pseudocolor result from the Lesson V source set.',
            'Pseudocolor_green',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'pseudocolor-blue.png',
            'Blue-channel pseudocolor result from the Lesson V source set.',
            'Pseudocolor_blue',
            'Local source image from Lesson V.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Merge Two Images',
        paragraphs: [
          'When Merge Two Images is selected, Proteus opens a Band Labels window asking for one label per selected image.',
          'The source example merges a 365 UV image and a 940 IR image by blending them 50/50 before pseudocolor is applied.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit05',
            'merge-two-pseudocolor-dialog.png',
            'Merge Two Images dialog from the Lesson V source set.',
            'Merge_two_pseudocolor_UI_dialog',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'merge-two-pseudocolor-result.png',
            'Merged pseudocolor result from the Lesson V source set.',
            'pseudocolor_mergetwo_result',
            'Local source image from Lesson V.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Sharpen / Binarize',
        paragraphs: [
          'Original applies unsharp masking, increasing local contrast around edges and fine structures.',
          'B/W Auto applies Otsu thresholding so that the threshold is chosen automatically from the gray-level histogram.',
          'B/W 128 applies a fixed threshold of 128, and B/W Custom allows the user to enter a threshold manually on a 0-255 scale.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit05',
            'bw-custom-window.png',
            'Custom threshold dialog from the Lesson V source set.',
            'BW_custom_window',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'bw-auto-result.png',
            'Automatic black-and-white result from the Lesson V source set.',
            'BW_auto_Result',
            'Local source image from Lesson V.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Enhancement',
        subsections: [
          {
            title: 'Power (Gamma)',
            paragraphs: [
              'Power applies a power-law transformation that changes tonal distribution. The dialog also includes an optional partial inversion setting and a pivot value.',
            ],
          },
          {
            title: 'Invert',
            paragraphs: [
              'Invert blends the image with its inverted version, so that the strength of inversion depends on the selected alpha value between 0 and 1.',
            ],
          },
          {
            title: 'Blur / Divide',
            paragraphs: [
              'Blur / Divide creates a Gaussian-blurred version of the image, divides the original by it, normalizes the result, and then applies histogram equalization.',
            ],
          },
          {
            title: 'Denoise',
            paragraphs: [
              'Denoise applies Gaussian smoothing with user-defined kernel size and sigma, reducing small-scale variation without the additional normalization steps used in Blur / Divide.',
            ],
          },
          {
            title: 'Rotate',
            paragraphs: [
              'Rotate changes only orientation, through Rotate left 90 degrees or Rotate right 90 degrees.',
            ],
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit05',
            'power-gamma-window.png',
            'Power dialog screenshot from the Lesson V source set.',
            'Power_Gamma_window',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'invert-window.png',
            'Invert dialog screenshot from the Lesson V source set.',
            'invert_window',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'blur-divide-window.png',
            'Blur / Divide dialog screenshot from the Lesson V source set.',
            'blur_divide_window',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'denoise-window.png',
            'Denoise dialog screenshot from the Lesson V source set.',
            'denoise_window',
            'Local source image from Lesson V.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'PCA and PCA-SVD',
        paragraphs: [
          'Proteus PCA operates on a selected set of grayscale MSI band images. At least three input images are required, at most sixteen are used, and all selected images must have the same dimensions.',
          'The implementation centers the image stack, computes principal components, and stores up to the first eight component images for display through Prev Band and Next Band.',
          'PCA-SVD follows the same input rules but performs singular value decomposition instead of eigen-decomposition of the covariance matrix.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit05',
            'pca-result.png',
            'PCA result screenshot from the Lesson V source set.',
            'PCA_result',
            'Local source image from Lesson V.',
          ),
          figure(
            'unit05',
            'pca-svd-result.png',
            'PCA-SVD result screenshot from the Lesson V source set.',
            'PCA_SVD_Result',
            'Local source image from Lesson V.',
          ),
        ],
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.digitripProteus,
          msiReferences.knoxHoku,
          msiReferences.leslie,
          msiReferences.plantcv,
          msiReferences.roepke,
        ],
      },
    ],
  },
  {
    number: 6,
    numeral: 'VI',
    slug: 'challenges-and-limitations',
    title: 'Challenges and Limitations',
    description: 'Hardware, imaging, material, processing, and expertise constraints around MSI workflows.',
    intro:
      'This lesson gathers the practical and technical limits of MSI, from equipment and capture constraints to software, expertise, and interpretation bottlenecks.',
    coverImage: image('unit06', 'sub-msi-lab-mlx3935.jpg'),
    coverImageAlt: 'MSI laboratory photograph from the local Lesson VI source images.',
    coverImageCaption:
      'MSI Team multispectral imaging with Dr. Alexander Zawacki at Archivio di Stato di Vercelli, pictures by Ashina Aleyna Yildiz.',
    sourceFiles: ['MSI Tutorial VI - Challenges and Limitations.docx'],
    blocks: [
      {
        type: 'section',
        title: 'Practical limits of the set-up',
        paragraphs: [
          'The lesson presents MSI as a significant technique for deciphering manuscripts and recovering undertext, but stresses that the material set-up is costly, bulky, and not equally suited to all types of objects.',
          'Large bound codices may need a special cradle, maps can require additional set-up, and the transmissive light sheet has a limited size that may not fit very large folios or thick bindings.',
          'As a result, parts of an object may fall outside the illuminated or captured region, which can require multiple scans to be stitched together afterward.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit06',
            'sub-msi-lab-mlx3935.jpg',
            'Laboratory MSI photograph from the local Lesson VI source images.',
            'MSI Team multispectral imaging with Dr. Alexander Zawacki at Archivio di Stato di Vercelli, pictures by Ashina Aleyna Yildiz.',
          ),
          figure(
            'unit06',
            'sub-msi-lab-mlx3893.jpg',
            'Laboratory MSI photograph from the local Lesson VI source images.',
            'Multispectral imaging and reviewing of post-processed images, Dr. Alexander Zawacki and Ashina Aleyna Yildiz at the RCANAlab at SUB Gottingen. Photographed by Martin Liebetruth.',
          ),
          figure(
            'unit06',
            'sub-msi-lab-mlx3905.jpg',
            'Laboratory MSI photograph from the local Lesson VI source images.',
            'Multispectral imaging and reviewing of post-processed images, Dr. Alexander Zawacki and Ashina Aleyna Yildiz at the RCANAlab (Advanced Recovery of Cultural Artefacts with Non-invasive Analytics) at SUB Gottingen. Photographed by Martin Liebetruth.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Spectral and material limitations',
        paragraphs: [
          'The source contrasts MSI with hyperspectral imaging, noting that MSI captures only a limited number of spectral bands, which can affect the final processing result.',
          'Hardware may require multiple configurations and filters, and bright broad-spectrum light sources can demand longer exposure times and raise temperature concerns for the artefact.',
          'The lesson also points to material variability as a challenge: parchment fluorescence, calcium content, and regional material differences can all change image quality or make interpretation more difficult.',
          'MSI is said to struggle with relief, texture, or drypoint markings because it does not capture a series of images from different illumination angles in the same way.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit06',
            'scanning-1.png',
            'Scanning image from the local Lesson VI source set.',
            'scanning1',
            'Local source image from Lesson VI.',
          ),
          figure(
            'unit06',
            'scanning-2.png',
            'Scanning image from the local Lesson VI source set.',
            'scanning2',
            'Local source image from Lesson VI.',
          ),
          figure(
            'unit06',
            'scanning-3.png',
            'Scanning image from the local Lesson VI source set.',
            'scanning3',
            'Local source image from Lesson VI.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Processing bottlenecks',
        paragraphs: [
          'The lesson identifies processing and post-processing as the main bottleneck, because recovering the maximum amount of text requires repeated reprocessing and substantial storage, RAM, CPU resources, and specialist software.',
          'ENVI is described as a costly proprietary option, while Hoku and similar tools can still present a steep learning curve for beginners.',
          'These constraints mean that MSI projects depend not only on equipment, but also on close collaboration between image scientists, palaeographers, and people with image-processing expertise.',
          'The source closes by stressing that enhanced MSI images can still be misinterpreted without enough knowledge of ink chemistry, degradation, and material response across wavelengths.',
        ],
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.bearman,
          msiReferences.jones,
          msiReferences.liang,
          msiReferences.mukhtar,
          msiReferences.zawackiCaseStudy,
        ],
      },
    ],
  },
  {
    number: 7,
    numeral: 'VII',
    slug: 'future-of-msi-applications-and-potential-advancements',
    title: 'Future of MSI Applications and Potential Advancements',
    description: 'Institutional uptake, more accessible tools, technical developments, and AI-assisted workflows.',
    intro:
      'The final unit looks ahead to expanding MSI adoption, lower-threshold tools, technical developments, and future AI- and deep-learning-assisted workflows.',
    coverImage: image('unit07', 'msi-hamburg.jpg'),
    coverImageAlt: 'Universitat Hamburg MSI system photograph from the local Lesson VII source images.',
    coverImageCaption: 'CSMC (Centre for the Study of Manuscript Cultures) MegaVision MSI system. Universitat Hamburg.',
    sourceFiles: ['MSI Tutorial VII - Future of MSI Applications and Potential Advancements .docx'],
    blocks: [
      {
        type: 'section',
        title: 'Growing institutional uptake',
        paragraphs: [
          'The lesson states that MSI research in cultural heritage is still comparatively limited and needs further investigation, but it also argues that universities, libraries, archives, and heritage institutions are increasingly adopting MSI as a viable non-invasive method.',
          'University of Gottingen, University of Hamburg, and University of Rochester are named as examples of institutions where MSI has become part of research and teaching infrastructure.',
          'As case studies accumulate and methodological standards mature, resistance rooted in object-safety concerns is described as gradually diminishing.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit07',
            'msi-hamburg.jpg',
            'Universitat Hamburg MSI system photograph from the local Lesson VII source images.',
            'CSMC (Centre for the Study of Manuscript Cultures) MegaVision MSI system. Universitat Hamburg.',
          ),
          figure(
            'unit07',
            'msi-goettingen-sub.jpg',
            'SUB Gottingen MSI system photograph from the local Lesson VII source images.',
            'Alex Zawacki at the ARCANALab, SUB Gottingen. PhaseOne MSI system. Photographed by Mona Kirsch.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'Lowering the threshold for use',
        paragraphs: [
          'Alongside broader institutional acceptance, the source also emphasizes efforts to lower the technical threshold for engaging with MSI data.',
          'Proteus is presented as a notable beginner-oriented example from the eManuSkript project at the University of Gottingen, designed to make multispectral data more accessible to users without extensive training in image science or spectral analysis.',
          'The lesson stresses that such tools do not replace advanced software for complex analyses, but they can broaden participation and support early-stage engagement with MSI.',
        ],
      },
      {
        type: 'section',
        title: 'Technical developments',
        paragraphs: [
          'The lesson argues that MSI is poised for growth through developments such as laser scanning, improvements in cameras, lighting, and filters, and tools for managing complex data more efficiently.',
          'It also points to the combination of MSI with 3D modelling or photogrammetry so that geometrical and spatial data can be aligned inside one coordinate system.',
          'These combinations are presented as a way to capture texture and other features that MSI alone does not document as well.',
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          figure(
            'unit07',
            'scanning-4.png',
            'Scanning image from the local Lesson VII source set.',
            'scanning4',
            'Local source image from Lesson VII.',
          ),
          figure(
            'unit07',
            'scanning-5.png',
            'Scanning image from the local Lesson VII source set.',
            'scanning5',
            'Local source image from Lesson VII.',
          ),
          figure(
            'unit07',
            'scanning-6.png',
            'Scanning image from the local Lesson VII source set.',
            'scanning6',
            'Local source image from Lesson VII.',
          ),
        ],
      },
      {
        type: 'section',
        title: 'AI, deep learning, and workflow standardization',
        paragraphs: [
          'The lesson proposes more standardized MSI workflows in both imaging and processing, potentially supported by artificial intelligence and deep learning.',
          'It cites examples from medicine and forestry in which MSI data and AI models support classification tasks, and suggests analogous uses in cultural heritage, such as distinguishing text from non-text or damaged from undamaged areas.',
          'At the same time, the source makes clear that such automation depends on expert training data and thorough validation.',
        ],
      },
      {
        type: 'references',
        title: 'References for this unit',
        items: [
          msiReferences.dkfz,
          msiReferences.esSebar,
          msiReferences.mathworks,
          msiReferences.mukhtar,
          msiReferences.zahra,
          msiReferences.csmcGuide,
        ],
      },
    ],
  },
]

export function getMsiPath(lessonSlug = '') {
  return lessonSlug ? `${routePaths.tutorialPages.msi}/${lessonSlug}` : routePaths.tutorialPages.msi
}

export function getMsiLesson(slug) {
  return msiLessons.find((lesson) => lesson.slug === slug)
}
