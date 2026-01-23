import styled from 'styled-components';
import { motion } from 'framer-motion';

export const EducationSection = styled.section`
  padding: 100px 0;
  position: relative;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const SectionHeader = styled.div`
  margin-bottom: 48px;
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

export const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 16px;
`;

export const SectionDescription = styled(motion.p)`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  max-width: 500px;
`;

export const EducationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EducationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-4px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
`;

export const SchoolLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }

  ${EducationCard}:hover & {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

export const SchoolInfo = styled.div`
  flex: 1;
`;

export const School = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

export const Institution = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
`;

export const Degree = styled.h4`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
`;

export const Field = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
`;

export const DateRange = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-bottom: 16px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;
