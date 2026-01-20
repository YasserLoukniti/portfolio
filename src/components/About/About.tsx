import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Sparkles, MapPin, Building2, Award } from 'lucide-react';
import { profile, statistics } from '../../data/portfolio.data';

const AboutSection = styled.section`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${({ theme }) => theme.spacing['4xl']};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['3xl']};
  }
`;

const ProfileCard = styled(motion.div)`
  position: relative;
  background: rgba(17, 17, 17, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.05) 100%);
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.background};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const StatusBadge = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.background};
`;

const ProfileName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  position: relative;
`;

const ProfileTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
`;

const ProfileMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.02);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const BioSection = styled(motion.div)``;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HighlightBox = styled(motion.div)`
  background: rgba(17, 17, 17, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HighlightTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HighlightList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    margin-top: 8px;
    flex-shrink: 0;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-decoration: none;
  transition: all 0.3s;

  svg {
    transition: transform 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
    color: ${({ theme }) => theme.colors.background};

    svg {
      transform: translate(2px, -2px);
    }
  }
`;

export const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    'Building AI-powered SaaS products with event-driven microservices architecture',
    'AWS Certified Cloud Practitioner with expertise in scalable cloud solutions',
    'Led development of fintech platforms processing real-time payment transactions',
    'Experience with startups and CAC 40 enterprises across multiple industries',
  ];

  return (
    <AboutSection id="about" ref={ref}>
      <div className="container">
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles />
            About Me
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Engineering Excellence
          </SectionTitle>
        </SectionHeader>

        <ContentGrid>
          <ProfileCard
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProfileImageWrapper>
              <ProfileImage
                src={profile.profileImage}
                alt={profile.fullName}
              />
              <StatusBadge>Available</StatusBadge>
            </ProfileImageWrapper>

            <ProfileName>{profile.fullName}</ProfileName>
            <ProfileTitle>{profile.title}</ProfileTitle>

            <ProfileMeta>
              <MetaItem>
                <Building2 />
                <span>Currently at Weneeds</span>
              </MetaItem>
              <MetaItem>
                <MapPin />
                <span>{profile.location.city}, {profile.location.country}</span>
              </MetaItem>
              <MetaItem>
                <Award />
                <span>AWS Certified</span>
              </MetaItem>
            </ProfileMeta>

            <StatsRow>
              <StatItem>
                <StatNumber>{statistics.yearsOfExperience}+</StatNumber>
                <StatLabel>Years Exp.</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{statistics.projectsCompleted}+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{statistics.technologiesMastered}+</StatNumber>
                <StatLabel>Technologies</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{statistics.clientSatisfaction}%</StatNumber>
                <StatLabel>Satisfaction</StatLabel>
              </StatItem>
            </StatsRow>
          </ProfileCard>

          <BioSection
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BioText>
              {profile.about.long}
            </BioText>

            <BioText>
              My development philosophy is built on three pillars: <strong>code quality</strong>,{' '}
              <strong>user experience</strong>, and <strong>performance</strong>. I strive to create
              applications that not only meet business needs but are also maintainable, scalable,
              and delightful to use.
            </BioText>

            <HighlightBox
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HighlightTitle>
                <Sparkles size={18} />
                What I Bring to the Table
              </HighlightTitle>
              <HighlightList>
                {highlights.map((highlight, index) => (
                  <HighlightItem key={index}>{highlight}</HighlightItem>
                ))}
              </HighlightList>
            </HighlightBox>

            <CTAButton
              href="https://www.linkedin.com/in/yasser-loukniti-b121a218a/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Connect
              <ArrowUpRight size={18} />
            </CTAButton>
          </BioSection>
        </ContentGrid>
      </div>
    </AboutSection>
  );
};
