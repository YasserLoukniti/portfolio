import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  background: ${({ scrolled, theme }) => 
    scrolled ? 'rgba(10, 14, 39, 0.95)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  transition: ${({ theme }) => theme.transitions.normal};
  border-bottom: ${({ scrolled, theme }) => 
    scrolled ? `1px solid ${theme.colors.border}` : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 70%;
    background: ${({ theme }) => theme.colors.backgroundLight};
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing['2xl']};
    transition: ${({ theme }) => theme.transitions.normal};
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  position: relative;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const MenuButton = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.text};
  z-index: ${({ theme }) => theme.zIndices.modal};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const ContactButton = styled.a`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'À propos' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#skills', label: 'Compétences' },
    { href: '#education', label: 'Formation' },
    { href: '#certifications', label: 'Certifications' },
  ];

  return (
    <HeaderContainer scrolled={scrolled}>
      <div className="container">
        <Nav>
          <Logo href="#home">YL</Logo>
          
          <NavLinks isOpen={isMenuOpen}>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <ContactButton 
                href="https://www.linkedin.com/in/yasser-loukniti-b121a218a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </ContactButton>
            </li>
          </NavLinks>
          
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MenuButton>
        </Nav>
      </div>
    </HeaderContainer>
  );
};