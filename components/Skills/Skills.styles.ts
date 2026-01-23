import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['6xl']} 0;
  position: relative;
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

export const SectionLabel = styled(motion.div)`
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

export const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const CardWrapper = styled(motion.div)<{ span?: number }>`
  perspective: 1000px;
  grid-column: span ${({ span }) => span || 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 1;
  }
`;

export const SkillCard = styled(motion.div)<{ featured?: boolean }>`
  position: relative;
  background: rgba(17, 17, 17, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 100%;
  transform-style: preserve-3d;
  transition: border-color 0.3s ease;
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

export const CardIcon = styled.div<{ color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ color }) => color || 'rgba(99, 102, 241, 0.1)'};
  border: 1px solid ${({ color }) => color ? `${color}40` : 'rgba(99, 102, 241, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: all 0.3s;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ color }) => color || '#6366F1'};
  }

  ${SkillCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${({ color }) => color ? `${color}30` : 'rgba(99, 102, 241, 0.2)'};
  }
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

export const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkillTag = styled(motion.span)<{ highlighted?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ highlighted }) => highlighted
    ? 'rgba(99, 102, 241, 0.15)'
    : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${({ highlighted, theme }) => highlighted
    ? 'rgba(99, 102, 241, 0.3)'
    : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ highlighted, theme }) => highlighted
    ? theme.colors.secondary
    : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.3s;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

export const TechStackSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: rgba(17, 17, 17, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TechStackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const TechStackTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const TechStackSubtitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TechStackGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TechBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.3s;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;
