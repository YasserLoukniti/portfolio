'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { profile } from '@/data/portfolio.data';
import * as S from './WelcomeModal.styles';

const STORAGE_KEY = 'portfolio_welcome_modal_seen';
const DISPLAY_DELAY_MS = 1500;
const EXPIRE_DURATION_MS = 60 * 60 * 1000; // 1 heure

const TITLE_TEXT = "Pourquoi lire quand vous pouvez me demander ?";
const TYPING_SPEED = 20;

const GREETING_MESSAGE = "Bonjour ! Posez-moi vos questions sur mon parcours, mes experiences ou mes competences techniques !";

const suggestions = [
  "Parle-moi de ton parcours",
  "Quelle est ta stack technique ?",
  "Je prefere voir le site",
];

export const WelcomeModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleComplete, setTitleComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { openChatWithQuestion } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // TODO: Remettre la vérification après les tests
    // const lastSeen = localStorage.getItem(STORAGE_KEY);
    // if (lastSeen) {
    //   const elapsed = Date.now() - parseInt(lastSeen, 10);
    //   if (elapsed < EXPIRE_DURATION_MS) return;
    // }

    const timer = setTimeout(() => {
      setTitleIndex(0);
      setTitleComplete(false);
      setShowMessage(false);
      setShowSuggestions(false);
      setIsVisible(true);
    }, DISPLAY_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

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

  // Afficher le message apres le titre
  useEffect(() => {
    if (titleComplete && !showMessage) {
      const timer = setTimeout(() => setShowMessage(true), 300);
      return () => clearTimeout(timer);
    }
  }, [titleComplete, showMessage]);

  // Afficher les suggestions apres le message
  useEffect(() => {
    if (showMessage && !showSuggestions) {
      const timer = setTimeout(() => setShowSuggestions(true), 400);
      return () => clearTimeout(timer);
    }
  }, [showMessage, showSuggestions]);

  // Focus sur l'input quand les suggestions apparaissent
  useEffect(() => {
    if (showSuggestions && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSuggestions]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    if (message === "Je prefere voir le site") {
      handleClose();
      return;
    }

    // Transition fluide vers le ChatModal
    setIsTransitioning(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());

    // Petit delai pour permettre l'animation de sortie
    setTimeout(() => {
      setIsVisible(false);
      openChatWithQuestion(message);
    }, 150);
  }, [handleClose, openChatWithQuestion]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      handleSendMessage(inputValue.trim());
    }
  }, [inputValue, handleSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

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
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <S.ModalContainer
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{
              opacity: isTransitioning ? 0 : 1,
              y: isTransitioning ? -10 : 0,
              scale: isTransitioning ? 1.02 : 1
            }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.CloseButton onClick={handleClose} aria-label="Fermer">
              <X size={20} />
            </S.CloseButton>

            <S.MessagesContainer>
              {/* Titre avec animation typing */}
              <S.Header>
                <S.Title>
                  {titleComplete ? (
                    TITLE_TEXT
                  ) : (
                    <S.TypingText>{TITLE_TEXT.slice(0, titleIndex)}<S.Cursor>|</S.Cursor></S.TypingText>
                  )}
                </S.Title>
              </S.Header>

              {/* Message du bot - apparait apres le titre */}
              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <S.MessageGroup>
                      <S.MessageAvatar>
                        <img src={profile.profileImage} alt={profile.fullName} />
                      </S.MessageAvatar>
                      <S.MessageBubble>
                        {GREETING_MESSAGE}
                      </S.MessageBubble>
                    </S.MessageGroup>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggestions - apparaissent apres le message */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <S.SuggestionsWrapper>
                      <S.SuggestionsGrid>
                        {suggestions.map((suggestion, index) => (
                          <S.SuggestionButton
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </S.SuggestionButton>
                        ))}
                      </S.SuggestionsGrid>
                    </S.SuggestionsWrapper>
                  </motion.div>
                )}
              </AnimatePresence>
            </S.MessagesContainer>

            {/* Input - apparait avec les suggestions */}
            <AnimatePresence>
              {showSuggestions && (
                <S.InputSection
                  as={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <S.TextArea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ecrivez votre message..."
                    rows={1}
                  />
                  <S.SendButton
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                    <span>Envoyer</span>
                  </S.SendButton>
                </S.InputSection>
              )}
            </AnimatePresence>
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};
