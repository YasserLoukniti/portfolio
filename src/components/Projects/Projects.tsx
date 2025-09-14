import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Folder, Star } from 'lucide-react';
import { projects } from '../../data/portfolio.data';

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

  // Utiliser les données depuis la base de données JSON
  const projectsData = projects.map(project => ({
    ...project,
    githubUrl: project.links.github || '#',
    liveUrl: project.links.live || project.links.demo || '#',
    statusLabel: project.status === 'production' ? 'En production' :
                 project.status === 'development' ? 'En développement' :
                 project.status === 'open-source' ? 'Open Source' : 'En cours'
  }));

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
          {projectsData.map((project) => (
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
                    // Utiliser une image statique par défaut au lieu de placeholder.com
                    target.style.display = 'none';
                    target.parentElement!.style.background = 'linear-gradient(135deg, #111111 0%, #1A1A1A 100%)';
                    target.parentElement!.innerHTML = `
                      <div style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #10B981;
                        font-size: 20px;
                        font-weight: bold;
                      ">
                        ${project.title}
                      </div>
                    `;
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
                    {project.statusLabel}
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