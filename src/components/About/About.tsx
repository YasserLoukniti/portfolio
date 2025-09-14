import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Palette } from 'lucide-react';

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
    { number: '10+', label: 'Années d\'expérience' },
    { number: '50+', label: 'Projets réalisés' },
    { number: '15+', label: 'Technologies maîtrisées' },
    { number: '1', label: 'Certification AWS' },
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
        
        <Content>
          <TextContent
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants}>
              <AboutText>
                Software Engineer passionné avec plus d'une décennie d'expérience dans le
                développement d'applications web modernes et scalables. Spécialisé dans les
                architectures microservices et les technologies cloud.
              </AboutText>
              
              <AboutText>
                Mon expertise s'étend du développement frontend avec React et Next.js au
                backend avec NestJS et Node.js, en passant par le déploiement et la gestion
                d'infrastructures cloud sur AWS.
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