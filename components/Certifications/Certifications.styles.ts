import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CertificationsSection = styled.section`
  padding: 100px 0;
  position: relative;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 64px;
  }
`;

export const CertificationsColumn = styled(motion.div)``;

export const ColumnHeader = styled.div`
  margin-bottom: 32px;
`;

export const Label = styled(motion.span)`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
`;

export const ColumnTitle = styled(motion.h2)`
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

export const CertificationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 28px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-4px);
  }
`;

export const CertHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
`;

export const CertIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 153, 0, 0.15) 0%, rgba(255, 102, 0, 0.15) 100%);
  border: 1px solid rgba(255, 153, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: #FF9900;
    width: 24px;
    height: 24px;
  }
`;

export const CertInfo = styled.div`
  flex: 1;
`;

export const CertName = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

export const CertAuthority = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
`;

export const CertMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const CertDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const CertLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border-radius: 8px;
  color: #0a0a0a;
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const LanguagesColumn = styled(motion.div)``;

export const LanguagesGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const LanguageCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 20px 24px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
  }
`;

export const LanguageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LanguageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const LanguageName = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #fff;
`;

export const LanguageLevel = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: capitalize;
`;

export const LevelDots = styled.div`
  display: flex;
  gap: 4px;
`;

export const LevelDot = styled.div<{ $filled: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $filled }) =>
    $filled ? '#fff' : 'rgba(255, 255, 255, 0.1)'};
`;
