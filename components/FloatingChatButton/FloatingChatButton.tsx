'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styled from 'styled-components';
import { useChat } from '@/context/ChatContext';

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  z-index: 1000;
  color: white;

  &:hover {
    box-shadow: 0 6px 30px rgba(99, 102, 241, 0.6);
  }

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 56px;
    height: 56px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const Pulse = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.4);
  animation: pulse 2s ease-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

export const FloatingChatButton: React.FC = () => {
  const { openChat, isOpen } = useChat();

  if (isOpen) return null;

  return (
    <FloatingButton
      onClick={openChat}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Pulse />
      <MessageCircle />
    </FloatingButton>
  );
};
