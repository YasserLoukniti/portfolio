import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  isOpen: boolean;
  initialQuestion: string;
  openChat: () => void;
  openChatWithQuestion: (question: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
  clearInitialQuestion: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState('');

  const openChat = () => setIsOpen(true);
  const openChatWithQuestion = (question: string) => {
    setInitialQuestion(question);
    setIsOpen(true);
  };
  const closeChat = () => {
    setIsOpen(false);
    setInitialQuestion('');
  };
  const toggleChat = () => setIsOpen((prev) => !prev);
  const clearInitialQuestion = () => setInitialQuestion('');

  return (
    <ChatContext.Provider value={{ isOpen, initialQuestion, openChat, openChatWithQuestion, closeChat, toggleChat, clearInitialQuestion }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
