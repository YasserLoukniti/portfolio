import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing['6xl']} 0;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
  z-index: 0;
`;

const GlowOrb = styled(motion.div)<{ color: string; size: number; top: string; left: string }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${({ color }) => color};
  filter: blur(80px);
  opacity: 0.3;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  animation: ${pulse} 8s ease-in-out infinite;
  z-index: 0;
`;

const SpotlightEffect = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const Badge = styled(motion.div)`
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
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  backdrop-filter: blur(10px);

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 50%, rgba(99, 102, 241, 0.8) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientMove} 8s ease infinite;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  letter-spacing: -0.01em;
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StatsRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.background};

    &::before {
      opacity: 1;
    }

    svg {
      transform: translateX(4px);
    }
  }

  svg {
    transition: transform 0.3s;
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ theme }) => theme.colors.textMuted};
    transform: translateY(-2px);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-4px);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.textMuted}, transparent);
`;

const TechStack = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TechItem = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <HeroSection id="home" ref={containerRef}>
      <GridBackground />

      <GlowOrb color="#6366F1" size={400} top="-10%" left="10%" />
      <GlowOrb color="#818CF8" size={300} top="60%" left="80%" style={{ animationDelay: '-4s' }} />
      <GlowOrb color="#6366F1" size={200} top="80%" left="20%" style={{ animationDelay: '-2s' }} />

      <SpotlightEffect style={{ x: spotlightX, y: spotlightY }} />

      <div className="container">
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge variants={itemVariants}>
              <Sparkles />
              Available for new opportunities
            </Badge>

            <Name variants={itemVariants}>
              {portfolioData.fullName}
            </Name>

            <Title variants={itemVariants}>
              {portfolioData.headline}
            </Title>

            <Description variants={itemVariants}>
              Building scalable AI-powered products with modern architectures.
              Specializing in microservices, event-driven systems, and full-stack development.
            </Description>

            <StatsRow variants={itemVariants}>
              <Stat>
                <StatNumber>5+</StatNumber>
                <StatLabel>Years Exp.</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>15+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>20+</StatNumber>
                <StatLabel>Technologies</StatLabel>
              </Stat>
            </StatsRow>

            <ButtonGroup variants={itemVariants}>
              <PrimaryButton href="#experience">
                View my work
                <ArrowRight size={18} />
              </PrimaryButton>
              <SecondaryButton href={portfolioData.resumeUrl} download>
                <Download size={18} />
                Download CV
              </SecondaryButton>
            </ButtonGroup>

            <SocialLinks variants={itemVariants}>
              <SocialLink
                href={portfolioData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink
                href={portfolioData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </SocialLink>
              <SocialLink
                href={`mailto:${portfolioData.email}`}
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
              </SocialLink>
            </SocialLinks>

            <TechStack variants={itemVariants}>
              <TechItem>TypeScript</TechItem>
              <TechItem>NestJS</TechItem>
              <TechItem>Next.js</TechItem>
              <TechItem>AWS</TechItem>
              <TechItem>Kubernetes</TechItem>
              <TechItem>Kafka</TechItem>
            </TechStack>
          </motion.div>
        </HeroContent>
      </div>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Scroll
        <ScrollLine
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </ScrollIndicator>
    </HeroSection>
  );
};
