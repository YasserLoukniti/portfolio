import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Briefcase, Award, ArrowRight, Building2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

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

const ExperienceCard = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

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

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};

    &::before {
      transform: scaleX(1);
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

const CompanyLogoPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.normal};

  svg {
    color: white;
    width: 28px;
    height: 28px;
  }

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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const SkillTag = styled.span`
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  transition: ${({ theme }) => theme.transitions.fast};

  ${ExperienceCard}:hover & {
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

const ViewMore = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-10px);
  transition: ${({ theme }) => theme.transitions.fast};

  ${ExperienceCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ViewAllButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing['3xl']} auto 0;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: ${({ theme }) => theme.transitions.normal};
  text-decoration: none;
  max-width: 300px;

  &:hover {
    background: ${({ theme }) => theme.colors.gradient};
    border-color: transparent;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  }
`;

export const ExperienceTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  // Show first 5 experiences on homepage
  const displayedExperiences = portfolioData.experiences.slice(0, 5);

  return (
    <ExperienceSection id="experience" ref={ref}>
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience Professionnelle
        </SectionTitle>

        <Timeline>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {displayedExperiences.map((exp, index) => (
              <TimelineItem key={exp.id} index={index}>
                <TimelineDot isCurrent={exp.isCurrent} />
                <TimelineContent>
                  <motion.div variants={itemVariants}>
                    <ExperienceCard to={`/experience/${exp.id}`}>
                      <CardHeader>
                        <CompanyInfo>
                          {exp.companyLogo ? (
                            <CompanyLogo src={exp.companyLogo} alt={exp.company} />
                          ) : (
                            <CompanyLogoPlaceholder>
                              <Building2 />
                            </CompanyLogoPlaceholder>
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

                      <CardFooter>
                        <SkillsContainer>
                          {exp.skills.slice(0, 4).map((skill, skillIndex) => (
                            <SkillTag key={skillIndex}>{skill}</SkillTag>
                          ))}
                          {exp.skills.length > 4 && (
                            <SkillTag>+{exp.skills.length - 4}</SkillTag>
                          )}
                        </SkillsContainer>
                        <ViewMore>
                          Voir plus
                          <ArrowRight size={16} />
                        </ViewMore>
                      </CardFooter>
                    </ExperienceCard>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </motion.div>
        </Timeline>

        {portfolioData.experiences.length > 5 && (
          <ViewAllButton to="/experiences">
            Voir toutes les experiences ({portfolioData.experiences.length})
            <ArrowRight size={20} />
          </ViewAllButton>
        )}
      </div>
    </ExperienceSection>
  );
};
