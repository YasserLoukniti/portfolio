import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import * as S from './Footer.styles';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <S.FooterSection>
      <div className="container">
        <S.FooterContent>
          <S.SocialLinks>
            <S.SocialLink
              href={portfolioData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </S.SocialLink>
            <S.SocialLink
              href={portfolioData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={24} />
            </S.SocialLink>
            <S.SocialLink
              href={`mailto:${portfolioData.email}`}
              aria-label="Email"
            >
              <Mail size={24} />
            </S.SocialLink>
          </S.SocialLinks>

          <S.Copyright>
            © {currentYear} {portfolioData.fullName}. Fait avec <span><Heart size={14} fill="currentColor" /> React & TypeScript</span>
          </S.Copyright>
        </S.FooterContent>
      </div>
    </S.FooterSection>
  );
};
