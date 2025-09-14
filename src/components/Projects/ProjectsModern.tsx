import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { projects } from '../../data/portfolio.data';

const ProjectsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 420px;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      ${({ theme }) => theme.colors.primary}20 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 60px ${({ theme }) => theme.colors.primary}15;
    border-color: ${({ theme }) => theme.colors.primary};

    &::before {
      opacity: 1;
    }
  }
`;

const ProjectImage = styled.div<{ bgImage?: string }>`
  position: relative;
  height: 200px;
  background: ${({ bgImage, theme }) =>
    bgImage
      ? `url(${bgImage})`
      : `linear-gradient(135deg, ${theme.colors.backgroundLight} 0%, ${theme.colors.surface} 100%)`
  };
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.surface} 0%, transparent 100%);
  }
`;

const ProjectImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProjectLink = styled.a`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s;
  transform: scale(0);
  animation: popIn 0.3s forwards;
  animation-delay: var(--delay);

  ${ProjectCard}:hover & {
    transform: scale(1);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: scale(1.1);
  }

  @keyframes popIn {
    to {
      transform: scale(1);
    }
  }
`;

const ProjectTitle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  z-index: 1;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProjectCategory = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectStatus = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ status, theme }) =>
    status === 'production' ? theme.colors.success + '20' :
    status === 'development' ? theme.colors.warning + '20' :
    theme.colors.primary + '20'
  };
  color: ${({ status, theme }) =>
    status === 'production' ? theme.colors.success :
    status === 'development' ? theme.colors.warning :
    theme.colors.primary
  };
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const ProjectName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectTech = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  margin-top: auto;
`;

const TechDot = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: inline-block;
  opacity: 0.6;
  transition: all 0.3s;

  ${ProjectCard}:hover & {
    opacity: 1;
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TechCount = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const ViewProject = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: translateX(0);
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
  z-index: 2;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const ProjectsModern: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectsData = projects.slice(0, 6).map(project => ({
    ...project,
    githubUrl: project.links.github || '',
    liveUrl: project.links.live || project.links.demo || '',
    statusLabel: project.status
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Projets Récents
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Des solutions innovantes qui font la différence
          </SectionSubtitle>
        </SectionHeader>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              variants={itemVariants}
              onMouseMove={handleMouseMove}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <ProjectImage bgImage={project.image}>
                {project.featured && (
                  <FeaturedBadge>
                    <Sparkles size={14} />
                    Featured
                  </FeaturedBadge>
                )}
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectImageOverlay>
                  <ProjectLinks>
                    {project.githubUrl && (
                      <ProjectLink
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--delay': '0.1s' } as any}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={22} />
                      </ProjectLink>
                    )}
                    {project.liveUrl && (
                      <ProjectLink
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--delay': '0.2s' } as any}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={22} />
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </ProjectImageOverlay>
              </ProjectImage>

              <ProjectContent>
                <ProjectMeta>
                  <ProjectCategory>{project.category}</ProjectCategory>
                  <ProjectStatus status={project.status}>
                    {project.status === 'production' ? '🟢 Live' :
                     project.status === 'development' ? '🟡 Dev' :
                     '🔵 Open Source'}
                  </ProjectStatus>
                </ProjectMeta>

                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectFooter>
                  <ProjectTech>
                    {project.technologies.slice(0, 3).map((_, index) => (
                      <TechDot key={index} />
                    ))}
                  </ProjectTech>
                  <TechCount>{project.technologies.length} technologies</TechCount>
                  <ViewProject>
                    Voir plus
                    <ArrowUpRight size={16} />
                  </ViewProject>
                </ProjectFooter>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};