// Data pribadi & tautan. Sumber: CV v4 (Documents/Almadhani Doc) + README profil.
export const profile = {
  name: 'Firman Almadhani Kurniawan',
  shortName: 'Almadhani',
  title: 'Senior Fullstack & AI Engineer',
  titleAccent: 'Tech Lead',
  location: 'Jakarta, Indonesia',
  timezone: 'UTC+7 (WIB)',
  availability: 'Open to remote work',
  email: 'almadhanif17@gmail.com',
  linkedin: 'https://www.linkedin.com/in/firman-almadhani-kurniawan',
  github: 'https://github.com/almadhanif',
  solvara: 'https://solvara-tech.com',
  cvPath: '/Firman_Almadhani_Kurniawan_CV.pdf',
  photo: '/img/almadhani.webp',
  lead:
    'Production AI for enterprise clients in the US, UK, Singapore and Indonesia — plus five live SaaS products I run at Solvara.',
  summary: [
    'Tech Lead and Senior Fullstack Engineer with 3+ years building production AI systems. I own features from technical spike through privacy review, build, and post-deploy validation — most recently an AI editing assistant on Vertex AI, with the production model chosen through a 315-call evaluation harness.',
    'Core strengths are RAG pipelines and LLM integration, microservice architecture, and making systems fast under real load. I work in English across US and European time zones and act as release gatekeeper for my teams.',
    'Outside client work I founded Solvara, where I design, build and operate five live SaaS products and the infrastructure behind them on a single server.',
  ],
  roles: [
    { label: 'Team Lead · Openloop Health', cc: 'US' },
    { label: 'Senior Fullstack · Quill Learn', cc: 'SG' },
    { label: 'Founder · Solvara', cc: 'ID' },
  ],
  stats: [
    { value: '5', label: 'live SaaS products' },
    { value: '4', label: 'countries shipped to' },
    { value: '75%', label: 'faster deployments' },
    { value: '8,300+', label: 'LMS users served' },
  ],
  languages: 'English: professional working proficiency (C1) · Indonesian: native',
  education: {
    degree: 'Bachelor of Informatics',
    school: 'AMIKOM Yogyakarta University',
    detail: 'GPA 3.78 / 4.00 · Graduated Feb 2024',
  },
} as const;
