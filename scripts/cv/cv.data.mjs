// Contenu des CV (une page) : une base commune et deux variantes (Full Stack TypeScript / Python & IA)

const contacts = [
  { icon: 'mail', label: 'yass_official@outlook.fr', href: 'mailto:yass_official@outlook.fr' },
  { icon: 'phone', label: '+33 7 49 55 33 92', href: 'tel:+33749553392' },
  { icon: 'pin', label: 'Paris' },
  { icon: 'linkedin', label: 'linkedin.com/in/yasser-loukniti', href: 'https://www.linkedin.com/in/yasser-loukniti-b121a218a/' },
  { icon: 'github', label: 'github.com/yasserloukniti', href: 'https://github.com/yasserloukniti' },
  { icon: 'globe', label: 'yasserloukniti.com', href: 'https://yasserloukniti.com' },
];

const portfolioPitch = 'Sur mon portfolio, une IA répond en direct à vos questions sur mon parcours.';

const languages = [
  { name: 'Français', level: 'Courant' },
  { name: 'Anglais', level: 'Professionnel' },
  { name: 'Arabe', level: 'Natif' },
];

const education = [
  { degree: 'Master en Informatique', school: 'ÉSTIAM Paris', years: '2021 - 2023' },
  { degree: 'Licence Génie Informatique', school: 'ESMA Marrakech', years: '2018 - 2021' },
];

const certifications = [
  { name: 'AWS Certified Cloud Practitioner', authority: 'Amazon Web Services', years: '2023 - 2026' },
];

// --- Expériences ---

const waystosucceed = {
  title: 'Co-fondateur',
  company: 'WaysToSucceed',
  location: 'Remote',
  date: 'Août 2026 - Présent',
  logo: 'images/companies/waystosucceed.png',
  lead: 'Tutorat entre enfants sur Zoom avec un tuteur IA pour réviser. Lancé au Canada, en France et au Maroc.',
  bullets: [],
  tags: ['Next.js', 'TypeScript', 'IA / LLM'],
};

const weneedsBase = {
  title: 'Développeur Full Stack',
  company: 'Weneeds',
  location: 'Paris',
  date: 'Mars 2024 - Juil 2026',
  logo: 'images/companies/weneeds.jpg',
  lead: 'Plateforme de recrutement IA (SaaS) en microservices, monorepo Nx.',
};

const weneedsFullStack = {
  ...weneedsBase,
  bullets: [
    'BACKEND (NestJS - 40+ modules) : API Gateway, auth JWT/OAuth/RBAC, paiements Stripe, multi-databases.',
    'EVENT-DRIVEN : Orchestration des microservices via Kafka, WebSockets Socket.IO.',
    'FRONTEND : Web app Next.js et dashboard admin React (40+ pages), Redux Toolkit, React Query.',
    'MICROSERVICES : Mail (AWS SES), notifications (FCM), transcoding vidéo (AWS EC2).',
    'IA & PYTHON : 10+ services FastAPI / LangChain / LangGraph (matching, parsing CV, scoring).',
    'RAG : Embeddings dans Weaviate, recherche hybride Weaviate + Elasticsearch, streaming LLM.',
  ],
  tags: ['NestJS', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Weaviate', 'Kafka', 'AWS EKS'],
};

const weneedsPython = {
  ...weneedsBase,
  bullets: [
    'IA & PYTHON : 10+ microservices FastAPI (matching candidats/offres, parsing CV, scoring).',
    'AGENTS : Orchestration multi-agents LangChain / LangGraph, intégration OpenAI.',
    "RAG : Génération d'embeddings, indexation dans Weaviate et récupération de contexte pour les LLM.",
    'RECHERCHE HYBRIDE : Sémantique (Weaviate) + lexicale (Elasticsearch), scoring multi-dimensionnel.',
    'STREAMING : Réponses LLM en temps réel via WebSocket jusqu’au front Next.js.',
    'PLATEFORME : Backend NestJS (40+ modules), event-driven Kafka, déploiement AWS EKS / Terraform.',
  ],
  tags: ['Python', 'FastAPI', 'LangGraph', 'Weaviate', 'RAG', 'Elasticsearch', 'Kafka', 'AWS EKS'],
};

const capgemini = {
  title: 'Développeur Full Stack',
  company: 'Capgemini',
  location: 'Paris',
  date: 'Avr 2022 - Sep 2023',
  logo: 'images/companies/capgemini.jpg',
  lead: 'Applications critiques pour grands comptes (1 an 6 mois).',
  bullets: [
    'PROJET MENTORING : Backend Node.js/Express/PostgreSQL pour le matching juniors/seniors.',
    'MIGRATION : Refonte d’une plateforme legacy Java vers NestJS (microservices) et React vers TypeScript.',
    'QUALITÉ : Couverture de tests E2E de 0% à 80% (Jest). Scrum, code reviews, documentation.',
  ],
  tags: ['NestJS', 'React', 'Node.js', 'PostgreSQL', 'Jest'],
};

const consulting42 = (pythonFirst) => ({
  title: 'Développeur Full Stack (Stage)',
  company: '42 Consulting',
  location: 'Paris',
  date: 'Fév 2022 - Mar 2022',
  logo: 'images/companies/42consulting.jpg',
  lead: pythonFirst
    ? 'Algorithme de matching CV/offres en Python, pages et composants Next.js.'
    : 'Pages et composants Next.js, algorithme de matching CV/offres en Python.',
  bullets: [],
  tags: pythonFirst ? ['Python', 'Next.js', 'AWS'] : ['Next.js', 'Python', 'AWS'],
});

const freelance = {
  title: 'Développeur Web Freelance',
  company: 'Maroc',
  location: 'Remote',
  date: '2019 - 2021',
  logoText: 'Free-lance',
  lead: 'Missions variées en développement web et applicatif.',
  bullets: [
    'INGESOFT (2021) : CRM complet (clients, facturation) sous Symfony 4.4.',
    'OTIS MAROC (2021) : Intranet, gestion documentaire (Symfony).',
    'SOUK AT-TANMIA / DIGITAL FÈS-MEKNÈS (2020) : Plateforme de financement PME, portail régional.',
  ],
  tags: ['Symfony', 'PHP', 'MySQL', 'Bootstrap'],
};

// --- Projets ---

const projects = {
  indeed: { name: 'Indeed Bulk Resumes Downloader', logoKind: 'github', url: 'https://github.com/YasserLoukniti/indeedBulkResumesDownloader', linkLabel: 'GitHub · 17 ★' },
  alienmcp: { name: 'AlienMcp', logo: 'projects/personal/alienmcp.jpg', url: 'https://www.alien-mcp.com' },
  jobhunter: { name: 'Job Hunter', logoKind: 'dot', url: 'https://jobhunterapp.fr' },
  portfolio: { name: 'Portfolio IA', logo: 'logo.svg', url: 'https://yasserloukniti.com' },
};

const common = { languages, education, certifications };

export const variants = [
  {
    id: 'cv-fullstack',
    output: 'yasserLoukniti.pdf',
    ...common,
    profile: {
      name: 'Yasser Loukniti',
      title: 'Développeur Full Stack TypeScript & Python',
      summary: `Microservices <b>NestJS / Kafka</b>, produits IA en <b>Python</b> (FastAPI, LangChain, RAG) et frontends <b>Next.js</b>. ${portfolioPitch}`,
      contacts,
    },
    skills: [
      { label: 'Backend & Data', items: ['NestJS', 'Node.js', 'Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'REST / GraphQL'] },
      { label: 'Python & IA', items: ['Python', 'FastAPI', 'Django', 'LangChain', 'LangGraph', 'RAG', 'Weaviate', 'OpenAI / Anthropic'] },
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'React Query', 'Tailwind'] },
      { label: 'DevOps & Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
    ],
    experiences: [waystosucceed, weneedsFullStack, capgemini, consulting42(false), freelance],
    projects: [projects.alienmcp, projects.jobhunter, projects.indeed, projects.portfolio],
  },
  {
    id: 'cv-python',
    output: 'yasserLoukniti-python.pdf',
    ...common,
    profile: {
      name: 'Yasser Loukniti',
      title: 'Développeur Python & IA',
      summary: `Microservices <b>FastAPI</b>, agents <b>LangChain / LangGraph</b>, pipelines <b>RAG</b> avec Weaviate, et un bagage full stack (NestJS, Next.js, AWS). ${portfolioPitch}`,
      contacts,
    },
    skills: [
      { label: 'Python & IA', items: ['Python', 'FastAPI', 'Django', 'LangChain', 'LangGraph', 'RAG', 'Weaviate', 'OpenAI / Anthropic', 'Selenium', 'MCP'] },
      { label: 'Backend & Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Kafka', 'NestJS / Node.js'] },
      { label: 'DevOps & Cloud', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
    ],
    experiences: [waystosucceed, weneedsPython, capgemini, consulting42(true), freelance],
    projects: [projects.indeed, projects.alienmcp, projects.jobhunter, projects.portfolio],
  },
];
