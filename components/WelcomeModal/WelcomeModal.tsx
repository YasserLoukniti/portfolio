'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import * as S from './WelcomeModal.styles';

const STORAGE_KEY = 'portfolio_welcome_modal_seen';
const DISPLAY_DELAY_MS = 1500;
const EXPIRE_DURATION_MS = 60 * 60 * 1000; // 1 heure

const TITLE_TEXT = "Pourquoi lire quand vous pouvez me demander ?";
const DESCRIPTION_TEXT = "Mon clone IA repond instantanement a toutes vos questions. Experiences, projets, stack technique... allez-y.";
const TYPING_SPEED = 15; // ms par caractère

const suggestions = [
  "Parle-moi de ton parcours",
  "Quelle est ta stack technique ?",
  "Qu'as-tu construit chez Weneeds ?",
];

export const WelcomeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  const [titleComplete, setTitleComplete] = useState(false);
  const [descComplete, setDescComplete] = useState(false);
  const { openChat, openChatWithQuestion } = useChat();

  useEffect(() => {
    // TODO: Remettre la vérification après les tests
    // const lastSeen = localStorage.getItem(STORAGE_KEY);
    // if (lastSeen) {
    //   const elapsed = Date.now() - parseInt(lastSeen, 10);
    //   if (elapsed < EXPIRE_DURATION_MS) return;
    // }

    const timer = setTimeout(() => {
      // Reset typing animation
      setTitleIndex(0);
      setDescIndex(0);
      setTitleComplete(false);
      setDescComplete(false);
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

  const handleSuggestionClick = useCallback((question: string) => {
    handleClose();
    openChatWithQuestion(question);
  }, [handleClose, openChatWithQuestion]);

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

  // Animation typing pour le titre
  useEffect(() => {
    if (!isVisible || titleComplete) return;
    if (titleIndex < TITLE_TEXT.length) {
      const timer = setTimeout(() => setTitleIndex(titleIndex + 1), TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      setTitleComplete(true);
    }
  }, [isVisible, titleIndex, titleComplete]);

  // Animation typing pour la description (démarre après le titre)
  useEffect(() => {
    if (!titleComplete || descComplete) return;
    if (descIndex < DESCRIPTION_TEXT.length) {
      const timer = setTimeout(() => setDescIndex(descIndex + 1), TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      setDescComplete(true);
    }
  }, [titleComplete, descIndex, descComplete]);

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
              <S.Title>
                {titleComplete ? (
                  <S.TypingComplete>{TITLE_TEXT}</S.TypingComplete>
                ) : (
                  <S.TypingText>{TITLE_TEXT.slice(0, titleIndex)}</S.TypingText>
                )}
              </S.Title>

              <S.Description>
                {descComplete ? (
                  <S.TypingComplete>{DESCRIPTION_TEXT}</S.TypingComplete>
                ) : (
                  <S.TypingText>{DESCRIPTION_TEXT.slice(0, descIndex)}</S.TypingText>
                )}
              </S.Description>

              <S.SuggestionsGrid>
                {suggestions.map((suggestion, index) => (
                  <S.SuggestionButton
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {suggestion}
                  </S.SuggestionButton>
                ))}
              </S.SuggestionsGrid>

              <S.SecondaryButton
                onClick={handleClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Consulter le site classiquement
              </S.SecondaryButton>
            </S.ContentWrapper>
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};
