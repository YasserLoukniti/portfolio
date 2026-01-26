import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import { ChatModal } from './ChatModal';
import { useChat } from '../../context/ChatContext';
import * as S from './Hero.styles';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [question, setQuestion] = useState('');
  const { isOpen: isChatOpen, initialQuestion, openChat, openChatWithQuestion, closeChat } = useChat();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmitQuestion = () => {
    if (question.trim()) {
      openChatWithQuestion(question.trim());
      setQuestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitQuestion();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <S.HeroSection id="home" ref={containerRef}>
      <S.GridBackground />

      <S.GlowOrb color="#6366F1" size={400} top="-10%" left="10%" />
      <S.GlowOrb color="#818CF8" size={300} top="60%" left="80%" style={{ animationDelay: '-4s' }} />
      <S.GlowOrb color="#6366F1" size={200} top="80%" left="20%" style={{ animationDelay: '-2s' }} />

      <S.SpotlightEffect style={{ x: spotlightX, y: spotlightY }} />

      <div className="container">
        <S.HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <S.Name variants={itemVariants}>
              {portfolioData.fullName}
            </S.Name>

            <S.Title variants={itemVariants}>
              {portfolioData.headline}
            </S.Title>

            <S.ChatInputSection variants={itemVariants}>
              <S.ChatInputWrapper>
                <S.ChatInputCard>
                  <S.ChatInput
                    type="text"
                    placeholder="Mon IA vous repond a ma place - Posez vos questions !"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <S.ChatSubmitButton
                    onClick={handleSubmitQuestion}
                    disabled={!question.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send />
                  </S.ChatSubmitButton>
                </S.ChatInputCard>
              </S.ChatInputWrapper>
            </S.ChatInputSection>

            <S.StatsRow variants={itemVariants}>
              <S.Stat>
                <S.StatNumber>5+</S.StatNumber>
                <S.StatLabel>Years Exp.</S.StatLabel>
              </S.Stat>
              <S.Stat>
                <S.StatNumber>15+</S.StatNumber>
                <S.StatLabel>Projects</S.StatLabel>
              </S.Stat>
              <S.Stat>
                <S.StatNumber>20+</S.StatNumber>
                <S.StatLabel>Technologies</S.StatLabel>
              </S.Stat>
            </S.StatsRow>

          </motion.div>
        </S.HeroContent>
      </div>

      <S.ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Scroll
        <S.ScrollLine
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </S.ScrollIndicator>

      <ChatModal
        isOpen={isChatOpen}
        onClose={closeChat}
        initialQuestion={initialQuestion}
      />
    </S.HeroSection>
  );
};
