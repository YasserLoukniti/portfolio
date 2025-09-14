import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Github, Globe, Sparkles } from 'lucide-react';
import { projects } from '../../data/portfolio.data';

const ProjectsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const BentoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: minmax(280px, auto);
  gap: ${({ theme }) => theme.spacing.xl};

  /* Créer un layout Bento avec différentes tailles */
  & > *:nth-child(1),
  & > *:nth-child(5) {
    grid-column: span 2;
    grid-row: span 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

    & > *:nth-child(1),
    & > *:nth-child(5) {
      grid-column: span 1;
      grid-row: span 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    grid-auto-rows: 320px;
  }
`;

const getProjectGradient = (index: number) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  ];
  return gradients[index % gradients.length];
};

const getProjectImage = (category: string, index: number, featured?: boolean) => {
  // Utiliser Picsum pour des images aléatoires de haute qualité
  const width = featured ? 800 : 400;
  const height = featured ? 600 : 300;
  const seed = category.toLowerCase().replace(/\s+/g, '') + index;

  // Images avec blur intégré pour un effet moderne
  return `https://picsum.photos/seed/${seed}/${width}/${height}?blur=2`;

  // Alternative: Utiliser des catégories spécifiques
  // const categories: { [key: string]: string } = {
  //   'SaaS': 'technology',
  //   'E-commerce': 'business',
  //   'Data Visualization': 'data',
  //   'Backend': 'code',
  //   'Fintech': 'finance',
  //   'CMS': 'website',
  //   'Mobile': 'app'
  // };
  // const searchTerm = categories[category] || 'technology';
  // return `https://source.unsplash.com/${width}x${height}/?${searchTerm},minimal`;
};

const ProjectCard = styled(motion.div)<{
  $featured?: boolean;
  $gradient?: string;
  $bgImage?: string;
}>`
  position: relative;
  background: ${({ $bgImage, theme }) =>
    $bgImage
      ? `linear-gradient(180deg, ${theme.colors.surface}00 0%, ${theme.colors.surface}EE 70%, ${theme.colors.surface} 100%), url(${$bgImage})`
      : theme.colors.surface
  };
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};

  grid-column: ${({ $featured }) => $featured ? 'span 2' : 'span 1'};
  grid-row: ${({ $featured }) => $featured ? 'span 2' : 'span 1'};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: ${({ $featured }) => $featured ? 'span 2' : 'span 1'};
    grid-row: span 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      ${({ theme }) => theme.colors.background}80 50%,
      ${({ theme }) => theme.colors.background}95 100%
    );
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};

    &::after {
      opacity: 0.3;
    }
  }
`;

const ProjectBackground = styled.div<{ $gradient: string }>`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: ${({ $gradient }) => $gradient};
    filter: blur(80px);
    transform: rotate(-45deg);
  }

  &::after {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    bottom: -50%;
    right: -50%;
    background: ${({ theme }) => theme.colors.gradient};
    filter: blur(100px);
    opacity: 0.5;
    border-radius: 50%;
  }
`;

const float = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }
`;

const GeometricShapes = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.08;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    filter: blur(60px);
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
    background: ${({ theme }) => theme.colors.secondary};
    transform: rotate(45deg);
    filter: blur(40px);
    animation: float 8s ease-in-out infinite reverse;
  }

  ${float}
`;

const ProjectPattern = styled.div<{ $index: number }>`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  z-index: 1;
  background-image: ${({ $index }) => {
    const patterns = [
      `radial-gradient(circle at 20% 50%, #10B981 0%, transparent 50%),
       radial-gradient(circle at 80% 80%, #00DC82 0%, transparent 50%)`,
      `linear-gradient(45deg, #10B981 25%, transparent 25%),
       linear-gradient(-45deg, #10B981 25%, transparent 25%),
       linear-gradient(45deg, transparent 75%, #10B981 75%),
       linear-gradient(-45deg, transparent 75%, #10B981 75%)`,
      `radial-gradient(circle at 50% 50%, #10B981 0%, transparent 70%)`,
    ];
    return patterns[$index % patterns.length];
  }};
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
`;

const ProjectContent = styled.div`
  position: relative;
  z-index: 2;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.surface}DD 0%,
    ${({ theme }) => theme.colors.surface}AA 60%,
    transparent 100%
  );
  margin: -${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background}EE;
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ProjectLinkIcon = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background}90;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: scale(1.1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectTechStack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const TechPill = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ProjectOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ProjectDetail = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  max-width: 600px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: rotate(90deg);
  }
`;

export const ProjectsBento: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Afficher TOUS les projets de la base de données
  // Trier pour mettre les projets featured en premier
  const displayProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <ProjectsSection id="projects" ref={ref}>
        <Container>
          <SectionHeader>
            <SectionTitle
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Portfolio de Projets
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {projects.length} projets réalisés • {projects.filter(p => p.featured).length} projets phares
            </SectionSubtitle>
          </SectionHeader>

          <BentoGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                $featured={project.featured}
                $gradient={getProjectGradient(index)}
                $bgImage={getProjectImage(project.category, index, project.featured)}
                variants={itemVariants}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
              >
                <ProjectContent>
                  <ProjectHeader>
                    <ProjectBadge>
                      {project.featured && <Sparkles size={12} />}
                      {project.category}
                    </ProjectBadge>
                    <ProjectLinks>
                      {project.links.github && (
                        <ProjectLinkIcon
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                        </ProjectLinkIcon>
                      )}
                      {(project.links.live || project.links.demo) && (
                        <ProjectLinkIcon
                          href={project.links.live || project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={16} />
                        </ProjectLinkIcon>
                      )}
                    </ProjectLinks>
                  </ProjectHeader>

                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>

                  <ProjectTechStack>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <TechPill key={tech}>{tech}</TechPill>
                    ))}
                    {project.technologies.length > 3 && (
                      <TechPill>+{project.technologies.length - 3}</TechPill>
                    )}
                  </ProjectTechStack>
                </ProjectContent>
              </ProjectCard>
            ))}
          </BentoGrid>
        </Container>
      </ProjectsSection>

      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ProjectDetail
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>

              <h2 style={{ marginBottom: '1rem' }}>{selectedProject.title}</h2>
              <p style={{ color: '#B8BCC8', marginBottom: '1.5rem' }}>
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {selectedProject.features && (
                <>
                  <h4 style={{ marginBottom: '0.5rem' }}>Fonctionnalités</h4>
                  <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                    {selectedProject.features.map((feature: string, i: number) => (
                      <li key={i} style={{ color: '#B8BCC8', marginBottom: '0.25rem' }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 style={{ marginBottom: '0.5rem' }}>Technologies</h4>
              <ProjectTechStack style={{ marginBottom: '1.5rem' }}>
                {selectedProject.technologies.map((tech: string) => (
                  <TechPill key={tech}>{tech}</TechPill>
                ))}
              </ProjectTechStack>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: '#10B981',
                      color: 'white',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    <Github size={18} />
                    Code
                  </a>
                )}
                {(selectedProject.links.live || selectedProject.links.demo) && (
                  <a
                    href={selectedProject.links.live || selectedProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      color: '#10B981',
                      border: '2px solid #10B981',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    <ArrowUpRight size={18} />
                    Voir le projet
                  </a>
                )}
              </div>
            </ProjectDetail>
          </ProjectOverlay>
        )}
      </AnimatePresence>
    </>
  );
};