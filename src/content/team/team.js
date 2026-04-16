const annaPersonnelUrl = 'https://www.uni-goettingen.de/en/675451.html'
const jeremyPersonnelUrl = 'https://www.uni-goettingen.de/en/dr.%2Bjeremy%2Bthompson/688808.html'
const mohamedPersonnelUrl = 'https://www.uni-goettingen.de/en/mohamed+basuony/688963.html'

export const teamContent = {
  eyebrow: 'Team',
  title: 'About the Team',
  lede: 'Project leaders, core collaborators, and further acknowledgements for eManuSkript.',
  intro: {
    id: 'about-team',
    title: 'About the Team',
    paragraphs: [
      'This page presents the project leaders, the core team, and further acknowledgements for eManuSkript.',
    ],
  },
  sections: [
    {
      id: 'project-leaders',
      title: 'Project Leaders',
      members: [
        {
          id: 'anna-dorofeeva',
          name: 'Dr. Anna Dorofeeva',
          title: 'Principal Investigator',
          description: 'Principal Investigator',
          photo: '/images/team/anna.png',
          photoAlt: 'Portrait of Dr. Anna Dorofeeva',
          links: [
            {
              label: 'Personnel page',
              href: annaPersonnelUrl,
            },
          ],
        },
        {
          id: 'jeremy-thompson',
          name: 'Dr. Jeremy Thompson',
          title: 'Project Coordinator',
          description: 'Project Coordinator',
          photo: '/images/team/jeremy.jpg',
          photoAlt: 'Portrait of Dr. Jeremy Thompson',
          links: [
            {
              label: 'Personnel page',
              href: jeremyPersonnelUrl,
            },
          ],
        },
        {
          id: 'mohamed-basuony',
          name: 'Mohamed Basuony',
          title: 'Software Engineer',
          description: 'Software Engineer',
          photo: '/images/team/mo.jpg',
          photoAlt: 'Portrait of Mohamed Basuony',
          photoMirror: true,
          links: [
            {
              label: 'Personnel page',
              href: mohamedPersonnelUrl,
            },
          ],
        },
        {
          id: 'sergio-gonzalez-orjuela',
          name: 'Sergio Gonzalez Orjuela',
          title: 'Software Engineer',
          description: 'Software Engineer',
          photo: '/images/team/sergio.jpg',
          photoAlt: 'Portrait of Sergio Gonzalez Orjuela',
          links: [],
        },
      ],
    },
    {
      id: 'core-team',
      title: 'Core Team',
      intro:
        'The core team collaborated at every step of the project’s development, from brainstorming, to concept development, execution, testing and finally feedback. Each member also focused on particular aspects of the project:',
      members: [
        {
          id: 'asina-aleyna-yildiz',
          name: 'Aşina Aleyna Yıldız',
          description:
            'General project coordination, multispectral imaging tutorial, Mergen (layout annotation and data organization), Fenius, script tutorial & model alphabets, scientific outreach and publicity, blog, Proteus (development)',
          photo: '/images/team/aleyna-ashina.jpg',
          photoAlt: 'Portrait of Aşina Aleyna Yıldız',
          photoMirror: true,
          links: [],
        },
        {
          id: 'nuray-haskilic',
          name: 'Nuray Haskilic',
          description:
            'Mergen (layout annotation), multispectral imaging tutorial, digital palaeography tutorial, Proteus (concept development), Fenius (concept development), script tutorial (research), bibliography, scientific outreach and publicity',
          photo: '/images/team/nuray.jpg',
          photoAlt: 'Portrait of Nuray Haskilic',
          links: [],
        },
        {
          id: 'yiyang-huang',
          name: 'Yiyang Huang',
          description: 'Proteus, digital palaeography tutorial, scientific outreach',
          photo: '/images/team/yiyang.jpg',
          photoAlt: 'Portrait of Yiyang Huang',
          links: [],
        },
        {
          id: 'peter-evans',
          name: 'Peter Evans',
          description: 'Script tutorial (research), digital palaeography tutorial, Mergen (layout annotation), bibliography',
          photo: '/images/team/peter.jpg',
          photoAlt: 'Portrait of Peter Evans',
          links: [],
        },
        {
          id: 'hasan-aldhahi',
          name: 'Hasan Aldhahi',
          description: 'Mergen (technical development and deployment)',
          photo: null,
          links: [],
        },
        {
          id: 'emna-bahri',
          name: 'Emna Bahri',
          description: 'Multispectral imaging tutorial (MSI), MSI scanning & providing images and permissions, Proteus (development)',
          photo: null,
          links: [],
        },
        {
          id: 'zhiling-dong',
          name: 'Zhiling Dong',
          description: 'Publicity, outreach, blog',
          photo: '/images/team/zhiling.jpg',
          photoAlt: 'Portrait of Zhiling Dong',
          links: [],
        },
        {
          id: 'luise-heise',
          name: 'Luise Heise',
          description: 'Fenius, bookbinding research, Mergen (layout annotation)',
          photo: '/images/team/luise.jpg',
          photoAlt: 'Portrait of Luise Heise',
          links: [],
        },
        {
          id: 'annika-meyn',
          name: 'Annika Meyn',
          description: 'Historical research, bookbinding research, Mergen (layout annotation)',
          photo: null,
          links: [],
        },
        {
          id: 'arianna-pastorini',
          name: 'Arianna Pastorini',
          description: 'Script tutorial, scientific outreach',
          photo: '/images/team/arianna.jpg',
          photoAlt: 'Portrait of Arianna Pastorini',
          links: [],
        },
        {
          id: 'batu-yemenici',
          name: 'Batu Yemenici',
          description: 'Script tutorial, historical research, Mergen (layout annotation)',
          photo: null,
          links: [],
        },
      ],
    },
    {
      id: 'further-acknowledgements',
      title: 'Further Acknowledgements',
      intro: 'We also gratefully acknowledge the contributions of the following individuals:',
      members: [
        {
          id: 'abs',
          name: 'ABS - Alternative Bold Solutions UG',
          description: 'Technical refinements on apps',
          photo: '/images/team/abs.png',
          photoAlt: 'Logo of ABS - Alternative Bold Solutions UG',
          photoContain: true,
          links: [],
        },
        {
          id: 'natalia-brockey',
          name: 'Natalia Brockey',
          description: 'Bookbinding and scriptorium illustrations',
          photo: '/images/team/natalia-brockey.png',
          photoAlt: 'Natalia Illustration logo',
          photoContain: true,
          links: [],
        },
        {
          id: 'mona-kirsch',
          name: 'Dr. Mona Kirsch (SUB)',
          description: 'Image permissions and structural support',
          photo: null,
          links: [],
        },
        {
          id: 'mathis-laute',
          name: 'Mathis Laute',
          description: 'Preliminary development of pricking and ruling app',
          photo: null,
          links: [],
        },
        {
          id: 'narges-pourmohammadian-roudsari',
          name: 'Narges Pourmohammadian Roudsari',
          description: 'Codicology and bookbinding tutorial (Islamic codices)',
          photo: null,
          links: [],
        },
        {
          id: 'cornelia-ripplinger',
          name: 'Cornelia Ripplinger (SUB)',
          description: 'Consultation on bookbinding apps',
          photo: null,
          links: [],
        },
        {
          id: 'alexander-zawacki',
          name: 'Dr. Alexander Zawacki (SUB)',
          description: 'Consultation on MSI and imaging',
          photo: null,
          links: [],
        },
      ],
    },
  ],
}
