import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight, Briefcase } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

// Couleurs des entreprises basees sur leurs logos
const companyColors: { [key: string]: string } = {
  'Weneeds': '#6366F1',
  'Capgemini': '#0070AD',
  '42C': '#FF6B00',
  'Freelance': '#10B981',
  'default': '#6366F1'
};

const getCompanyColor = (company: string) => {
  return companyColors[company] || companyColors['default'];
};

const ExperienceSection = styled.section`
  padding: 100px 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 900px;
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

const TimelineContainer = styled.div`
  position: relative;
`;

const TimelineItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 40px;
  position: relative;
  padding-bottom: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding-bottom: 32px;
  }
`;

// Colonne gauche avec dates et ligne
const DateColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`;

const DateStart = styled.div<{ $color: string }>`
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  text-align: right;
  padding: 4px 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    text-align: left;
    order: 1;
  }
`;

const DateLineWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 0;
  min-height: 100px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DateLine = styled.div<{ $color: string }>`
  width: 3px;
  flex: 1;
  background: linear-gradient(180deg, ${({ $color }) => $color}20 0%, ${({ $color }) => $color} 100%);
  border-radius: 2px;
  margin-right: 4px;
`;

const DateEnd = styled.div<{ $color: string }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  text-align: right;
  padding: 4px 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    text-align: left;
    order: 2;
    &::before {
      content: '-> ';
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

// Colonne droite avec la card
const ContentColumn = styled.div`
  padding-bottom: 40px;

  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`;

const ExperienceCardStyled = styled(motion.div)<{ $hoverColor: string }>`
  display: block;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: ${({ $hoverColor }) => $hoverColor}35;
    transform: translateY(-2px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
`;

const CompanyLogo = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ $color }) => $color}12;
  border: 1px solid ${({ $color }) => $color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 6px;
  }

  ${ExperienceCardStyled}:hover & {
    background: ${({ $color }) => $color}18;
    border-color: ${({ $color }) => $color}35;
    transform: scale(1.05);
  }
`;

const CompanyDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const CompanyName = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
  margin-bottom: 2px;
`;

const JobTitle = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
`;

const CurrentIndicator = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: ${({ $color }) => $color}15;
  border-radius: 100px;
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.7;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.65;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TechStack = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
`;

const TechBadge = styled.span`
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ViewLink = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.2s ease;
  }

  ${ExperienceCardStyled}:hover & {
    color: ${({ $color }) => $color};

    svg {
      transform: translateX(3px);
    }
  }
`;

const ViewAllButtonStyled = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  padding: 14px 28px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-left: 140px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;

    svg {
      transform: translateX(3px);
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;

export const ExperienceTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Afficher seulement 3 experiences
  const displayedExperiences = portfolioData.experiences.slice(0, 3);

  const parseDateRange = (dateRange: string) => {
    const parts = dateRange.split(' - ');
    return {
      start: parts[0] || '',
      end: parts[1] || 'Present'
    };
  };

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <SectionHeader>
          <Label
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Parcours
          </Label>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experiences professionnelles
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Du freelance aux grands groupes, en passant par les startups AI.
          </SectionDescription>
        </SectionHeader>

        <TimelineContainer>
          {displayedExperiences.map((exp, index) => {
            const color = getCompanyColor(exp.company);
            const dates = parseDateRange(exp.dateRange);

            return (
              <TimelineItem
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                <DateColumn>
                  <DateEnd $color={color}>{dates.end}</DateEnd>
                  <DateLineWrapper>
                    <DateLine $color={color} />
                  </DateLineWrapper>
                  <DateStart $color={color}>{dates.start}</DateStart>
                </DateColumn>

                <ContentColumn>
                  <Link href={`/experience/${exp.id}`} style={{ textDecoration: 'none' }}>
                    <ExperienceCardStyled $hoverColor={color}>
                      <CardTop>
                        <CompanyLogo $color={color}>
                          {exp.companyLogo ? (
                            <img src={exp.companyLogo} alt={exp.company} />
                          ) : (
                            <Briefcase size={20} style={{ color }} />
                          )}
                        </CompanyLogo>
                        <CompanyDetails>
                          <CompanyName>{exp.company}</CompanyName>
                          <JobTitle>{exp.title}</JobTitle>
                        </CompanyDetails>
                        {exp.isCurrent && (
                          <CurrentIndicator $color={color}>Actuel</CurrentIndicator>
                        )}
                      </CardTop>

                      <Meta>
                        <MapPin />
                        {exp.location}
                      </Meta>

                      <Description>{exp.description}</Description>

                      <CardBottom>
                        <TechStack>
                          {exp.skills.slice(0, 3).map((skill, i) => (
                            <TechBadge key={i}>{skill}</TechBadge>
                          ))}
                          {exp.skills.length > 3 && (
                            <TechBadge>+{exp.skills.length - 3}</TechBadge>
                          )}
                        </TechStack>
                        <ViewLink $color={color}>
                          Voir plus
                          <ArrowRight />
                        </ViewLink>
                      </CardBottom>
                    </ExperienceCardStyled>
                  </Link>
                </ContentColumn>
              </TimelineItem>
            );
          })}
        </TimelineContainer>

        {portfolioData.experiences.length > 3 && (
          <Link href="/experiences" style={{ textDecoration: 'none' }}>
            <ViewAllButtonStyled
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir les {portfolioData.experiences.length - 3} autres experiences
              <ArrowRight />
            </ViewAllButtonStyled>
          </Link>
        )}
      </Container>
    </ExperienceSection>
  );
};
