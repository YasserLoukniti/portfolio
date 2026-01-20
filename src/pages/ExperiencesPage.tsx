import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Award, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import { database } from '../data/portfolio.data';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-top: 100px;
  padding-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const Header = styled.section`
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

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

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
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

const PageTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
`;

const ExperiencesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const YearGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const YearLabel = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const ExperienceCard = styled(motion(Link))`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.normal};
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradient};
    transform: scaleY(0);
    transition: ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);
    border-color: ${({ theme }) => theme.colors.primary}50;

    &::before {
      transform: scaleY(1);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  object-fit: contain;
  background: white;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CompanyLogoPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    width: 40px;
    height: 40px;
  }
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const CurrentBadge = styled.span`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TypeBadge = styled.span<{ type: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ type }) => {
    switch (type) {
      case 'full-time': return 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
      case 'freelance': return 'linear-gradient(135deg, #8B5CF6, #6D28D9)';
      case 'internship': return 'linear-gradient(135deg, #F59E0B, #D97706)';
      default: return 'linear-gradient(135deg, #6B7280, #4B5563)';
    }
  }};
  color: white;
`;

const MetaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillTag = styled.span`
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0;
  transform: translateX(-10px);
  transition: ${({ theme }) => theme.transitions.fast};

  ${ExperienceCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const getContractType = (type: string) => {
  switch (type) {
    case 'full-time': return 'CDI';
    case 'contract': return 'CDD';
    case 'freelance': return 'Freelance';
    case 'internship': return 'Stage';
    default: return type;
  }
};

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
};

export const ExperiencesPage: React.FC = () => {
  // Group experiences by year
  const experiencesByYear = database.experiences.reduce((acc, exp) => {
    const year = exp.startDate.split('-')[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(exp);
    return acc;
  }, {} as Record<string, typeof database.experiences>);

  const years = Object.keys(experiencesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <BackButton to="/#experience">
            <ArrowLeft size={20} />
            Retour a l'accueil
          </BackButton>

          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Toutes mes Experiences
          </PageTitle>

          <PageSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {database.experiences.length} experiences professionnelles depuis {years[years.length - 1]}
          </PageSubtitle>
        </HeaderContent>
      </Header>

      <ExperiencesGrid>
        {years.map((year) => (
          <YearGroup key={year}>
            <YearLabel>{year}</YearLabel>

            {experiencesByYear[year].map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                to={`/experience/${exp.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {exp.companyLogo ? (
                  <CompanyLogo src={exp.companyLogo} alt={exp.company} />
                ) : (
                  <CompanyLogoPlaceholder>
                    <Building2 />
                  </CompanyLogoPlaceholder>
                )}

                <CardContent>
                  <CardHeader>
                    <div>
                      <JobTitle>{exp.title}</JobTitle>
                      <Company>
                        <Briefcase size={18} />
                        {exp.company}
                      </Company>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {exp.isCurrent && (
                        <CurrentBadge>
                          <Award size={12} />
                          Actuel
                        </CurrentBadge>
                      )}
                      <TypeBadge type={exp.type}>{getContractType(exp.type)}</TypeBadge>
                    </div>
                  </CardHeader>

                  <MetaRow>
                    <MetaItem>
                      <Calendar size={14} />
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </MetaItem>
                    <MetaItem>
                      <MapPin size={14} />
                      {exp.location.city}, {exp.location.country}
                    </MetaItem>
                  </MetaRow>

                  <Description>{exp.description}</Description>

                  <SkillsContainer>
                    {exp.technologies.slice(0, 6).map((tech, techIndex) => (
                      <SkillTag key={techIndex}>{tech}</SkillTag>
                    ))}
                    {exp.technologies.length > 6 && (
                      <SkillTag>+{exp.technologies.length - 6}</SkillTag>
                    )}
                  </SkillsContainer>
                </CardContent>

                <ArrowContainer>
                  <ArrowRight size={24} />
                </ArrowContainer>
              </ExperienceCard>
            ))}
          </YearGroup>
        ))}
      </ExperiencesGrid>
    </PageContainer>
  );
};
