export const msiOverview = {
  eyebrow: 'Tutorials',
  title: 'Multispectral Imaging',
  lede:
    'A six-lesson pathway through multispectral imaging, from capture principles and equipment to Hoku workflows, Proteus, and future directions.',
  sourceFiles: [
    'Tutorials/3. MSI/MSI Tutorial I - Introduction_.docx',
    'Tutorials/3. MSI/MSI Tutorial II - MSI Equipment and Techniques for Manuscripts - Final Edition.docx',
    'Tutorials/3. MSI/MSI Tutorial III - Hoku [Beginner].docx',
    'Tutorials/3. MSI/MSI Tutorial IV - Hoku [Intermediate].docx',
    'Tutorials/3. MSI/MSI Tutorial V - Proteus [TBE as App develops].docx',
    'Tutorials/3. MSI/draft_tuto_5_6.docx',
  ],
  introduction: [
    'Multispectral imaging (MSI) is the technique of capturing and processing images in multiple visible and non-visible wavelengths of light across defined regions of the spectrum, ranging from ultraviolet through the visible to the near infrared.',
    'In contrast to conventional photography, which operates within the visible spectrum, MSI produces a sequence of images under controlled illuminated conditions. These datasets can be combined and post-processed to enhance otherwise illegible or hidden features.',
    'The course moves from foundational concepts into capture hardware, Hoku processing, Proteus workflows, and the broader practical limits and future opportunities of MSI in manuscript studies.',
  ],
  highlights: [
    'Understand how wavelength, lighting, capture, and calibration affect manuscript imaging.',
    'Learn the structure of Hoku workflows from simple enhancement to more advanced analysis tools.',
    'Connect the imaging lessons to Proteus and to broader questions of access, preservation, and research practice.',
  ],
}

export const msiLessons = [
  {
    number: 1,
    slug: 'introduction',
    title: 'Introduction to Multispectral Imaging',
    subtitle: 'Foundations and manuscript use cases',
    heroNote: 'Lesson I',
    sourceStatus: 'Draft content',
    sourceFiles: ['Tutorials/3. MSI/MSI Tutorial I - Introduction_.docx'],
    intro:
      'Multispectral imaging is the technique of capturing and processing images in multiple visible and non-visible wavelengths of light across defined regions of the spectrum.',
    sections: [
      {
        title: 'What MSI is',
        paragraphs: [
          'Multispectral imaging (MSI) is the technique of capturing and processing images in multiple visible and non-visible wavelengths of light across defined regions of the spectrum, ranging from the ultraviolet through the visible to the near infrared. By illuminating an object with different wavelengths, it generates an optical reaction, for example reflectance or absorption, to gather more data and information on an object by analyzing different image outcomes.',
          'MSI is non-invasive and therefore a perfect tool to work with fragile and unique objects, where sampling or invasive analysis would cause damage. The strength of MSI lies in the ability to differentiate materials due to their spectral behavior.',
        ],
      },
      {
        title: 'MSI and manuscript studies',
        paragraphs: [
          'Today MSI is used in many fields, not only palaeography, codicology, archaeology and art history but also in the natural sciences like medicine. In manuscript studies it is used especially to recover texts and images that have been materially obscured by damage.',
          'Deciphering, analyzing and researching manuscripts and scripts are vital for palaeography and are dependent on the legibility of the source material. If the manuscript shows hints of time and historical use, making it problematic to read, a solution could be MSI.',
        ],
      },
      {
        title: 'Imaging and material response',
        paragraphs: [
          'As different manuscript materials, for example ink, parchment, paper, papyrus, color, paint, glue, chemicals, or dirt, are prone to different reactions to light because of their varying compositions and because of chemical changes over time, MSI can help to distinguish and highlight the different-reacting materials to define and delimit them.',
          'During multispectral imaging an object is illuminated by different external light sources in a darkened room that change picture by picture. The object gets exposed to wavelengths of roughly 300-900 nm and photographed with great attention to ultraviolet and infrared light, which distinguishes MSI from other techniques and cameras.',
        ],
      },
    ],
    figures: [
      {
        image: '/images/msi/365_baader.png',
        alt: 'A converted manuscript image from the local MSI tutorial image set.',
        caption: '365_baader image from the local MSI asset set',
        detail: 'Integrated from the provided TIFF source as a web-safe derivative.',
      },
    ],
  },
  {
    number: 2,
    slug: 'equipment-and-capture',
    title: 'Equipment and Capture Techniques',
    subtitle: 'Hardware, lighting, filters, and workflow',
    heroNote: 'Lesson II',
    sourceStatus: 'Finished public content',
    sourceFiles: ['Tutorials/3. MSI/MSI Tutorial II - MSI Equipment and Techniques for Manuscripts - Final Edition.docx'],
    intro:
      'This lesson documents the Phase One - Rainbow MSI System used in Gottingen and explains the equipment, light control, filters, calibration, and Rainbow workflow.',
    sections: [
      {
        title: 'Phase One - Rainbow MSI System',
        paragraphs: [
          'In this tutorial, we will be talking about the Phase One - Rainbow MSI System that we use in Gottingen. Rainbow software is designed to provide easy access to the set-up and capture of multispectral image stacks.',
          'The set-up is simple. It consists of two banks of LED lights, a camera, and a filter wheel. At Gottingen, we use a system designed and built by Phase One and operated by their Rainbow MSI software. This has the advantage of being portable, so that we can bring the system to the repository sites of manuscripts.',
        ],
      },
      {
        title: 'Camera, lens, and light control',
        paragraphs: [
          'The Phase One iXH 150MP and iXG 100MP cameras are designed for multispectral imaging and high-quality digitization. Both cameras use high-resolution CMOS sensors that capture fine details, and an advanced focusing system that maintains colour accuracy across different wavelengths of light, allowing for consistent and repeatable results.',
          'In multispectral imaging, light control is just as important as the camera itself. The Rainbow MSI system supports multiband and narrowband LED light sources, each designed for different imaging goals.',
          'The position and angle of your light sources are critical for achieving even illumination and avoiding glare. Both LED lights should be set at a 45-degree angle from the object surface, at a distance of 1 to 2 meters.',
        ],
      },
      {
        title: 'Filters, calibration, and Rainbow workflow',
        paragraphs: [
          'Ultraviolet imaging concentrates on a short-wave range of roughly 320-380 nm and is particularly effective in documenting mechanical surface damage, erased ink, pigments, and application, though its shallow penetration restricts its usefulness beneath the top layer.',
          'Visible light forms the reference dataset for MSI, while infrared imaging typically operates from 780 nm upward and can penetrate deeper into material, making it useful for palimpsests, water damage, ink corrosion, fading, and bleed-through reduction.',
          'The Rainbow software controls the entire imaging process through the workflow tabs Project, Recipe, Calibrate, Capture, and Browse. Calibration maintains consistency of lighting, focus, and exposure across all wavelengths and must be repeated whenever the physical set-up changes.',
        ],
      },
    ],
    figures: [
      {
        image: '/images/msi/TX_735.png',
        alt: 'A converted manuscript image from the second locally supplied MSI TIFF.',
        caption: 'TX_735 image from the local MSI asset set',
        detail: 'Used as a representative capture example from the supplied TIFF files.',
      },
    ],
  },
  {
    number: 3,
    slug: 'hoku-beginner',
    title: 'Hoku Beginner',
    subtitle: 'Core modules and first processing recipes',
    heroNote: 'Lesson III',
    sourceStatus: 'Draft content',
    sourceFiles: ['Tutorials/3. MSI/MSI Tutorial III - Hoku [Beginner].docx'],
    intro:
      'This lesson introduces Hoku as a post-processing application developed by RIT for images scanned under multispectral light.',
    sections: [
      {
        title: 'Creating and executing a job',
        paragraphs: [
          'The lesson begins by showing how to construct a job: drag modules to the desktop, connect them, draw around the connected task to turn the recipe into a star, and then execute it from the contextual menu.',
          'Each module is unique, so the recipe for each job will be different even when the first example is deliberately simple.',
        ],
      },
      {
        title: 'ReadImage, Show, and WriteImage',
        paragraphs: [
          'The ReadImage module is described as the basic first step in any workflow because it loads an image file into Hoku so processing can begin. The source lists TIFF, ENVI, PNG, BMP, JPEG, and text among the supported formats and explains windowing, calibration, multipage TIFF handling, and band selection.',
          'WriteImage saves processed output to disk and supports TIFF, ENVI, JPEG, PNG, BMP, and text. TIFF is the preferred archival format, ENVI is useful for scientific work, and JPEG is best reserved for display because it uses lossy compression.',
        ],
      },
      {
        title: 'Enhancement and modification modules',
        paragraphs: [
          'Pack adjusts the contrast of the input image and converts it into 8-bit unsigned integers. Stretch spreads pixel values between chosen minima and maxima, while blur and sharpen do exactly what their names suggest.',
          'The lesson also introduces Invert, Append, Crop, Rotate, and ReadStack. ReadStack follows the same logic as ReadImage, but instead of loading a single file it combines multiple images into one multi-band image.',
        ],
      },
    ],
  },
  {
    number: 4,
    slug: 'hoku-intermediate',
    title: 'Hoku Intermediate',
    subtitle: 'Advanced enhancement and analysis tools',
    heroNote: 'Lesson IV',
    sourceStatus: 'Draft content',
    sourceFiles: ['Tutorials/3. MSI/MSI Tutorial IV - Hoku [Intermediate].docx'],
    intro:
      'This lesson moves on to more advanced Hoku features, especially ICA, PCA, SAM, and ImageMath.',
    sections: [
      {
        title: 'ICA and PCA',
        paragraphs: [
          'ICA works differently from PCA. Instead of looking for variance, ICA looks for statistical differences between the spectral bands and tries to separate the data into sets that are statistically independent from each other. It is especially useful when the text to be revealed is extremely faint.',
          'PCA helps find patterns in the image by looking at where the biggest changes occur across all the spectral bands. The source explains that faint, erased, or damaged text often appears in higher-order PCA bands, while the first bands carry the highest variance.',
        ],
      },
      {
        title: 'SAM',
        paragraphs: [
          'SAM, or Spectral Angle Mapping, measures the similarity present in two images where one operates as a reference. It compares how each pixel spectrum points in space relative to the reference image.',
          'SAM is useful for revealing scraped script, ink, erasures, or palimpsests by comparing spectral responses across a selected region of interest.',
        ],
      },
      {
        title: 'ImageMath',
        paragraphs: [
          'ImageMath performs a mathematical operation between two images, pixel by pixel. It can support background-noise reduction, illumination balancing, and subtle-contrast enhancement in multispectral data.',
          'The source lists add, sub, mul, div, max, min, mod, and atan2 as the available operations and notes that atan2 is especially useful when working with low-contrast details such as fading ink traces.',
        ],
      },
    ],
  },
  {
    number: 5,
    slug: 'proteus',
    title: 'Proteus',
    subtitle: 'Processing workflows and app bridge',
    heroNote: 'Lesson V',
    sourceStatus: 'Draft content',
    sourceFiles: ['Tutorials/3. MSI/MSI Tutorial V - Proteus [TBE as App develops].docx'],
    intro:
      'This lesson introduces Proteus within the MSI workflow and points to the dedicated app page for software-specific information.',
    bridgeToApp: true,
    sections: [
      {
        title: 'PCA in Proteus',
        paragraphs: [
          'With Proteus, PCA performs dimensionality reduction on a set of images so that the most significant features, or principal components, stand out. This aims at pulling out spectral differences in the manuscript that cannot be seen in normal light.',
          'Proteus begins by loading several grayscale images, stacking them into a matrix, subtracting the mean image, and then applying singular value decomposition. The top components retain the most meaningful information while discarding the rest.',
        ],
      },
      {
        title: 'Sharpen and Pseudocolor',
        paragraphs: [
          'Sharpen works on a single pseudocolor image by taking the difference between the red and blue separations of the input image. The result is a grayscale output intended to reduce the visibility of overtext and highlight what lies beneath.',
          'Pseudocolor loads two grayscale images, one UV and one IR, blends them evenly, and then applies the JET color map so that intensity differences become easier to see.',
        ],
      },
      {
        title: 'Noise reduction and local contrast tools',
        paragraphs: [
          'Noise Reduction uses a Gaussian blur to smooth the image and reduce graininess or small pixel-level variation. Repeated application will eventually blur detail.',
          'Blur and Divide enhances local contrast by comparing the image to a blurred version of itself, while Invert reverses brightness relationships and lets the user control the strength of inversion through an alpha value.',
        ],
      },
    ],
  },
  {
    number: 6,
    slug: 'challenges-and-future',
    title: 'Challenges and Future Directions',
    subtitle: 'Limits, adoption, and emerging methods',
    heroNote: 'Lesson VI',
    sourceStatus: 'Draft content',
    sourceFiles: ['Tutorials/3. MSI/draft_tuto_5_6.docx'],
    intro:
      'The final MSI route considers both the current limits of multispectral work and the directions in which the field is moving.',
    sections: [
      {
        title: 'Challenges and limitations',
        paragraphs: [
          'MSI is significant for deciphering manuscripts and recovering undertext, but it also presents practical and technical challenges. The set-up is costly and bulky, can be difficult to adapt to all object types, and often needs extra intervention for large bound codices, maps, and heavily damaged material.',
          'The processing phase is described as a major bottleneck. It requires storage, RAM, CPU power, specific software, and human expertise, while post-processing workflows often lack standardization and demand close collaboration between image scientists, palaeographers, and technical specialists.',
        ],
      },
      {
        title: 'Future directions',
        paragraphs: [
          'The future section argues that MSI in cultural heritage still needs further investigation, but that institutional uptake is growing and that more libraries, archives, and heritage institutions are beginning to recognize it as a viable non-invasive method.',
          'Future progress is linked to easier software such as Proteus, stronger training, advances in cameras, lighting, filters, and the integration of MSI with 3D modelling, photogrammetry, artificial intelligence, and deep learning for tasks such as text versus non-text detection or automatic damage segmentation.',
        ],
      },
    ],
  },
]

export function getMsiLesson(slug) {
  return msiLessons.find((lesson) => lesson.slug === slug)
}
