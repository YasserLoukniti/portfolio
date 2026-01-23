import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Globe, X, ExternalLink } from 'lucide-react';
import { projects } from '../../data/portfolio.data';

const ProjectsSection = styled.section`
  padding: 100px 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  margin-bottom: 64px;
`;

const Label = styled(motion.span)`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 16px;
`;

const SectionDescription = styled(motion.p)`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  max-width: 500px;
`;

const BentoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  gap: 20px;

  /* Featured projects - larger cards */
  & > *:nth-child(1) {
    grid-column: span 2;
    grid-row: span 2;
  }

  & > *:nth-child(4) {
    grid-column: span 2;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 240px;

    & > *:nth-child(1) {
      grid-column: span 2;
      grid-row: span 1;
    }

    & > *:nth-child(4) {
      grid-column: span 1;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 300px;

    & > * {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
  }
`;

const ProjectCard = styled(motion.article)<{ $bgImage?: string }>`
  position: relative;
  background: ${({ $bgImage }) =>
    $bgImage
      ? `linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.85) 60%, rgba(10, 10, 10, 0.98) 100%), url(${$bgImage})`
      : 'rgba(255, 255, 255, 0.02)'
  };
  background-size: cover;
  background-position: center top;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
`;

const ProjectContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 28px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ProjectCategory = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 8px;
`;

const ProjectLinkIcon = styled.a`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ProjectTechStack = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const TechPill = styled.span`
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  font-family: ${({ theme }) => theme.fonts.mono};
`;

// More Projects Card
const MoreProjectsCard = styled(motion.div)`
  position: relative;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 20px;
  border: 2px dashed rgba(99, 102, 241, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
  }
`;

const MoreNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
`;

const MoreTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
`;

const MoreDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  max-width: 200px;
`;

// Modal
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Modal = styled(motion.div)`
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  max-width: 560px;
  width: 100%;
  padding: 36px;
  position: relative;
  max-height: 85vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  padding-right: 48px;
  letter-spacing: -0.02em;
`;

const ModalCategory = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 20px;
`;

const ModalDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 28px;
`;

const ModalSection = styled.div`
  margin-bottom: 24px;
`;

const ModalSectionTitle = styled.h4`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 1.6;
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: rgba(99, 102, 241, 0.5);
    border-radius: 50%;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ModalTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ModalTechPill = styled.span`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const ActionButton = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${({ $primary }) => $primary ? '#fff' : 'transparent'};
  border: 1px solid ${({ $primary }) => $primary ? '#fff' : 'rgba(255, 255, 255, 0.15)'};
  border-radius: 12px;
  color: ${({ $primary }) => $primary ? '#0a0a0a' : '#fff'};
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    ${({ $primary }) => !$primary && `
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.25);
    `}
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ProjectsBento: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const displayProjects = [...projects]
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, 5);

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
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <ProjectsSection id="projects" ref={ref}>
        <Container>
          <SectionHeader>
            <Label
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </Label>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Projets réalisés
            </SectionTitle>
            <SectionDescription
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Une sélection de projets SaaS, e-commerce et applications d'entreprise.
            </SectionDescription>
          </SectionHeader>

          <BentoGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {displayProjects.map((project) => (
              <ProjectCard
                key={project.id}
                $bgImage={project.image}
                variants={itemVariants}
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.01 }}
              >
                <ProjectContent>
                  <ProjectHeader>
                    <ProjectCategory>
                      {project.category}
                    </ProjectCategory>
                    <ProjectLinks>
                      {project.links.github && (
                        <ProjectLinkIcon
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github />
                        </ProjectLinkIcon>
                      )}
                      {(project.links.live || project.links.demo) && (
                        <ProjectLinkIcon
                          href={project.links.live || project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe />
                        </ProjectLinkIcon>
                      )}
                    </ProjectLinks>
                  </ProjectHeader>

                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>

                  <ProjectTechStack>
                    {project.technologies.slice(0, 4).map((tech) => (
                      <TechPill key={tech}>{tech}</TechPill>
                    ))}
                    {project.technologies.length > 4 && (
                      <TechPill>+{project.technologies.length - 4}</TechPill>
                    )}
                  </ProjectTechStack>
                </ProjectContent>
              </ProjectCard>
            ))}

            <MoreProjectsCard variants={itemVariants}>
              <MoreNumber>+{projects.length + 10}</MoreNumber>
              <MoreTitle>Autres projets</MoreTitle>
              <MoreDescription>
                Applications, sites e-commerce, dashboards et solutions sur mesure
              </MoreDescription>
            </MoreProjectsCard>
          </BentoGrid>
        </Container>
      </ProjectsSection>

      <AnimatePresence>
        {selectedProject && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <Modal
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedProject(null)}>
                <X />
              </CloseButton>

              <ModalCategory>{selectedProject.category}</ModalCategory>
              <ModalTitle>{selectedProject.title}</ModalTitle>
              <ModalDescription>
                {selectedProject.longDescription || selectedProject.description}
              </ModalDescription>

              {selectedProject.features && selectedProject.features.length > 0 && (
                <ModalSection>
                  <ModalSectionTitle>Fonctionnalites</ModalSectionTitle>
                  <FeaturesList>
                    {selectedProject.features.map((feature, i) => (
                      <FeatureItem key={i}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                </ModalSection>
              )}

              <ModalSection>
                <ModalSectionTitle>Technologies</ModalSectionTitle>
                <ModalTechStack>
                  {selectedProject.technologies.map((tech) => (
                    <ModalTechPill key={tech}>{tech}</ModalTechPill>
                  ))}
                </ModalTechStack>
              </ModalSection>

              <ModalActions>
                {selectedProject.links.github && (
                  <ActionButton
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    $primary
                  >
                    <Github />
                    Code source
                  </ActionButton>
                )}
                {(selectedProject.links.live || selectedProject.links.demo) && (
                  <ActionButton
                    href={selectedProject.links.live || selectedProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink />
                    Voir le projet
                  </ActionButton>
                )}
              </ModalActions>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};
