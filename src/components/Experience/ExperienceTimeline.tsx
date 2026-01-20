import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const ExperienceSection = styled.section`
  padding: ${({ theme }) => theme.spacing['6xl']} 0;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const SectionLabel = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const ExperienceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled(motion.div)`
  perspective: 1000px;
`;

const ExperienceCard = styled(motion(Link))`
  display: block;
  position: relative;
  background: rgba(17, 17, 17, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  transition: border-color 0.3s ease;
  transform-style: preserve-3d;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(99, 102, 241, 0.06),
      transparent 40%
    );
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const CardGlow = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2) 0%,
    transparent 50%,
    rgba(129, 140, 248, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: -1;

  ${ExperienceCard}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.md};
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  transition: all 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }

  ${ExperienceCard}:hover & {
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  }
`;

const Company = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const JobTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const CurrentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.success};
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  svg {
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const SkillTag = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.3s;

  ${ExperienceCard}:hover & {
    border-color: rgba(99, 102, 241, 0.2);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ViewMore = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.3s;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s;
  }

  ${ExperienceCard}:hover & {
    color: ${({ theme }) => theme.colors.secondary};

    svg {
      transform: translate(2px, -2px);
    }
  }
`;

const ViewAllButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing['3xl']} auto 0;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['3xl']};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-decoration: none;
  transition: all 0.3s;
  max-width: fit-content;

  svg {
    transition: transform 0.3s;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.text};

    svg {
      transform: translate(2px, -2px);
    }
  }
`;

interface CardProps {
  experience: typeof portfolioData.experiences[0];
  index: number;
}

const Card3D: React.FC<CardProps> = ({ experience, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    // Update CSS variables for the spotlight effect
    cardRef.current.style.setProperty('--mouse-x', `${(x + 0.5) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <CardWrapper
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ExperienceCard
        ref={cardRef}
        to={`/experience/${experience.id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
      >
        <CardGlow />
        <CardContent>
          <CardHeader>
            <CompanyInfo>
              <CompanyLogo>
                {experience.companyLogo ? (
                  <img src={experience.companyLogo} alt={experience.company} />
                ) : (
                  <span style={{ color: '#6366F1', fontWeight: 700, fontSize: '1.25rem' }}>
                    {experience.company.charAt(0)}
                  </span>
                )}
              </CompanyLogo>
              <Company>{experience.company}</Company>
              <JobTitle>{experience.title}</JobTitle>
            </CompanyInfo>
            {experience.isCurrent && <CurrentBadge>Current</CurrentBadge>}
          </CardHeader>

          <MetaInfo>
            <MetaItem>
              <Calendar />
              {experience.dateRange}
            </MetaItem>
            <MetaItem>
              <MapPin />
              {experience.location}
            </MetaItem>
          </MetaInfo>

          <Description>{experience.description}</Description>

          <CardFooter>
            <SkillsContainer>
              {experience.skills.slice(0, 3).map((skill, skillIndex) => (
                <SkillTag key={skillIndex}>{skill}</SkillTag>
              ))}
              {experience.skills.length > 3 && (
                <SkillTag>+{experience.skills.length - 3}</SkillTag>
              )}
            </SkillsContainer>
            <ViewMore>
              View details
              <ArrowUpRight />
            </ViewMore>
          </CardFooter>
        </CardContent>
      </ExperienceCard>
    </CardWrapper>
  );
};

export const ExperienceTimeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const displayedExperiences = portfolioData.experiences.slice(0, 4);

  return (
    <ExperienceSection id="experience" ref={ref}>
      <div className="container">
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles />
            Career Journey
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Work Experience
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Building scalable systems and leading engineering teams across
            fintech, e-commerce, and enterprise solutions.
          </SectionDescription>
        </SectionHeader>

        <ExperienceGrid>
          {displayedExperiences.map((exp, index) => (
            <Card3D key={exp.id} experience={exp} index={index} />
          ))}
        </ExperienceGrid>

        {portfolioData.experiences.length > 4 && (
          <ViewAllButton
            to="/experiences"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View all experiences ({portfolioData.experiences.length})
            <ArrowUpRight size={18} />
          </ViewAllButton>
        )}
      </div>
    </ExperienceSection>
  );
};
