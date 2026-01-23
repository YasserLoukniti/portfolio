import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { profile } from '../../data/portfolio.data';
import * as S from './ChatModal.styles';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

// Simple markdown parser for chat messages
const parseMarkdown = (text: string): React.ReactNode => {
  const elements: React.ReactNode[] = [];
  let key = 0;
  const markdownRegex = /(\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_(.+?)_)/g;
  let lastIndex = 0;
  let match;

  while ((match = markdownRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const fullMatch = match[0];
    if (match[2]) {
      elements.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      elements.push(<strong key={key++}>{match[3]}</strong>);
    } else if (match[4]) {
      elements.push(<code key={key++} style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }}>{match[4]}</code>);
    } else if (match[5]) {
      elements.push(<em key={key++}>{match[5]}</em>);
    } else if (match[6]) {
      elements.push(<em key={key++}>{match[6]}</em>);
    }
    lastIndex = match.index + fullMatch.length;
  }
  if (lastIndex < text.length) {
    elements.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return elements.length > 0 ? elements : text;
};

// API is now on the same origin with Next.js

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, initialQuestion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && initialQuestion && !hasInitialized) {
      setHasInitialized(true);
      setTimeout(() => {
        sendMessageInternal(initialQuestion);
      }, 300);
    }
  }, [isOpen, initialQuestion, hasInitialized]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setSessionId(null);
      setHasInitialized(false);
    }
  }, [isOpen]);

  const sendMessageInternal = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Une erreur s'est produite. Contactez-moi directement a yass_official@outlook.fr",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const message = inputValue.trim();
    setInputValue('');
    await sendMessageInternal(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessageInternal(question);
  };

  const suggestions = [
    "Parle-moi de ton parcours",
    "Quelle est ta stack technique ?",
    "Qu'as-tu construit chez Weneeds ?",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <S.ModalContainer
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.CloseButton onClick={onClose} aria-label="Fermer">
              <X size={20} />
            </S.CloseButton>

            <S.MessagesContainer>
              {messages.length === 0 && !isLoading && (
                <S.EmptyState>
                  <S.EmptyTitle>Je suis le clone IA de Yasser</S.EmptyTitle>
                  <S.EmptyText>
                    Posez-moi vos questions sur mon parcours, mes experiences ou mes competences techniques !
                  </S.EmptyText>
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
                </S.EmptyState>
              )}

              {messages.map((message) => (
                <S.MessageGroup key={message.id} $role={message.role}>
                  {message.role === 'assistant' && (
                    <S.MessageAvatar>
                      <img src={profile.profileImage} alt={profile.fullName} />
                    </S.MessageAvatar>
                  )}
                  <S.MessageBubble $role={message.role}>
                    {message.role === 'assistant' ? parseMarkdown(message.content) : message.content}
                  </S.MessageBubble>
                </S.MessageGroup>
              ))}

              {isLoading && (
                <S.MessageGroup $role="assistant">
                  <S.MessageAvatar>
                    <img src={profile.profileImage} alt={profile.fullName} />
                  </S.MessageAvatar>
                  <S.MessageBubble $role="assistant">
                    <S.TypingIndicator>
                      <S.TypingDot style={{ animationDelay: '0ms' }} />
                      <S.TypingDot style={{ animationDelay: '150ms' }} />
                      <S.TypingDot style={{ animationDelay: '300ms' }} />
                    </S.TypingIndicator>
                  </S.MessageBubble>
                </S.MessageGroup>
              )}
              <div ref={messagesEndRef} />
            </S.MessagesContainer>

            <S.InputSection>
              <S.TextArea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ecrivez votre message..."
                disabled={isLoading}
                rows={1}
              />
              <S.SendButton
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
                <span>Envoyer</span>
              </S.SendButton>
            </S.InputSection>
          </S.ModalContainer>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
