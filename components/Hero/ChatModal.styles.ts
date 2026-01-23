import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const typing = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
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
  gap: 20px;

  @media (max-width: 640px) {
    padding: 60px 20px 20px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;

    &:hover {
      background: #ccc;
    }
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
`;

export const EmptyTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: #111;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 32px;
  max-width: 400px;
  line-height: 1.5;
`;

export const SuggestionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 500px;
`;

export const SuggestionButton = styled(motion.button)`
  padding: 12px 20px;
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 100px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f0f0f0;
    border-color: #ddd;
  }
`;

export const MessageGroup = styled.div<{ $role: 'user' | 'assistant' }>`
  display: flex;
  gap: 14px;
  justify-content: ${({ $role }) => $role === 'user' ? 'flex-end' : 'flex-start'};
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

export const MessageBubble = styled.div<{ $role: 'user' | 'assistant' }>`
  max-width: 70%;
  padding: 16px 20px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;

  ${({ $role }) =>
    $role === 'user'
      ? `
          background: #111;
          color: #fff;
          border-bottom-right-radius: 6px;
        `
      : `
          background: #f5f5f5;
          color: #111;
          border-bottom-left-radius: 6px;
        `}
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
`;

export const TypingDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: ${typing} 1s ease-in-out infinite;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
