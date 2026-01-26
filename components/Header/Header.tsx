import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import { useChat } from '../../context/ChatContext';
import * as S from './Header.styles';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const { openChat } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'certifications'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: 'about', label: 'A propos' },
    { href: 'experience', label: 'Experiences' },
    { href: 'projects', label: 'Projets' },
    { href: 'skills', label: 'Competences' },
  ];

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <S.HeaderContainer
        scrolled={scrolled}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <S.HeaderInner scrolled={scrolled}>
          <S.NavWrapper scrolled={scrolled}>
            <S.NavLinks>
              {navItems.map((item) => (
                <S.NavItem key={item.href}>
                  <S.NavLinkStyled
                    href={`/#${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    $isActive={activeSection === item.href}
                  >
                    {item.label}
                    {activeSection === item.href && (
                      <S.ActiveDot
                        layoutId="activeDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </S.NavLinkStyled>
                </S.NavItem>
              ))}
            </S.NavLinks>

            <S.NavRight>
              <S.ContactButton
                href={`mailto:${portfolioData.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
                <ArrowUpRight />
              </S.ContactButton>
              <S.ChatButton
                onClick={openChat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle />
                Discuter
              </S.ChatButton>
            </S.NavRight>

            <S.MenuButton onClick={() => setIsMenuOpen(true)}>
              <Menu size={20} />
            </S.MenuButton>
          </S.NavWrapper>
        </S.HeaderInner>
      </S.HeaderContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <S.MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <S.CloseButton onClick={() => setIsMenuOpen(false)}>
              <X size={20} />
            </S.CloseButton>

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
            >
              {navItems.map((item) => (
                <S.MobileNavLink
                  key={item.href}
                  href={`/#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  variants={itemVariants}
                >
                  {item.label}
                </S.MobileNavLink>
              ))}
              <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <S.ContactButton
                  href={`mailto:${portfolioData.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                  <ArrowUpRight />
                </S.ContactButton>
                <S.ChatButton
                  onClick={() => { setIsMenuOpen(false); openChat(); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle />
                  Discuter
                </S.ChatButton>
              </motion.div>
            </motion.div>
          </S.MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};
