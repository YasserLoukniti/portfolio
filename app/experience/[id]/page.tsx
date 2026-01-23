'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Building2,
  Users,
  ArrowLeft,
  Code,
  Server,
  Cloud,
  Cpu,
  Globe,
  Layers,
  FileText,
  Network,
  Briefcase,
  CheckCircle,
} from 'lucide-react';
import { database } from '@/data/portfolio.data';
import { WeneedsArchitecture } from '@/components/Experience/WeneedsArchitecture';

// Company colors
const companyColors: { [key: string]: string } = {
  'Weneeds': '#6366F1',
  'Capgemini': '#0070AD',
  '42c': '#FF6B00',
  'Freelance': '#10B981',
  'default': '#6366F1'
};

const getCompanyColor = (company: string) => {
  return companyColors[company] || companyColors['default'];
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0A0A0B;
`;

const HeroSection = styled.section<{ $color: string }>`
  padding: 120px 0 60px;
  position: relative;
  background: linear-gradient(180deg, rgba(10, 10, 11, 0) 0%, #0A0A0B 100%),
              radial-gradient(ellipse at 50% 0%, ${({ $color }) => $color}15 0%, transparent 70%);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;

const BackButtonStyled = styled(Link)`
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

const HeroContent = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CompanyLogo = styled(motion.div)<{ $color: string }>`
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

const HeroInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled(motion.h1)`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  line-height: 1.2;
`;

const CompanyRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CompanyLink = styled.a<{ $color: string }>`
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

const CurrentBadge = styled(motion.span)<{ $color: string }>`
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

const TypeBadge = styled.span<{ $type: string }>`
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

const MetaRow = styled(motion.div)`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MetaItem = styled.div`
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
const TabsSection = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.01);
  position: sticky;
  top: 60px;
  z-index: 10;
  backdrop-filter: blur(10px);
`;

const TabsContainer = styled.div`
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

const TabButton = styled.button<{ $active: boolean; $color: string }>`
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

const TabBadge = styled.span<{ $color: string }>`
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
const ContentSection = styled.section`
  padding: 48px 0 80px;
`;

const TabContent = styled(motion.div)``;

// Resume Tab
const Description = styled.p`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 48px;
  max-width: 800px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
`;

const CardHeader = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  svg {
    color: ${({ $color }) => $color};
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const CardCount = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
`;

const ListItem = styled(motion.div)<{ $color: string }>`
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

const AchievementItem = styled(motion.div)<{ $color: string }>`
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
const TechCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TechCategory = styled.div``;

const CategoryHeader = styled.div<{ $color: string }>`
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

const CategoryTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TechBadge = styled(motion.span)<{ $color: string }>`
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

const AllTechsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const TechCount = styled.div<{ $color: string }>`
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

// Architecture Tab
const ArchitectureContainer = styled.div`
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
`;

// Team Tab
const TeamSection = styled.div`
  max-width: 800px;
`;

const TeamCard = styled(motion.div)<{ $color: string }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const TeamIcon = styled.div<{ $color: string }>`
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

const TeamInfo = styled.div``;

const TeamTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
`;

const TeamSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

const TeamDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const TeamDetail = styled.div<{ $color: string }>`
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
const TeamMembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

const TeamMemberCard = styled.div<{ $color: string }>`
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

const TeamMemberCount = styled.span<{ $color: string }>`
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

const TeamMemberRole = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

// Navigation
const NavigationSection = styled.div`
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

const NavButton = styled(Link)<{ $direction: 'prev' | 'next'; $color: string }>`
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

const NavContent = styled.div``;

const NavLabel = styled.span`
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
`;

const NavTitle = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;

const NotFound = styled.div`
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

// Tech icon mappings
const techIcons: { [key: string]: string } = {
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'React': 'react',
  'React.js': 'react',
  'Next.js': 'nextdotjs',
  'Next.js 14': 'nextdotjs',
  'Node.js': 'nodedotjs',
  'NestJS': 'nestjs',
  'Express.js': 'express',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Elasticsearch': 'elasticsearch',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'AWS': 'amazonwebservices',
  'AWS EKS': 'amazoneks',
  'Terraform': 'terraform',
  'Python': 'python',
  'FastAPI': 'fastapi',
  'Django': 'django',
  'PHP': 'php',
  'Symfony': 'symfony',
  'MySQL': 'mysql',
  'Git': 'git',
  'GitHub Actions': 'githubactions',
  'Jest': 'jest',
  'Cypress': 'cypress',
  'Redux Toolkit': 'redux',
  'Socket.IO': 'socketdotio',
  'Stripe': 'stripe',
  'Jenkins': 'jenkins',
  'Material UI': 'mui',
  'Bootstrap': 'bootstrap',
  'SASS': 'sass',
  'styled-components': 'styledcomponents'
};

// Helper function to parse responsibility with category
const parseResponsibility = (resp: string): { category: string | null; text: string } => {
  const match = resp.match(/^(BACKEND|FRONTEND|INFRA|AI\/ML):\s*(.+)$/);
  if (match) {
    return { category: match[1], text: match[2] };
  }
  return { category: null, text: resp };
};

type TabType = 'resume' | 'technos' | 'architecture' | 'equipe';

export default function ExperienceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [activeTab, setActiveTab] = useState<TabType>('resume');

  const experience = database.experiences.find(exp => exp.id === id);
  const currentIndex = database.experiences.findIndex(exp => exp.id === id);
  const prevExperience = currentIndex > 0 ? database.experiences[currentIndex - 1] : null;
  const nextExperience = currentIndex < database.experiences.length - 1 ? database.experiences[currentIndex + 1] : null;

  const isWeneeds = id === 'weneeds';
  const color = experience ? getCompanyColor(experience.company) : '#6366F1';

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('resume');
  }, [id]);

  if (!experience) {
    return (
      <PageContainer>
        <Container>
          <NotFound>
            <h2>Experience non trouvee</h2>
            <p>Cette experience n&apos;existe pas.</p>
            <BackButtonStyled href="/#experience">
              <ArrowLeft size={18} />
              Retour aux experiences
            </BackButtonStyled>
          </NotFound>
        </Container>
      </PageContainer>
    );
  }

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  const getContractType = (type: string) => {
    switch (type) {
      case 'full-time': return 'CDI';
      case 'contract': return 'CDD';
      case 'freelance': return 'Freelance';
      case 'internship': return 'Stage';
      default: return type;
    }
  };

  // Group responsibilities by category
  const groupedResponsibilities = experience.responsibilities?.reduce((acc, resp) => {
    const { category, text } = parseResponsibility(resp);
    const key = category || 'general';
    if (!acc[key]) acc[key] = [];
    acc[key].push(text);
    return acc;
  }, {} as Record<string, string[]>) || {};

  const categoryConfig: Record<string, { icon: React.ReactNode; title: string }> = {
    'BACKEND': { icon: <Server size={18} />, title: 'Backend' },
    'FRONTEND': { icon: <Globe size={18} />, title: 'Frontend' },
    'INFRA': { icon: <Cloud size={18} />, title: 'Infrastructure' },
    'AI/ML': { icon: <Cpu size={18} />, title: 'AI & ML' },
    'general': { icon: <Briefcase size={18} />, title: 'Responsabilites' }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
    { id: 'technos', label: 'Technos', icon: <Code size={18} /> },
    ...(isWeneeds ? [{ id: 'architecture' as TabType, label: 'Architecture', icon: <Network size={18} />, badge: 'NEW' }] : []),
    { id: 'equipe', label: 'Equipe', icon: <Users size={18} /> }
  ];

  const prevColor = prevExperience ? getCompanyColor(prevExperience.company) : color;
  const nextColor = nextExperience ? getCompanyColor(nextExperience.company) : color;

  return (
    <PageContainer>
      {/* Hero */}
      <HeroSection $color={color}>
        <Container>
          <BackButtonStyled href="/#experience">
            <ArrowLeft size={18} />
            Retour aux experiences
          </BackButtonStyled>

          <HeroContent>
            <CompanyLogo
              $color={color}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {experience.companyLogo ? (
                <img src={experience.companyLogo} alt={experience.company} />
              ) : (
                <Building2 size={40} />
              )}
            </CompanyLogo>

            <HeroInfo>
              <JobTitle
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {experience.title}
              </JobTitle>

              <CompanyRow
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <CompanyLink
                  href={experience.companyUrl || '#'}
                  target={experience.companyUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  $color={color}
                  as={experience.companyUrl ? 'a' : 'span'}
                >
                  {experience.company}
                  {experience.companyUrl && <ExternalLink />}
                </CompanyLink>

                {experience.isCurrent && (
                  <CurrentBadge $color={color}>Actuel</CurrentBadge>
                )}

                <TypeBadge $type={experience.type}>
                  {getContractType(experience.type)}
                </TypeBadge>
              </CompanyRow>

              <MetaRow
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <MetaItem>
                  <Calendar />
                  {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                </MetaItem>
                <MetaItem>
                  <MapPin />
                  {experience.location.city}, {experience.location.country}
                </MetaItem>
              </MetaRow>
            </HeroInfo>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Tabs */}
      <TabsSection>
        <TabsContainer>
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              $active={activeTab === tab.id}
              $color={color}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && <TabBadge $color={color}>{tab.badge}</TabBadge>}
            </TabButton>
          ))}
        </TabsContainer>
      </TabsSection>

      {/* Content */}
      <ContentSection>
        <Container>
          <AnimatePresence mode="wait">
            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <TabContent
                key="resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Description>{experience.description}</Description>

                {/* Responsibilities by category */}
                {Object.keys(groupedResponsibilities).length > 0 && (
                  <CardsGrid>
                    {['BACKEND', 'FRONTEND', 'INFRA', 'AI/ML', 'general'].map(category => {
                      const items = groupedResponsibilities[category];
                      if (!items || items.length === 0) return null;
                      const config = categoryConfig[category];

                      return (
                        <Card
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <CardHeader $color={color}>
                            {config.icon}
                            <CardTitle>{config.title}</CardTitle>
                            <CardCount>{items.length}</CardCount>
                          </CardHeader>
                          {items.slice(0, 5).map((item, index) => (
                            <ListItem key={index} $color={color}>
                              {item}
                            </ListItem>
                          ))}
                          {items.length > 5 && (
                            <ListItem $color={color} style={{ opacity: 0.5 }}>
                              +{items.length - 5} autres...
                            </ListItem>
                          )}
                        </Card>
                      );
                    })}
                  </CardsGrid>
                )}

                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <Card
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <CardHeader $color={color}>
                      <Award size={20} />
                      <CardTitle>Realisations cles</CardTitle>
                    </CardHeader>
                    {experience.achievements.map((achievement, index) => (
                      <AchievementItem key={index} $color={color}>
                        <CheckCircle size={18} />
                        <p>{achievement}</p>
                      </AchievementItem>
                    ))}
                  </Card>
                )}

                {/* Navigation */}
                <NavigationSection>
                  {prevExperience ? (
                    <NavButton href={`/experience/${prevExperience.id}`} $direction="prev" $color={prevColor}>
                      <ArrowLeft size={20} />
                      <NavContent>
                        <NavLabel>Precedente</NavLabel>
                        <NavTitle>{prevExperience.company}</NavTitle>
                      </NavContent>
                    </NavButton>
                  ) : <div />}

                  {nextExperience && (
                    <NavButton href={`/experience/${nextExperience.id}`} $direction="next" $color={nextColor}>
                      <ArrowLeft size={20} />
                      <NavContent>
                        <NavLabel>Suivante</NavLabel>
                        <NavTitle>{nextExperience.company}</NavTitle>
                      </NavContent>
                    </NavButton>
                  )}
                </NavigationSection>
              </TabContent>
            )}

            {/* Technos Tab */}
            {activeTab === 'technos' && (
              <TabContent
                key="technos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TechCount $color={color}>
                  <Code size={18} />
                  <span>Stack technique : <strong>{experience.technologies.length} technologies</strong></span>
                </TechCount>

                {/* Show stack details if available */}
                {(experience as any).stackDetails && (
                  <TechCategories>
                    {Object.entries((experience as any).stackDetails).map(([category, techs], index) => (
                      <TechCategory key={category}>
                        <CategoryHeader $color={color}>
                          {category === 'Frontend' && <Globe size={18} />}
                          {category === 'Backend API' && <Server size={18} />}
                          {category === 'Microservices' && <Layers size={18} />}
                          {category === 'AI/ML' && <Cpu size={18} />}
                          {category === 'Infrastructure' && <Cloud size={18} />}
                          {category === 'Messaging' && <Network size={18} />}
                          <CategoryTitle>{category}</CategoryTitle>
                        </CategoryHeader>
                        <TechGrid>
                          {(techs as string[]).map((tech, techIndex) => (
                            <TechBadge
                              key={techIndex}
                              $color={color}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 + techIndex * 0.02 }}
                            >
                              {techIcons[tech] && (
                                <img
                                  src={`https://cdn.simpleicons.org/${techIcons[tech]}`}
                                  alt={tech}
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              )}
                              {tech}
                            </TechBadge>
                          ))}
                        </TechGrid>
                      </TechCategory>
                    ))}
                  </TechCategories>
                )}

                {/* All technologies */}
                <AllTechsGrid>
                  {experience.technologies.map((tech, index) => (
                    <TechBadge
                      key={index}
                      $color={color}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                    >
                      {techIcons[tech] && (
                        <img
                          src={`https://cdn.simpleicons.org/${techIcons[tech]}`}
                          alt={tech}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      {tech}
                    </TechBadge>
                  ))}
                </AllTechsGrid>
              </TabContent>
            )}

            {/* Architecture Tab (Weneeds only) */}
            {activeTab === 'architecture' && isWeneeds && (
              <TabContent
                key="architecture"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ArchitectureContainer>
                  <WeneedsArchitecture />
                </ArchitectureContainer>
              </TabContent>
            )}

            {/* Equipe Tab */}
            {activeTab === 'equipe' && (
              <TabContent
                key="equipe"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TeamSection>
                  {/* Team Composition */}
                  <TeamCard $color={color}>
                    <TeamHeader>
                      <TeamIcon $color={color}>
                        <Users size={28} />
                      </TeamIcon>
                      <TeamInfo>
                        <TeamTitle>Composition de l&apos;equipe</TeamTitle>
                        <TeamSubtitle>
                          {(experience as any).team?.size || 1} membre{((experience as any).team?.size || 1) > 1 ? 's' : ''}
                          {(experience as any).team?.methodology && ` - ${(experience as any).team.methodology}`}
                        </TeamSubtitle>
                      </TeamInfo>
                    </TeamHeader>

                    {(experience as any).team?.members && (
                      <TeamMembersGrid>
                        {(experience as any).team.members.map((member: { role: string; count: number }, index: number) => (
                          <TeamMemberCard key={index} $color={color}>
                            <TeamMemberCount $color={color}>{member.count}</TeamMemberCount>
                            <TeamMemberRole>{member.role}</TeamMemberRole>
                          </TeamMemberCard>
                        ))}
                      </TeamMembersGrid>
                    )}
                  </TeamCard>

                  {/* Company Info */}
                  <TeamCard $color={color}>
                    <TeamHeader>
                      <TeamIcon $color={color}>
                        <Building2 size={28} />
                      </TeamIcon>
                      <TeamInfo>
                        <TeamTitle>{experience.company}</TeamTitle>
                        <TeamSubtitle>Entreprise</TeamSubtitle>
                      </TeamInfo>
                    </TeamHeader>

                    <TeamDetails>
                      <TeamDetail $color={color}>
                        <h4>Secteur</h4>
                        <p>
                          {experience.company === 'Weneeds' && 'Recrutement / IA'}
                          {experience.company === 'Capgemini' && 'Conseil / IT Services'}
                          {experience.company === '42c' && 'Conseil / Recrutement Tech'}
                          {!['Weneeds', 'Capgemini', '42c'].includes(experience.company) && 'Tech'}
                        </p>
                      </TeamDetail>
                      <TeamDetail $color={color}>
                        <h4>Localisation</h4>
                        <p>{experience.location.city}, {experience.location.country}</p>
                      </TeamDetail>
                      <TeamDetail $color={color}>
                        <h4>Mode de travail</h4>
                        <p>{experience.location.remote === 'remote' ? 'Full Remote' : experience.location.remote === 'hybrid' ? 'Hybride' : 'Sur site'}</p>
                      </TeamDetail>
                      {experience.companyUrl && (
                        <TeamDetail $color={color}>
                          <h4>Site web</h4>
                          <p>
                            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" style={{ color }}>
                              {experience.companyUrl.replace('https://', '').replace('www.', '')}
                            </a>
                          </p>
                        </TeamDetail>
                      )}
                    </TeamDetails>
                  </TeamCard>
                </TeamSection>
              </TabContent>
            )}
          </AnimatePresence>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}
