import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Folder, Star } from 'lucide-react';

const ProjectsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${({ theme }) => theme.transitions.slow};
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.1);
  }
`;

const ProjectImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  opacity: 0;
  transition: ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectLink = styled.a`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.normal};
  transform: translateY(20px);

  ${ProjectCard}:hover & {
    transform: translateY(0);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    transform: scale(1.1) translateY(0);
  }
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProjectIcon = styled.div`
  width: 45px;
  height: 45px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

const ProjectTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProjectStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectLinkIcon = styled.a`
  color: ${({ theme }) => theme.colors.textMuted};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  z-index: 1;
`;

export const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      id: 1,
      title: 'Plateforme de Recrutement IA',
      description: 'Solution SaaS complète pour le matching intelligent entre candidats et offres d\'emploi utilisant l\'IA et le machine learning.',
      image: '/projects/recruitment-ai.jpg',
      technologies: ['NestJS', 'React', 'Next.js', 'Django', 'AWS', 'PostgreSQL'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
      status: 'En production',
    },
    {
      id: 2,
      title: 'E-commerce Multi-vendor',
      description: 'Marketplace permettant à plusieurs vendeurs de gérer leurs boutiques avec système de paiement intégré et gestion des livraisons.',
      image: '/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false,
      status: 'En développement',
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Tableau de bord temps réel pour visualisation de données complexes avec graphiques interactifs et rapports automatisés.',
      image: '/projects/dashboard.jpg',
      technologies: ['Next.js', 'TypeScript', 'D3.js', 'Redis', 'WebSocket'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
      status: 'En production',
    },
    {
      id: 4,
      title: 'API Gateway Microservices',
      description: 'Architecture microservices avec API Gateway pour orchestration de services distribués et gestion centralisée.',
      image: '/projects/microservices.jpg',
      technologies: ['NestJS', 'Kubernetes', 'RabbitMQ', 'Redis', 'Prometheus'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false,
      status: 'En production',
    },
    {
      id: 5,
      title: 'Application Mobile Banking',
      description: 'Application bancaire sécurisée avec authentification biométrique et gestion de transactions en temps réel.',
      image: '/projects/banking.jpg',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Socket.io'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true,
      status: 'En production',
    },
    {
      id: 6,
      title: 'CMS Headless',
      description: 'Système de gestion de contenu découplé avec API REST/GraphQL pour diffusion multi-canal.',
      image: '/projects/cms.jpg',
      technologies: ['Strapi', 'GraphQL', 'React', 'AWS S3', 'CDN'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false,
      status: 'Open Source',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Projets Récents
        </SectionTitle>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={itemVariants}
            >
              <ProjectImage>
                {project.featured && (
                  <FeaturedBadge>
                    <Star size={14} />
                    Featured
                  </FeaturedBadge>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x250/111111/10B981?text=${project.title.replace(/\s+/g, '+')}`;
                  }}
                />
                <ProjectImageOverlay>
                  {project.githubUrl && (
                    <ProjectLink
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Voir sur GitHub"
                    >
                      <Github size={24} />
                    </ProjectLink>
                  )}
                  {project.liveUrl && (
                    <ProjectLink
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Voir le site"
                    >
                      <ExternalLink size={24} />
                    </ProjectLink>
                  )}
                </ProjectImageOverlay>
              </ProjectImage>

              <ProjectContent>
                <ProjectHeader>
                  <ProjectIcon>
                    <Folder size={24} />
                  </ProjectIcon>
                  <ProjectTitle>{project.title}</ProjectTitle>
                </ProjectHeader>

                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectTechStack>
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </ProjectTechStack>

                <ProjectFooter>
                  <ProjectStatus>
                    <span>•</span>
                    {project.status}
                  </ProjectStatus>
                  <ProjectLinks>
                    {project.githubUrl && (
                      <ProjectLinkIcon
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </ProjectLinkIcon>
                    )}
                    {project.liveUrl && (
                      <ProjectLinkIcon
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live"
                      >
                        <ExternalLink size={20} />
                      </ProjectLinkIcon>
                    )}
                  </ProjectLinks>
                </ProjectFooter>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </div>
    </ProjectsSection>
  );
};