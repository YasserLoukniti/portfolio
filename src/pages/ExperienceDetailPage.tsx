import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Building2,
  Users,
  Target,
  ArrowLeft,
  Code,
  Server,
  Cloud,
  Cpu,
  Globe,
  Layers
} from 'lucide-react';
import { database } from '../data/portfolio.data';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-top: 100px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    transform: translateX(-4px);
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const HeroSection = styled.section<{ coverImage?: string }>`
  background: ${({ coverImage, theme }) =>
    coverImage
      ? `linear-gradient(to bottom, rgba(10, 14, 39, 0.7), rgba(10, 14, 39, 0.95)), url(${coverImage})`
      : theme.colors.backgroundLight
  };
  background-size: cover;
  background-position: center;
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient};
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

const CompanyHeader = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CompanyLogo = styled(motion.img)`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  object-fit: contain;
  background: white;
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);
`;

const CompanyLogoPlaceholder = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);

  svg {
    width: 60px;
    height: 60px;
    color: white;
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.2;
`;

const CompanyName = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const CompanyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  transition: ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
    transform: translateX(4px);
  }
`;

const CurrentBadge = styled(motion.span)`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
`;

const MetaGrid = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.9;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  max-width: 900px;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}50;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.1);
  }
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled(motion.li)`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  font-size: ${({ theme }) => theme.fontSizes.md};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 50%;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const TechSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

// Architecture Diagram Styles
const ArchitectureSection = styled(motion.div)`
  margin: ${({ theme }) => theme.spacing['4xl']} 0;
`;

const ArchitectureTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DiagramCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const DiagramHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DiagramTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DiagramDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0;
`;

const DiagramContainer = styled.div`
  background: #0d1117;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
  border: 1px solid #30363d;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #161b22;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}50;
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const DiagramPre = styled.pre`
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #58a6ff;
  margin: 0;
  white-space: pre;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 8px;
  }
`;

const CommunicationTable = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: left;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary}30;
  white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProtocolBadge = styled.span<{ protocol: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ protocol }) => {
    if (protocol.includes('HTTP')) return 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
    if (protocol.includes('Kafka')) return 'linear-gradient(135deg, #10B981, #059669)';
    return 'linear-gradient(135deg, #6B7280, #4B5563)';
  }};
  color: white;
`;

const TechTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TechBadge = styled(motion.span)`
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }
`;

const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding-top: ${({ theme }) => theme.spacing['2xl']};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavButton = styled(Link)<{ direction: 'prev' | 'next' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.normal};
  flex-direction: ${({ direction }) => direction === 'prev' ? 'row' : 'row-reverse'};
  text-align: ${({ direction }) => direction === 'prev' ? 'left' : 'right'};
  min-width: 200px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
    transform: translateY(-2px);
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
    transform: ${({ direction }) => direction === 'next' ? 'rotate(180deg)' : 'none'};
  }
`;

const NavButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const NavTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']};
  color: ${({ theme }) => theme.colors.textSecondary};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

// Helper function to parse responsibility with category
const parseResponsibility = (resp: string): { category: string | null; text: string } => {
  const match = resp.match(/^(BACKEND|FRONTEND|INFRA|AI\/ML):\s*(.+)$/);
  if (match) {
    return { category: match[1], text: match[2] };
  }
  return { category: null, text: resp };
};

export const ExperienceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const experience = database.experiences.find(exp => exp.id === id);
  const currentIndex = database.experiences.findIndex(exp => exp.id === id);
  const prevExperience = currentIndex > 0 ? database.experiences[currentIndex - 1] : null;
  const nextExperience = currentIndex < database.experiences.length - 1 ? database.experiences[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!experience) {
    return (
      <PageContainer>
        <div className="container">
          <NotFound>
            <h2>Experience non trouvee</h2>
            <p>Cette experience n'existe pas.</p>
            <BackButton to="/#experience">
              <ArrowLeft size={20} />
              Retour aux experiences
            </BackButton>
          </NotFound>
        </div>
      </PageContainer>
    );
  }

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
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

  const categoryOrder = ['BACKEND', 'FRONTEND', 'INFRA', 'AI/ML', 'general'];
  const categoryIcons: Record<string, React.ReactNode> = {
    'BACKEND': <Server size={20} />,
    'FRONTEND': <Globe size={20} />,
    'INFRA': <Cloud size={20} />,
    'AI/ML': <Cpu size={20} />,
    'general': <Target size={20} />
  };
  const categoryTitles: Record<string, string> = {
    'BACKEND': 'Backend Development',
    'FRONTEND': 'Frontend Development',
    'INFRA': 'Infrastructure & DevOps',
    'AI/ML': 'AI & Machine Learning',
    'general': 'Responsabilites'
  };

  const coverImage = (experience as any).coverImage;

  return (
    <PageContainer>
      <HeroSection coverImage={coverImage}>
        <HeroContent>
          <BackButton to="/#experience">
            <ArrowLeft size={20} />
            Retour aux experiences
          </BackButton>

          <CompanyHeader
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {experience.companyLogo ? (
              <CompanyLogo
                src={experience.companyLogo}
                alt={experience.company}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            ) : (
              <CompanyLogoPlaceholder
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Building2 />
              </CompanyLogoPlaceholder>
            )}

            <CompanyInfo>
              <JobTitle
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {experience.title}
              </JobTitle>

              <CompanyName
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {experience.companyUrl ? (
                  <CompanyLink
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Building2 size={24} />
                    {experience.company}
                    <ExternalLink size={18} />
                  </CompanyLink>
                ) : (
                  <CompanyLink as="span">
                    <Building2 size={24} />
                    {experience.company}
                  </CompanyLink>
                )}

                {experience.isCurrent && (
                  <CurrentBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <Award size={16} />
                    Poste actuel
                  </CurrentBadge>
                )}
              </CompanyName>

              <MetaGrid
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <MetaItem>
                  <Calendar size={20} />
                  {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                </MetaItem>
                <MetaItem>
                  <MapPin size={20} />
                  {experience.location.city}, {experience.location.country}
                </MetaItem>
                <MetaItem>
                  <Users size={20} />
                  {getContractType(experience.type)}
                </MetaItem>
              </MetaGrid>
            </CompanyInfo>
          </CompanyHeader>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {experience.description}
        </Description>

        {/* Responsibilities by category */}
        {Object.keys(groupedResponsibilities).length > 0 && (
          <SectionGrid>
            {categoryOrder.map(category => {
              const items = groupedResponsibilities[category];
              if (!items || items.length === 0) return null;

              return (
                <Card
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <CardTitle>
                    {categoryIcons[category]}
                    {categoryTitles[category]}
                  </CardTitle>
                  <List>
                    {items.map((item, index) => (
                      <ListItem
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                      >
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Card>
              );
            })}
          </SectionGrid>
        )}

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{ marginBottom: '2rem' }}
          >
            <CardTitle>
              <Award size={24} />
              Realisations cles
            </CardTitle>
            <List>
              {experience.achievements.map((achievement, index) => (
                <ListItem
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {achievement}
                </ListItem>
              ))}
            </List>
          </Card>
        )}

        {/* Architecture Diagrams */}
        {(experience as any).architectureDiagrams && (experience as any).architectureDiagrams.length > 0 && (
          <ArchitectureSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <ArchitectureTitle>
              <Layers size={28} />
              Architecture Technique
            </ArchitectureTitle>

            {(experience as any).architectureDiagrams.map((diagram: any, index: number) => (
              <DiagramCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.15 }}
              >
                <DiagramHeader>
                  <DiagramTitle>{diagram.title}</DiagramTitle>
                  <DiagramDescription>{diagram.description}</DiagramDescription>
                </DiagramHeader>

                {diagram.diagram && (
                  <DiagramContainer>
                    <DiagramPre>{diagram.diagram}</DiagramPre>
                  </DiagramContainer>
                )}

                {diagram.table && (
                  <CommunicationTable>
                    <Table>
                      <TableHead>
                        <tr>
                          <TableHeader>Source</TableHeader>
                          <TableHeader>Destination</TableHeader>
                          <TableHeader>Protocol</TableHeader>
                          <TableHeader>Usage</TableHeader>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {diagram.table.map((row: any, rowIndex: number) => (
                          <TableRow key={rowIndex}>
                            <TableCell>{row.source}</TableCell>
                            <TableCell>{row.destination}</TableCell>
                            <TableCell>
                              <ProtocolBadge protocol={row.protocol}>
                                {row.protocol}
                              </ProtocolBadge>
                            </TableCell>
                            <TableCell>{row.usage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CommunicationTable>
                )}
              </DiagramCard>
            ))}
          </ArchitectureSection>
        )}

        {/* Technologies */}
        <TechSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <TechTitle>
            <Code size={24} />
            Stack Technique ({experience.technologies.length} technologies)
          </TechTitle>
          <TechGrid>
            {experience.technologies.map((tech, index) => (
              <TechBadge
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.03 }}
              >
                {tech}
              </TechBadge>
            ))}
          </TechGrid>
        </TechSection>

        {/* Navigation */}
        <NavigationSection>
          {prevExperience ? (
            <NavButton to={`/experience/${prevExperience.id}`} direction="prev">
              <ArrowLeft size={20} />
              <NavButtonContent>
                <NavLabel>Experience precedente</NavLabel>
                <NavTitle>{prevExperience.company}</NavTitle>
              </NavButtonContent>
            </NavButton>
          ) : <div />}

          {nextExperience && (
            <NavButton to={`/experience/${nextExperience.id}`} direction="next">
              <ArrowLeft size={20} />
              <NavButtonContent>
                <NavLabel>Experience suivante</NavLabel>
                <NavTitle>{nextExperience.company}</NavTitle>
              </NavButtonContent>
            </NavButton>
          )}
        </NavigationSection>
      </ContentSection>
    </PageContainer>
  );
};
