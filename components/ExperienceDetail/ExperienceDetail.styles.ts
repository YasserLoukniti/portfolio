import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

export const HeroSection = styled.section<{ $color: string }>`
  padding: 120px 0 60px;
  position: relative;
  background: linear-gradient(180deg, rgba(10, 10, 11, 0) 0%, ${({ theme }) => theme.colors.backgroundLight} 100%),
              radial-gradient(ellipse at 50% 0%, ${({ $color }) => $color}15 0%, transparent 70%);
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const BackButtonStyled = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 40px;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    color: #fff;
    transform: translateX(-4px);
  }
`;

export const HeroContent = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const CompanyLogo = styled(motion.div)<{ $color: string }>`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ $color }) => $color}30;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 16px;
  }

  svg {
    color: ${({ $color }) => $color};
  }
`;

export const HeroInfo = styled.div`
  flex: 1;
`;

export const JobTitle = styled(motion.h1)`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  line-height: 1.2;
`;

export const CompanyRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const CompanyLink = styled.a<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ $color }) => $color};
  font-weight: 600;
  font-size: 18px;
  transition: all 0.2s ease;
  text-decoration: none;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const CurrentBadge = styled(motion.span)<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: ${({ $color }) => $color}15;
  border-radius: 100px;
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
    animation: blink 1.5s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

export const TypeBadge = styled.span<{ $type: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $type }) => {
    switch ($type) {
      case 'full-time': return 'rgba(59, 130, 246, 0.15)';
      case 'freelance': return 'rgba(139, 92, 246, 0.15)';
      case 'internship': return 'rgba(245, 158, 11, 0.15)';
      default: return 'rgba(107, 114, 128, 0.15)';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'full-time': return '#60A5FA';
      case 'freelance': return '#A78BFA';
      case 'internship': return '#FBBF24';
      default: return '#9CA3AF';
    }
  }};
`;

export const MetaRow = styled(motion.div)`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

// Tabs
export const TabsSection = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.01);
  position: sticky;
  top: 60px;
  z-index: 10;
  backdrop-filter: blur(10px);
`;

export const TabsContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  gap: 4px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ $active: boolean; $color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: ${({ $active }) => $active ? '#fff' : 'rgba(255, 255, 255, 0.4)'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;

  svg {
    width: 18px;
    height: 18px;
    opacity: ${({ $active }) => $active ? 1 : 0.5};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $color }) => $color};
    transform: scaleX(${({ $active }) => $active ? 1 : 0});
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #fff;

    svg {
      opacity: 1;
    }
  }
`;

export const TabBadge = styled.span<{ $color: string }>`
  padding: 2px 8px;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// Content
export const ContentSection = styled.section`
  padding: 48px 0 80px;
`;

export const TabContent = styled(motion.div)``;

// Resume Tab
export const Description = styled.p`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 48px;
  max-width: 800px;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;

export const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
`;

export const CardHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  svg {
    color: ${({ $color }) => $color};
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export const CardCount = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
`;

export const ListItem = styled(motion.div)<{ $color: string }>`
  position: relative;
  padding-left: 20px;
  margin-bottom: 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    background: ${({ $color }) => $color};
    border-radius: 50%;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const AchievementItem = styled(motion.div)<{ $color: string }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: ${({ $color }) => $color}08;
  border: 1px solid ${({ $color }) => $color}15;
  border-radius: 12px;
  margin-bottom: 12px;

  svg {
    color: ${({ $color }) => $color};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// Technos Tab
export const TechCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TechCategory = styled.div``;

export const CategoryHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  svg {
    color: ${({ $color }) => $color};
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TechBadge = styled(motion.span)<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${({ $color }) => $color}15;
    border-color: ${({ $color }) => $color}30;
    color: #fff;
    transform: translateY(-2px);
  }
`;

export const AllTechsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const TechCount = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: ${({ $color }) => $color}10;
  border: 1px solid ${({ $color }) => $color}20;
  border-radius: 12px;
  margin-bottom: 24px;

  span {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }

  strong {
    color: ${({ $color }) => $color};
    font-weight: 700;
  }
`;

// Team Tab
export const TeamSection = styled.div`
  max-width: 800px;
`;

export const TeamCard = styled(motion.div)<{ $color: string }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
`;

export const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const TeamIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${({ $color }) => $color}15;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ $color }) => $color};
  }
`;

export const TeamInfo = styled.div``;

export const TeamTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
`;

export const TeamSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

export const TeamDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const TeamDetail = styled.div<{ $color: string }>`
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;

  h4 {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  p {
    font-size: 15px;
    color: #fff;
    margin: 0;
  }
`;

// Team Members Grid
export const TeamMembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

export const TeamMemberCard = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $color }) => $color}08;
    border-color: ${({ $color }) => $color}20;
  }
`;

export const TeamMemberCount = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const TeamMemberRole = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

// Navigation
export const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavButton = styled(Link)<{ $direction: 'prev' | 'next'; $color: string }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 320px;
  flex-direction: ${({ $direction }) => $direction === 'next' ? 'row-reverse' : 'row'};
  text-align: ${({ $direction }) => $direction === 'next' ? 'right' : 'left'};

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: ${({ $color }) => $color}30;
    transform: translateY(-2px);
  }

  svg {
    color: rgba(255, 255, 255, 0.4);
    transform: ${({ $direction }) => $direction === 'next' ? 'rotate(180deg)' : 'none'};
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const NavContent = styled.div``;

export const NavLabel = styled.span`
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
`;

export const NavTitle = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;

export const NotFound = styled.div`
  text-align: center;
  padding: 120px 24px;

  h2 {
    font-size: 24px;
    color: #fff;
    margin-bottom: 12px;
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 24px;
  }
`;
