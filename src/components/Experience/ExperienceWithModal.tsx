import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Briefcase, Award, ExternalLink, ChevronRight, Building2, Users, Target } from 'lucide-react';
import { portfolioData, database } from '../../data/portfolio.data';
import { Modal } from '../Modal/Modal';

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
`;

const ExperienceSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background: ${({ theme }) => theme.colors.backgroundLight};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.gradient};
  }
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

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.colors.border};

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ index: number }>`
  display: flex;
  justify-content: ${({ index }) => index % 2 === 0 ? 'flex-start' : 'flex-end'};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
    padding-left: 80px;
  }
`;

const TimelineDot = styled.div<{ isCurrent: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  background: ${({ isCurrent, theme }) =>
    isCurrent ? theme.colors.gradient : theme.colors.surface};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.backgroundLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    left: 30px;
  }

  ${({ isCurrent, theme }) => isCurrent && css`
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      height: 30px;
      border: 2px solid ${theme.colors.primary};
      border-radius: 50%;
      animation: ${pulse} 2s infinite;
    }
  `}
`;

const TimelineContent = styled.div`
  width: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const ExperienceCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient};
    transform: scaleX(0);
    transform-origin: left;
    transition: ${({ theme }) => theme.transitions.normal};
  }

  &::after {
    content: 'Cliquer pour plus de détails';
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};

    &::before {
      transform: scaleX(1);
    }

    &::after {
      opacity: 1;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CompanyLogo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: contain;
  background: white;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};

  ${ExperienceCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
`;

const CompanyDetails = styled.div``;

const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const CurrentBadge = styled.span`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillTag = styled.span`
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
    border-color: transparent;
  }
`;

// Modal Content Styles
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ModalCompanyLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: contain;
  background: white;
  padding: 12px;
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
`;

const ModalCompanyInfo = styled.div`
  flex: 1;
`;

const ModalJobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ModalCompany = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const CompanyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
    transform: translateX(4px);
  }
`;

const ModalMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const SectionTitleSmall = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const TechBadge = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  }
`;

export const ExperienceWithModal: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (expId: string) => {
    const experience = database.experiences.find(exp => exp.id === expId);
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <>
      <ExperienceSection id="experience" ref={ref}>
        <div className="container">
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Expérience Professionnelle
          </SectionTitle>

          <Timeline>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {portfolioData.experiences.slice(0, 5).map((exp, index) => (
                <TimelineItem key={exp.id} index={index}>
                  <TimelineDot isCurrent={exp.isCurrent} />
                  <TimelineContent>
                    <motion.div variants={itemVariants}>
                      <ExperienceCard onClick={() => handleCardClick(exp.id)}>
                        <CardHeader>
                          <CompanyInfo>
                            {exp.companyLogo && (
                              <CompanyLogo src={exp.companyLogo} alt={exp.company} />
                            )}
                            <CompanyDetails>
                              <JobTitle>{exp.title}</JobTitle>
                              <Company>
                                <Briefcase size={16} />
                                {exp.company}
                                {exp.isCurrent && (
                                  <CurrentBadge>
                                    <Award size={12} />
                                    Actuel
                                  </CurrentBadge>
                                )}
                              </Company>
                            </CompanyDetails>
                          </CompanyInfo>

                          <MetaInfo>
                            <MetaItem>
                              <Calendar size={14} />
                              {exp.dateRange}
                            </MetaItem>
                            <MetaItem>
                              <MapPin size={14} />
                              {exp.location}
                            </MetaItem>
                          </MetaInfo>
                        </CardHeader>

                        <Description>{exp.description}</Description>

                        <SkillsContainer>
                          {exp.skills.slice(0, 5).map((skill, skillIndex) => (
                            <SkillTag key={skillIndex}>{skill}</SkillTag>
                          ))}
                          {exp.skills.length > 5 && (
                            <SkillTag>+{exp.skills.length - 5} autres</SkillTag>
                          )}
                        </SkillsContainer>
                      </ExperienceCard>
                    </motion.div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </motion.div>
          </Timeline>
        </div>
      </ExperienceSection>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Détails de l'expérience"
        maxWidth="900px"
      >
        {selectedExperience && (
          <>
            <ModalHeader>
              {selectedExperience.companyLogo && (
                <ModalCompanyLogo
                  src={selectedExperience.companyLogo}
                  alt={selectedExperience.company}
                />
              )}
              <ModalCompanyInfo>
                <ModalJobTitle>{selectedExperience.title}</ModalJobTitle>
                <ModalCompany>
                  <CompanyLink
                    href={selectedExperience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Building2 size={20} />
                    {selectedExperience.company}
                    <ExternalLink size={16} />
                  </CompanyLink>
                  {selectedExperience.isCurrent && (
                    <CurrentBadge>
                      <Award size={14} />
                      Poste actuel
                    </CurrentBadge>
                  )}
                </ModalCompany>
                <ModalMeta>
                  <MetaItem>
                    <Calendar size={16} />
                    {selectedExperience.startDate} - {selectedExperience.endDate || 'Présent'}
                  </MetaItem>
                  <MetaItem>
                    <MapPin size={16} />
                    {selectedExperience.location.city}, {selectedExperience.location.country}
                  </MetaItem>
                  <MetaItem>
                    <Users size={16} />
                    {selectedExperience.type === 'full-time' ? 'CDI' :
                     selectedExperience.type === 'contract' ? 'Freelance' :
                     selectedExperience.type === 'internship' ? 'Stage' : 'CDD'}
                  </MetaItem>
                </ModalMeta>
              </ModalCompanyInfo>
            </ModalHeader>

            <Section>
              <SectionTitleSmall>
                <Briefcase size={20} />
                Description du poste
              </SectionTitleSmall>
              <p style={{ color: '#B8BCC8', lineHeight: 1.8 }}>
                {selectedExperience.description}
              </p>
            </Section>

            {selectedExperience.responsibilities && selectedExperience.responsibilities.length > 0 && (
              <Section>
                <SectionTitleSmall>
                  <Target size={20} />
                  Responsabilités principales
                </SectionTitleSmall>
                <List>
                  {selectedExperience.responsibilities.map((resp: string, index: number) => (
                    <ListItem key={index}>{resp}</ListItem>
                  ))}
                </List>
              </Section>
            )}

            {selectedExperience.achievements && selectedExperience.achievements.length > 0 && (
              <Section>
                <SectionTitleSmall>
                  <Award size={20} />
                  Réalisations clés
                </SectionTitleSmall>
                <List>
                  {selectedExperience.achievements.map((achievement: string, index: number) => (
                    <ListItem key={index}>{achievement}</ListItem>
                  ))}
                </List>
              </Section>
            )}

            <Section>
              <SectionTitleSmall>
                <ChevronRight size={20} />
                Technologies utilisées
              </SectionTitleSmall>
              <TechGrid>
                {selectedExperience.technologies.map((tech: string, index: number) => (
                  <TechBadge key={index}>{tech}</TechBadge>
                ))}
              </TechGrid>
            </Section>
          </>
        )}
      </Modal>
    </>
  );
};