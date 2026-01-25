import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

export const ModalContainer = styled(motion.div)`
  width: 929px;
  height: 616px;
  max-width: 100%;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.3);

  @media (max-width: 960px) {
    width: 100%;
    height: 90vh;
    border-radius: 20px;
  }

  @media (max-width: 640px) {
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  z-index: 10;

  &:hover {
    background: #eee;
    color: #333;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 40px 40px;

  @media (max-width: 640px) {
    padding: 60px 20px 30px;
  }
`;

export const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  svg {
    width: 36px;
    height: 36px;
    color: white;
  }
`;

export const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: #111;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
  max-width: 600px;
  min-height: 36px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 32px;
  max-width: 600px;
  line-height: 1.5;
  min-height: 48px;
`;

export const TypingText = styled.span``;

export const TypingComplete = styled.span``;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
`;

export const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  background: #6366F1;
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #5558E3;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const SecondaryButton = styled(motion.button)`
  width: 100%;
  padding: 16px 24px;
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  color: #333;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f0f0f0;
    border-color: #ddd;
  }
`;

export const SuggestionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 24px;
`;

export const SuggestionButton = styled(motion.button)`
  padding: 12px 18px;
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #6366F1;
    border-color: #6366F1;
    color: #fff;
  }
`;
