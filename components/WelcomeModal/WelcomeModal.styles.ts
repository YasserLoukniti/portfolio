import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

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

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 60px 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 640px) {
    padding: 60px 20px 20px;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #111;
  margin: 0;
  letter-spacing: -0.02em;
  min-height: 36px;

  @media (max-width: 640px) {
    font-size: 22px;
  }
`;

export const TypingText = styled.span``;

export const Cursor = styled.span`
  animation: ${blink} 1s infinite;
  font-weight: 300;
  color: #6366F1;
`;

export const MessageGroup = styled.div`
  display: flex;
  gap: 14px;
  justify-content: flex-start;
`;

export const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #111;
  overflow: hidden;
  flex-shrink: 0;
  align-self: flex-end;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 16px 20px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.6;
  background: #f5f5f5;
  color: #111;
  border-bottom-left-radius: 6px;
`;

export const SuggestionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 54px;
`;

export const SuggestionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  max-width: 500px;
`;

export const SuggestionButton = styled(motion.button)`
  padding: 12px 18px;
  background: #111;
  border: none;
  border-radius: 100px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #333;
  }
`;

export const InputSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 20px 40px 30px;
  background: #fff;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 640px) {
    padding: 16px 20px 24px;
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  background: #000;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 16px 20px;
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  min-height: 56px;
  max-height: 140px;
  transition: all 0.15s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #6366F1;
  }
`;

export const SendButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background: #6366F1;
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #5558E3;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    padding: 16px;

    span {
      display: none;
    }
  }
`;
