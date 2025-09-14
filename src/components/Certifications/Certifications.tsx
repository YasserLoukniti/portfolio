import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, Shield } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const CertificationsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CertificationContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const CertificationCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
    height: 100px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23FFD700" font-size="60">🏆</text></svg>');
    background-size: contain;
    opacity: 0.1;
  }
`;

const CertificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF9900 0%, #FF6600 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: white;
  flex-shrink: 0;
`;

const CertificationInfo = styled.div`
  flex: 1;
`;

const CertificationName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Authority = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ValidityPeriod = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CertificationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const CredentialButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const BadgeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const LanguagesSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

const LanguagesTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const LanguagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const LanguageCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LanguageName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const LanguageLevel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: capitalize;
`;

export const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certification = portfolioData.certifications[0];

  return (
    <CertificationsSection id="certifications" ref={ref}>
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Certifications & Langues
        </SectionTitle>
        
        <CertificationContainer>
          <CertificationCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <CertificationHeader>
              <IconWrapper>
                <Award size={32} />
              </IconWrapper>
              <CertificationInfo>
                <CertificationName>{certification.name}</CertificationName>
                <Authority>
                  <Shield size={16} />
                  {certification.authority}
                </Authority>
                <ValidityPeriod>
                  <Calendar size={14} />
                  {certification.issued}
                </ValidityPeriod>
              </CertificationInfo>
            </CertificationHeader>
            
            <CertificationFooter>
              <BadgeInfo>
                <Award size={16} />
                Certification Officielle AWS
              </BadgeInfo>
              <CredentialButton
                href={certification.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le Credential
                <ExternalLink size={16} />
              </CredentialButton>
            </CertificationFooter>
          </CertificationCard>
          
          <LanguagesSection
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LanguagesTitle>Langues</LanguagesTitle>
            <LanguagesGrid>
              {portfolioData.languages.map((language, index) => (
                <LanguageCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <LanguageName>{language.name}</LanguageName>
                  <LanguageLevel>{language.proficiency}</LanguageLevel>
                </LanguageCard>
              ))}
            </LanguagesGrid>
          </LanguagesSection>
        </CertificationContainer>
      </div>
    </CertificationsSection>
  );
};