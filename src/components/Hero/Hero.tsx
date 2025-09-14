import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(255, 107, 107, 0.08) 0%, transparent 50%);
  z-index: -1;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: float 20s infinite ease-in-out;
  }
  
  &::before {
    width: 400px;
    height: 400px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    top: -200px;
    right: -200px;
  }
  
  &::after {
    width: 300px;
    height: 300px;
    background: ${({ theme }) => theme.colors.secondary};
    opacity: 0.1;
    bottom: -150px;
    left: -150px;
    animation-delay: -10s;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div``;

const Greeting = styled(motion.p)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
  }
`;

const Location = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-3px) rotate(5deg);
    box-shadow: 0 10px 20px rgba(0, 102, 255, 0.3);
  }
`;

const ImageContent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20% 80% 30% 70% / 60% 40% 60% 40%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  animation: float 6s ease-in-out infinite;
`;

const ImageDecoration = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  border-radius: 20% 80% 30% 70% / 60% 40% 60% 40%;
  opacity: 0.3;
  animation: rotate 20s linear infinite;
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Hero: React.FC = () => {
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
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <HeroSection id="home">
      <BackgroundGradient />
      <FloatingOrbs />
      <div className="container">
        <HeroContent>
          <TextContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Greeting variants={itemVariants}>
                Bonjour, je suis
              </Greeting>
              
              <Name variants={itemVariants}>
                {portfolioData.fullName}
              </Name>
              
              <Title variants={itemVariants}>
                {portfolioData.headline}
              </Title>
              
              <Description variants={itemVariants}>
                Passionné par le développement d'applications modernes et scalables.
                Expert en architectures microservices avec une solide expérience en
                React, Next.js, NestJS et AWS.
              </Description>
              
              <Location variants={itemVariants}>
                <MapPin size={20} />
                <span>{portfolioData.location}</span>
              </Location>
              
              <ButtonGroup variants={itemVariants}>
                <PrimaryButton href="#contact">
                  <Mail size={20} />
                  Me contacter
                </PrimaryButton>
                <SecondaryButton href={portfolioData.resumeUrl} download>
                  <Download size={20} />
                  Télécharger CV
                </SecondaryButton>
              </ButtonGroup>
              
              <SocialLinks variants={itemVariants}>
                <SocialLink
                  href={portfolioData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </SocialLink>
                <SocialLink
                  href={portfolioData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </SocialLink>
                <SocialLink
                  href={`mailto:${portfolioData.email}`}
                  aria-label="Email"
                >
                  <Mail size={24} />
                </SocialLink>
              </SocialLinks>
            </motion.div>
          </TextContent>
          
          <ImageContent
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ProfileImageWrapper>
              <ImageDecoration />
              <ProfileImage
                src={portfolioData.profileImageUrl}
                alt={portfolioData.fullName}
              />
            </ProfileImageWrapper>
          </ImageContent>
        </HeroContent>
      </div>
    </HeroSection>
  );
};