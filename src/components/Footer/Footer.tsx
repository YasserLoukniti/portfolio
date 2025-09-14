import React from 'react';
import styled from 'styled-components';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 102, 255, 0.3);
  }
`;

const Copyright = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterSection>
      <div className="container">
        <FooterContent>
          <SocialLinks>
            <SocialLink
              href={portfolioData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </SocialLink>
            <SocialLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={24} />
            </SocialLink>
            <SocialLink
              href="mailto:contact@example.com"
              aria-label="Email"
            >
              <Mail size={24} />
            </SocialLink>
          </SocialLinks>
          
          <Copyright>
            © {currentYear} {portfolioData.fullName}. Fait avec <span><Heart size={14} fill="currentColor" /> React & TypeScript</span>
          </Copyright>
        </FooterContent>
      </div>
    </FooterSection>
  );
};