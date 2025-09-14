import { PortfolioData } from '../types/portfolio.types';

export const portfolioData: PortfolioData = {
  firstName: "Yasser",
  lastName: "Loukniti",
  fullName: "Yasser Loukniti",
  headline: "Développeur Full Stack TS",
  about: "Software Engineer passionné par le développement d'applications modernes et scalables. Expert en architectures microservices, avec une solide expérience en React, Next.js, NestJS et AWS.",
  location: "Paris, Île-de-France, France",
  profileImageUrl: "https://media.licdn.com/dms/image/v2/C4E03AQH5ow8IpPXT5A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1644834682919?e=1760572800&v=beta&t=I1HOX2554NW_UzLRJ2rsfaZMVN0pKJyieQUfvPKesCA",
  linkedinUrl: "https://www.linkedin.com/in/yasser-loukniti-b121a218a/",
  experiences: [
    {
      id: "1",
      company: "Weneeds",
      title: "Développeur Full Stack TS",
      dateRange: "Mars 2024 - Présent",
      location: "Paris, Île-de-France, France",
      description: "Conception et développement d'une plateforme de recrutement IA basée sur une architecture microservices. Développement de l'API NestJS, création du frontend Next.js avec React, intégration des endpoints IA pour matching d'emplois, orchestration d'infrastructure avec Docker et AWS EKS.",
      skills: ["NestJS", "React.js", "Next.js", "Django", "AWS", "Docker", "PostgreSQL", "Redis", "Elasticsearch"],
      companyLogo: "https://media.licdn.com/dms/image/v2/D4E0BAQHdMHOeVu-NBA/company-logo_400_400/company-logo_400_400/0/1736939989055/weneeds_logo?e=1760572800&v=beta&t=jaWI3GZ66jqW0QDjtvddZ7Uag8Q5xGv7ZUZWi2Z34AE",
      isCurrent: true
    },
    {
      id: "2",
      company: "Capgemini",
      title: "Software Engineer",
      dateRange: "Sep 2022 - Sep 2023",
      location: "Paris, Île-de-France, France",
      description: "Développement d'applications full-stack avec NestJS et React. Mise en place de tests unitaires avec Jest, gestion de bases de données PostgreSQL.",
      skills: ["NestJS", "Git", "Node.js", "React.js", "PostgreSQL", "Nx", "AWS", "Jest"],
      companyLogo: "https://media.licdn.com/dms/image/v2/D4D0BAQH-ZV832H4sdA/company-logo_200_200/company-logo_200_200/0/1705572256355/capgemini_logo?e=1760572800&v=beta&t=mJ6XcSEHYxEv3al3lFjVASL-TFZ5DPqT2qN4nGYRct8",
      isCurrent: false
    },
    {
      id: "3",
      company: "Capgemini",
      title: "Développeur Front End",
      dateRange: "Avr 2022 - Sep 2022",
      location: "Greater Paris Metropolitan Region",
      description: "Conception technique et développement Front-end avec Angular, React, VueJS. Utilisation de frameworks CSS modernes et outils de développement.",
      skills: ["Git", "React.js", "Node.js", "PostgreSQL"],
      companyLogo: "https://media.licdn.com/dms/image/v2/D4D0BAQH-ZV832H4sdA/company-logo_200_200/company-logo_200_200/0/1705572256355/capgemini_logo?e=1760572800&v=beta&t=mJ6XcSEHYxEv3al3lFjVASL-TFZ5DPqT2qN4nGYRct8",
      isCurrent: false
    },
    {
      id: "4",
      company: "42c",
      title: "Développeur React/NextJS",
      dateRange: "Fév 2022 - Mars 2022",
      location: "Paris, Île-de-France, France",
      description: "Développement de pages et composants en NextJS/React. Implémentation de fonctionnalités Python pour le matching CV/Offres.",
      skills: ["Git", "Node.js", "Next.js", "NestJS", "React.js", "Python"],
      companyLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQFu3Ur5HvYDWg/company-logo_200_200/company-logo_200_200/0/1630514651767/42consultinggroupe_logo?e=1760572800&v=beta&t=YEJLUj9lPoDydLTxC7aIisMcqt1MG6jQDHnGBg3fEiY",
      isCurrent: false
    },
    {
      id: "5",
      company: "Ingesoft C.A.",
      title: "Développeur applications web",
      dateRange: "Juil 2021 - Sep 2021",
      location: "Casablanca",
      description: "Développement d'une application web de suivi client avec Symfony 4.4. Création de modules de gestion et mise en place d'API REST.",
      skills: ["Symfony", "PHP", "API REST", "Excel"],
      isCurrent: false
    }
  ],
  educations: [
    {
      id: "1",
      school: "Éstiam",
      degree: "Master en informatique",
      fieldOfStudy: "Informatique",
      dateRange: "Oct 2021 - Sep 2023",
      activities: ""
    },
    {
      id: "2",
      school: "ESMA",
      degree: "Bac+3",
      fieldOfStudy: "Génie Informatique",
      dateRange: "2018 - 2021",
      activities: "Informatique (Web Dev, Desktop Programming, SGBDR, CCNA, Merise), Gestion des entreprises, Langues"
    },
    {
      id: "3",
      school: "ENDEV",
      degree: "Attestation De Réussite",
      fieldOfStudy: "Formation en développement",
      dateRange: "2019",
      activities: ""
    }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Cloud Practitioner",
      authority: "Amazon Web Services (AWS)",
      issued: "Sep 2023 · Expires Sep 2026",
      url: "https://www.credly.com/badges/9877ab09-4edc-4735-977f-d32961ff7256/linked_in_profile"
    }
  ],
  languages: [
    {
      name: "Français",
      proficiency: "Professionnel complet"
    },
    {
      name: "Anglais",
      proficiency: "Professionnel"
    },
    {
      name: "Arabe",
      proficiency: "Langue maternelle"
    }
  ],
  skills: [
    {
      category: "Frontend",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "jQuery", "HTML5", "CSS3", "Bootstrap", "Material UI", "Styled Components", "SASS"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "NestJS", "Express", "PHP", "Symfony", "Django", "Python", "API REST"]
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "TypeORM"]
    },
    {
      category: "DevOps & Cloud",
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "CI/CD", "GitHub Actions", "Terraform"]
    },
    {
      category: "Tools & Others",
      skills: ["Git", "Nx Monorepo", "Jest", "Cypress", "Webpack", "Figma", "Adobe XD", "Photoshop"]
    }
  ]
};