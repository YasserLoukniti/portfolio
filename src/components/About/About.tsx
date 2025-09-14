import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Palette, Download, Award, Briefcase, Calendar } from 'lucide-react';
import { profile, statistics } from '../../data/portfolio.data';

const AboutSection = styled.section`
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled(motion.div)``;

const AboutText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TechEnvironments = styled.div`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const TechTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TechCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TechCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
`;

const TechCardTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const TechList = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.gradient};
  padding: 4px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    object-fit: cover;
    border: 4px solid ${({ theme }) => theme.colors.background};
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProfileBio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const QuickStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const QuickStat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const techEnvironments = [
    {
      icon: <Code2 size={24} />,
      title: 'Frontend',
      techs: 'ReactJS, NextJS, TypeScript, jQuery, MUI, Bootstrap, SASS',
    },
    {
      icon: <Server size={24} />,
      title: 'Backend',
      techs: 'NodeJS, NestJS, PHP, Symfony, Django, Python',
    },
    {
      icon: <Cloud size={24} />,
      title: 'DevOps & Cloud',
      techs: 'AWS, Docker, Kubernetes, Git, Jenkins, CI/CD',
    },
    {
      icon: <Palette size={24} />,
      title: 'Design',
      techs: 'Adobe XD, Figma, Photoshop',
    },
  ];

  const stats = [
    { number: `${statistics.yearsOfExperience}+`, label: 'Années d\'expérience' },
    { number: `${statistics.projectsCompleted}+`, label: 'Projets réalisés' },
    { number: `${statistics.technologiesMastered}+`, label: 'Technologies maîtrisées' },
    { number: `${statistics.clientSatisfaction}%`, label: 'Satisfaction client' },
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
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          À Propos
        </SectionTitle>
        
        <ProfileSection>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ProfileImage>
              <img
                src={profile.profileImage}
                alt={profile.fullName}
              />
            </ProfileImage>
          </motion.div>

          <ProfileInfo>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProfileName>{profile.fullName}</ProfileName>
              <ProfileTitle>{profile.title} | {profile.headline}</ProfileTitle>
              <ProfileBio>
                {profile.about.long}
              </ProfileBio>

              <QuickStats>
                <QuickStat>
                  <Briefcase size={20} />
                  <span>Actuellement chez Weneeds</span>
                </QuickStat>
                <QuickStat>
                  <Award size={20} />
                  <span>Certifié AWS Cloud Practitioner</span>
                </QuickStat>
                <QuickStat>
                  <Calendar size={20} />
                  <span>Disponible pour missions freelance</span>
                </QuickStat>
              </QuickStats>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ marginTop: '2rem' }}
              >
                <CVButton
                  href="/cv-yasser-loukniti.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Télécharger mon CV
                </CVButton>
              </motion.div>
            </motion.div>
          </ProfileInfo>
        </ProfileSection>

        <Content>
          <TextContent
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants}>
              <AboutText>
                Ma philosophie de développement repose sur trois piliers : <strong>la qualité du code</strong>,
                <strong> l'expérience utilisateur</strong> et <strong>la performance</strong>. Je m'efforce de créer
                des applications qui non seulement répondent aux besoins métiers, mais qui sont également maintenables,
                évolutives et agréables à utiliser.
              </AboutText>

              <AboutText>
                Fort d'une expérience variée allant des startups innovantes aux grandes entreprises du CAC 40,
                j'ai développé une capacité d'adaptation et une vision globale qui me permettent de relever
                tous types de défis techniques. Mon expertise AWS et ma maîtrise des pratiques DevOps garantissent
                des déploiements fluides et une infrastructure robuste.
              </AboutText>
            </motion.div>
            
            <TechEnvironments>
              <TechTitle>Environnements Techniques</TechTitle>
              <TechGrid>
                {techEnvironments.map((tech, index) => (
                  <TechCard
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TechCardHeader>
                      <TechIcon>{tech.icon}</TechIcon>
                      <TechCardTitle>{tech.title}</TechCardTitle>
                    </TechCardHeader>
                    <TechList>{tech.techs}</TechList>
                  </TechCard>
                ))}
              </TechGrid>
            </TechEnvironments>
          </TextContent>
          
          <StatsGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatCard>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </motion.div>
            ))}
          </StatsGrid>
        </Content>
      </div>
    </AboutSection>
  );
};