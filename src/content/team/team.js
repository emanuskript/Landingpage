const memberPlaceholder = 'Responsibility summary pending from the team.'

export const teamContent = {
  eyebrow: 'Team',
  title: 'Project team',
  lede:
    'Structured team entries are in place for photos, optional profile links, and short descriptions of project work or special responsibilities.',
  groups: [
    {
      id: 'project-leaders',
      label: 'Project Leaders',
      members: [
        {
          name: 'Dr. Anna Dorofeeva',
          photo: null,
          profileUrl: null,
          profileUrlTodo: 'Add Anna’s university profile URL here.',
          summary: null,
          placeholder: memberPlaceholder,
        },
        {
          name: 'Dr. Jeremy Thompson',
          photo: null,
          summary: null,
          placeholder: memberPlaceholder,
        },
        {
          name: 'Mohamed Basuony',
          photo: null,
          summary: null,
          placeholder: memberPlaceholder,
        },
        {
          name: 'Sergio Gonzalez Orjuela',
          photo: null,
          summary: null,
          placeholder: memberPlaceholder,
        },
      ],
    },
    {
      id: 'core-team',
      label: 'Core Team',
      members: [
        { name: 'Hasan Aldhahi', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Emna Bahri', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Zhiling Dong', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Peter Evans', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Nuray Haskilic', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Yiyang Huang', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Luise Heise', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Annika Meyn', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Arianna Pastorini', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Batu Yemenici', photo: null, summary: null, placeholder: memberPlaceholder },
        { name: 'Ashina Aleyna Yildiz', photo: null, summary: null, placeholder: memberPlaceholder },
      ],
    },
    {
      id: 'further-acknowledgments',
      label: 'Further Acknowledgments',
      members: [
        {
          name: 'Mathis Laute',
          photo: null,
          summary: 'Preliminary development and concept for the ruling and pricking app.',
        },
        {
          name: 'Dr. Alexander Zawacki',
          photo: null,
          summary: 'Consultation about MSI and imaging.',
        },
        {
          name: 'Developers and their company',
          photo: null,
          summary: null,
          placeholder: 'Add final development credits and company details.',
        },
      ],
    },
  ],
}
