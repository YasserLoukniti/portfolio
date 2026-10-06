import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
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
  // Regex pour: liens [text](url), gras **text**, code `text`, italique *text*
  const markdownRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|__(.+?)__|`([^`]+)`|\*(.+?)\*|_([^_]+)_)/g;
  let lastIndex = 0;
  let match;

  while ((match = markdownRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const fullMatch = match[0];
    if (match[2] && match[3]) {
      // Lien markdown [text](url)
      const isExternal = match[3].startsWith('http');
      elements.push(
        <a
          key={key++}
          href={match[3]}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{ color: '#6366F1', textDecoration: 'underline' }}
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      elements.push(<strong key={key++}>{match[4]}</strong>);
    } else if (match[5]) {
      elements.push(<strong key={key++}>{match[5]}</strong>);
    } else if (match[6]) {
      elements.push(<code key={key++} style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }}>{match[6]}</code>);
    } else if (match[7]) {
      elements.push(<em key={key++}>{match[7]}</em>);
    } else if (match[8]) {
      elements.push(<em key={key++}>{match[8]}</em>);
    }
    lastIndex = match.index + fullMatch.length;
  }
  if (lastIndex < text.length) {
    elements.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return elements.length > 0 ? elements : text;
};

const ERROR_MESSAGE = `Une erreur s'est produite. Contactez-moi directement à ${profile.email}`;

/**
 * Lit la réponse NDJSON de /api/chat et appelle onToken pour chaque morceau de texte.
 * Renvoie le sessionId reçu à la fin du flux.
 */
async function readChatStream(response: Response, onToken: (token: string) => void): Promise<string | null> {
  if (!response.body) throw new Error('Empty response body');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let sessionId: string | null = null;

  const handleLine = (line: string) => {
    if (!line.trim()) return;
    const event = JSON.parse(line);
    if (event.type === 'token') onToken(event.content);
    else if (event.type === 'done') sessionId = event.sessionId;
    else if (event.type === 'error') throw new Error(event.error);
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    lines.forEach(handleLine);
  }
  handleLine(buffer);
  return sessionId;
}

// API is now on the same origin with Next.js

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, initialQuestion }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // en attente du premier morceau
  const [isStreaming, setIsStreaming] = useState(false); // réponse en cours d'affichage
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll instantané pendant le streaming (un scroll fluide par morceau saccade)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: isStreaming ? 'auto' : 'smooth' });
  }, [messages, isStreaming]);

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
    setIsStreaming(true);

    const assistantId = (Date.now() + 1).toString();
    let started = false;

    // Ajoute le morceau reçu au message de l'assistant (créé au premier morceau)
    const appendToken = (token: string) => {
      if (!started) {
        started = true;
        setIsLoading(false);
        setMessages((prev) => [...prev, { id: assistantId, content: token, role: 'assistant', timestamp: new Date() }]);
        return;
      }
      setMessages((prev) => prev.map((msg) =>
        msg.id === assistantId ? { ...msg, content: msg.content + token } : msg
      ));
    };

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
        // Rate limit, message trop long... : on affiche la raison donnée par l'API
        const data = await response.json().catch(() => null);
        appendToken(response.status === 429 && data?.error ? data.error : ERROR_MESSAGE);
        return;
      }

      const newSessionId = await readChatStream(response, appendToken);
      if (newSessionId) {
        setSessionId(newSessionId);
      }
      if (!started) appendToken(ERROR_MESSAGE);
    } catch (error) {
      console.error('Error sending message:', error);
      appendToken(started ? `\n\n${ERROR_MESSAGE}` : ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return;
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
                    Posez-moi vos questions sur mon parcours, mes expériences ou mes compétences techniques !
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
                      <Image src={profile.profileImage} alt={profile.fullName} width={80} height={80} />
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
                    <Image src={profile.profileImage} alt={profile.fullName} width={80} height={80} />
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
                placeholder="Écrivez votre message..."
                maxLength={1000}
                disabled={isStreaming}
                rows={1}
              />
              <S.SendButton
                onClick={sendMessage}
                disabled={!inputValue.trim() || isStreaming}
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
