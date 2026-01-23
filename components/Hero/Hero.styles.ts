import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

export const borderGradient = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

export const GridBackground = styled.div`
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

export const GlowOrb = styled(motion.div)<{ color: string; size: number; top: string; left: string }>`
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

export const SpotlightEffect = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

export const Name = styled(motion.h1)`
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

export const Title = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: -0.01em;
`;

export const StatsRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Stat = styled.div`
  text-align: center;
`;

export const StatNumber = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ChatInputSection = styled(motion.div)`
  max-width: 560px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

export const ChatInputWrapper = styled.div`
  position: relative;
  padding: 2px;
  border-radius: 18px;
  background: linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899, #6366F1);
  background-size: 300% 300%;
  animation: ${borderGradient} 3s ease infinite;
`;

export const ChatInputCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(10, 10, 10, 0.95);
  border-radius: 16px;
  padding: 8px 8px 8px 24px;
`;

export const ChatInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 14px 0;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 15px;
  letter-spacing: -0.01em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
  }
`;

export const ChatSubmitButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.9);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ScrollIndicator = styled(motion.div)`
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

export const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.textMuted}, transparent);
`;
