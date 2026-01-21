import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { profile } from '../../data/portfolio.data';

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const ProfileCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 320px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
    margin: 0 auto;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.gradient};
  padding: 3px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors.background};
  }
`;

const ProfileName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

const ProfileTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ContactInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.fast};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.fast};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);

    svg {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const CVButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.normal};
  width: 100%;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const MainContent = styled(motion.div)`
  flex: 1;
`;

const BioSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SkillsPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

export const AboutCompact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const topSkills = [
    'TypeScript', 'React', 'Next.js', 'NestJS', 'AWS',
    'Docker', 'PostgreSQL', 'Node.js', 'Kubernetes', 'GraphQL'
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
    <AboutSection id="about" ref={ref}>
      <Container>
        <ContentGrid>
          <ProfileCard
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ProfileImageWrapper>
              <img src={profile.profileImage} alt={profile.fullName} />
            </ProfileImageWrapper>

            <ProfileName>{profile.fullName}</ProfileName>
            <ProfileTitle>{profile.title}</ProfileTitle>

            <ContactInfo>
              <ContactItem href={`mailto:${profile.email}`}>
                <Mail /> {profile.email}
              </ContactItem>
              <ContactItem href={`tel:${profile.phone}`}>
                <Phone /> {profile.phone}
              </ContactItem>
              <ContactItem>
                <MapPin /> {profile.location.city}, {profile.location.country}
              </ContactItem>
              <ContactItem>
                <Award /> Certifié AWS
              </ContactItem>
            </ContactInfo>

            <SocialLinks>
              <SocialLink
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin />
              </SocialLink>
              <SocialLink
                href={profile.socialLinks.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </SocialLink>
            </SocialLinks>

            <CVButton
              href={profile.resume.url}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              Télécharger CV
            </CVButton>
          </ProfileCard>

          <MainContent
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants}>
              <BioSection>
                <BioText>{profile.about.short}</BioText>
                <BioText>{profile.about.philosophy}</BioText>
              </BioSection>

              <h4 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.25rem' }}>Stack technique principal</h4>
              <SkillsPreview>
                {topSkills.map((skill) => (
                  <SkillBadge key={skill}>{skill}</SkillBadge>
                ))}
              </SkillsPreview>
            </motion.div>
          </MainContent>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};