import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, User } from 'lucide-react';
import * as S from './HeroChat.styles';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// API is now on the same origin with Next.js

export const HeroChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          content: "Salut ! Je suis Yasser, Full Stack Developer. Posez-moi vos questions sur mon parcours, mes competences ou ma disponibilite !",
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
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
        content: "Desole, une erreur s'est produite. Reessayez ou contactez-moi directement par email !",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Quelles sont tes competences ?",
    "Tu es disponible ?",
    "C'est quoi ton salaire ?",
  ];

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <S.ChatContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <S.ChatHeader>
        <S.HeaderIcon>
          <User size={20} />
        </S.HeaderIcon>
        <S.HeaderText>
          <S.HeaderTitle>Discutez avec moi</S.HeaderTitle>
          <S.HeaderSubtitle>Posez-moi vos questions</S.HeaderSubtitle>
        </S.HeaderText>
        <S.OnlineIndicator />
      </S.ChatHeader>

      <S.MessagesContainer>
        {messages.map((message) => (
          <S.MessageWrapper key={message.id} $role={message.role}>
            {message.role === 'assistant' && (
              <S.MessageAvatar>
                <User size={14} />
              </S.MessageAvatar>
            )}
            <S.MessageBubble $role={message.role}>
              {message.content}
            </S.MessageBubble>
          </S.MessageWrapper>
        ))}
        {isLoading && (
          <S.MessageWrapper $role="assistant">
            <S.MessageAvatar>
              <User size={14} />
            </S.MessageAvatar>
            <S.MessageBubble $role="assistant">
              <S.TypingIndicator>
                <span></span>
                <span></span>
                <span></span>
              </S.TypingIndicator>
            </S.MessageBubble>
          </S.MessageWrapper>
        )}
        <div ref={messagesEndRef} />
      </S.MessagesContainer>

      {messages.length <= 1 && (
        <S.SuggestionsContainer>
          {suggestedQuestions.map((question, index) => (
            <S.SuggestionChip
              key={index}
              onClick={() => handleSuggestionClick(question)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={12} />
              {question}
            </S.SuggestionChip>
          ))}
        </S.SuggestionsContainer>
      )}

      <S.InputContainer>
        <S.Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question..."
          disabled={isLoading}
        />
        <S.SendButton
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={18} />
        </S.SendButton>
      </S.InputContainer>
    </S.ChatContainer>
  );
};

export default HeroChat;
