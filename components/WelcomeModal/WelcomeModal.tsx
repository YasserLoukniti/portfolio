'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import * as S from './WelcomeModal.styles';

const STORAGE_KEY = 'portfolio_welcome_modal_seen';
const DISPLAY_DELAY_MS = 1500;
const EXPIRE_DURATION_MS = 60 * 60 * 1000; // 1 heure

export const WelcomeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openChat } = useChat();

  useEffect(() => {
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    if (lastSeen) {
      const elapsed = Date.now() - parseInt(lastSeen, 10);
      if (elapsed < EXPIRE_DURATION_MS) return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, DISPLAY_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }, []);

  const handleStartChat = useCallback(() => {
    handleClose();
    openChat();
  }, [handleClose, openChat]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, handleClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <S.ModalContainer
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.CloseButton onClick={handleClose} aria-label="Fermer">
              <X size={20} />
            </S.CloseButton>

            <S.ContentWrapper>
              <S.IconWrapper>
                <Sparkles />
              </S.IconWrapper>

              <S.Title>
                Et si on changeait notre facon d&apos;interagir avec les donnees ?
              </S.Title>

              <S.Description>
                Je suis le clone IA de Yasser. Posez-moi toutes vos questions sur
                son parcours, ses experiences ou ses competences - je vous reponds
                directement !
              </S.Description>

              <S.ButtonGroup>
                <S.PrimaryButton
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={20} />
                  Commencer a discuter
                </S.PrimaryButton>
                <S.SecondaryButton
                  onClick={handleClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Consulter le site classiquement
                </S.SecondaryButton>
              </S.ButtonGroup>
            </S.ContentWrapper>
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};
