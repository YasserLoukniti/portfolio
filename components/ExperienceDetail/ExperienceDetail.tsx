'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
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
import { theme, getCompanyColor } from '@/styles/theme';
import * as S from './ExperienceDetail.styles';

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
  // Logos retirés de simpleicons (Amazon) : servis depuis public/icons
  'AWS': '/icons/aws.svg',
  'AWS EKS': '/icons/aws.svg',
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

const getTechIconUrl = (icon: string) =>
  icon.startsWith('/') ? icon : `https://cdn.simpleicons.org/${icon}`;

// Helper function to parse responsibility with category
const parseResponsibility = (resp: string): { category: string | null; text: string } => {
  const match = resp.match(/^(BACKEND|FRONTEND|INFRA|AI\/ML):\s*(.+)$/);
  if (match) {
    return { category: match[1], text: match[2] };
  }
  return { category: null, text: resp };
};

type TabType = 'resume' | 'technos' | 'equipe';

export function ExperienceDetail({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<TabType>('resume');

  const experience = database.experiences.find(exp => exp.id === id);
  const currentIndex = database.experiences.findIndex(exp => exp.id === id);
  const prevExperience = currentIndex > 0 ? database.experiences[currentIndex - 1] : null;
  const nextExperience = currentIndex < database.experiences.length - 1 ? database.experiences[currentIndex + 1] : null;

  const color = experience ? getCompanyColor(experience.company) : theme.colors.secondary;

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('resume');
  }, [id]);

  if (!experience) {
    return (
      <S.PageContainer>
        <S.Container>
          <S.NotFound>
            <h2>Expérience non trouvée</h2>
            <p>Cette expérience n&apos;existe pas.</p>
            <S.BackButtonStyled href="/#experience">
              <ArrowLeft size={18} />
              Retour aux expériences
            </S.BackButtonStyled>
          </S.NotFound>
        </S.Container>
      </S.PageContainer>
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
    'general': { icon: <Briefcase size={18} />, title: 'Responsabilités' }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'resume', label: 'Résumé', icon: <FileText size={18} /> },
    { id: 'technos', label: 'Technos', icon: <Code size={18} /> },
    { id: 'equipe', label: 'Équipe', icon: <Users size={18} /> }
  ];

  const prevColor = prevExperience ? getCompanyColor(prevExperience.company) : color;
  const nextColor = nextExperience ? getCompanyColor(nextExperience.company) : color;

  return (
    <S.PageContainer>
      {/* Hero */}
      <S.HeroSection $color={color}>
        <S.Container>
          <S.BackButtonStyled href="/#experience">
            <ArrowLeft size={18} />
            Retour aux expériences
          </S.BackButtonStyled>

          <S.HeroContent>
            <S.CompanyLogo
              $color={color}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {experience.companyLogo ? (
                <Image src={experience.companyLogo} alt={experience.company} width={200} height={200} priority />
              ) : (
                <Building2 size={40} />
              )}
            </S.CompanyLogo>

            <S.HeroInfo>
              <S.JobTitle
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {experience.title}
              </S.JobTitle>

              <S.CompanyRow
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <S.CompanyLink
                  href={experience.companyUrl || '#'}
                  target={experience.companyUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  $color={color}
                  as={experience.companyUrl ? 'a' : 'span'}
                >
                  {experience.company}
                  {experience.companyUrl && <ExternalLink />}
                </S.CompanyLink>

                {experience.isCurrent && (
                  <S.CurrentBadge $color={color}>Actuel</S.CurrentBadge>
                )}

                <S.TypeBadge $type={experience.type}>
                  {getContractType(experience.type)}
                </S.TypeBadge>
              </S.CompanyRow>

              <S.MetaRow
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <S.MetaItem>
                  <Calendar />
                  {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                </S.MetaItem>
                <S.MetaItem>
                  <MapPin />
                  {experience.location.city}, {experience.location.country}
                </S.MetaItem>
              </S.MetaRow>
            </S.HeroInfo>
          </S.HeroContent>
        </S.Container>
      </S.HeroSection>

      {/* Tabs */}
      <S.TabsSection>
        <S.TabsContainer>
          {tabs.map(tab => (
            <S.TabButton
              key={tab.id}
              $active={activeTab === tab.id}
              $color={color}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && <S.TabBadge $color={color}>{tab.badge}</S.TabBadge>}
            </S.TabButton>
          ))}
        </S.TabsContainer>
      </S.TabsSection>

      {/* Content */}
      <S.ContentSection>
        <S.Container>
          <AnimatePresence mode="wait">
            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <S.TabContent
                key="resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <S.Description>{experience.description}</S.Description>

                {/* Responsibilities by category */}
                {Object.keys(groupedResponsibilities).length > 0 && (
                  <S.CardsGrid>
                    {['BACKEND', 'FRONTEND', 'INFRA', 'AI/ML', 'general'].map(category => {
                      const items = groupedResponsibilities[category];
                      if (!items || items.length === 0) return null;
                      const config = categoryConfig[category];

                      return (
                        <S.Card
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <S.CardHeader $color={color}>
                            {config.icon}
                            <S.CardTitle>{config.title}</S.CardTitle>
                            <S.CardCount>{items.length}</S.CardCount>
                          </S.CardHeader>
                          {items.slice(0, 5).map((item, index) => (
                            <S.ListItem key={index} $color={color}>
                              {item}
                            </S.ListItem>
                          ))}
                          {items.length > 5 && (
                            <S.ListItem $color={color} style={{ opacity: 0.5 }}>
                              +{items.length - 5} autres...
                            </S.ListItem>
                          )}
                        </S.Card>
                      );
                    })}
                  </S.CardsGrid>
                )}

                {/* Achievements */}
                {experience.achievements && experience.achievements.length > 0 && (
                  <S.Card
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <S.CardHeader $color={color}>
                      <Award size={20} />
                      <S.CardTitle>Réalisations clés</S.CardTitle>
                    </S.CardHeader>
                    {experience.achievements.map((achievement, index) => (
                      <S.AchievementItem key={index} $color={color}>
                        <CheckCircle size={18} />
                        <p>{achievement}</p>
                      </S.AchievementItem>
                    ))}
                  </S.Card>
                )}

                {/* Navigation */}
                <S.NavigationSection>
                  {prevExperience ? (
                    <S.NavButton href={`/experience/${prevExperience.id}`} $direction="prev" $color={prevColor}>
                      <ArrowLeft size={20} />
                      <S.NavContent>
                        <S.NavLabel>Précédente</S.NavLabel>
                        <S.NavTitle>{prevExperience.company}</S.NavTitle>
                      </S.NavContent>
                    </S.NavButton>
                  ) : <div />}

                  {nextExperience && (
                    <S.NavButton href={`/experience/${nextExperience.id}`} $direction="next" $color={nextColor}>
                      <ArrowLeft size={20} />
                      <S.NavContent>
                        <S.NavLabel>Suivante</S.NavLabel>
                        <S.NavTitle>{nextExperience.company}</S.NavTitle>
                      </S.NavContent>
                    </S.NavButton>
                  )}
                </S.NavigationSection>
              </S.TabContent>
            )}

            {/* Technos Tab */}
            {activeTab === 'technos' && (
              <S.TabContent
                key="technos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <S.TechCount $color={color}>
                  <Code size={18} />
                  <span>Stack technique : <strong>{experience.technologies.length} technologies</strong></span>
                </S.TechCount>

                {/* Show stack details if available */}
                {(experience as any).stackDetails && (
                  <S.TechCategories>
                    {Object.entries((experience as any).stackDetails).map(([category, techs], index) => (
                      <S.TechCategory key={category}>
                        <S.CategoryHeader $color={color}>
                          {category === 'Frontend' && <Globe size={18} />}
                          {category === 'Backend API' && <Server size={18} />}
                          {category === 'Microservices' && <Layers size={18} />}
                          {category === 'AI/ML' && <Cpu size={18} />}
                          {category === 'Infrastructure' && <Cloud size={18} />}
                          {category === 'Messaging' && <Network size={18} />}
                          <S.CategoryTitle>{category}</S.CategoryTitle>
                        </S.CategoryHeader>
                        <S.TechGrid>
                          {(techs as string[]).map((tech, techIndex) => (
                            <S.TechBadge
                              key={techIndex}
                              $color={color}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.05 + techIndex * 0.02 }}
                            >
                              {techIcons[tech] && (
                                <img
                                  src={getTechIconUrl(techIcons[tech])}
                                  loading="lazy"
                                  decoding="async"
                                  alt={tech}
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              )}
                              {tech}
                            </S.TechBadge>
                          ))}
                        </S.TechGrid>
                      </S.TechCategory>
                    ))}
                  </S.TechCategories>
                )}

                {/* All technologies */}
                <S.AllTechsGrid>
                  {experience.technologies.map((tech, index) => (
                    <S.TechBadge
                      key={index}
                      $color={color}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                    >
                      {techIcons[tech] && (
                        <img
                          src={getTechIconUrl(techIcons[tech])}
                          loading="lazy"
                          decoding="async"
                          alt={tech}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      {tech}
                    </S.TechBadge>
                  ))}
                </S.AllTechsGrid>
              </S.TabContent>
            )}

            {/* Equipe Tab */}
            {activeTab === 'equipe' && (
              <S.TabContent
                key="equipe"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <S.TeamSection>
                  {/* Team Composition */}
                  <S.TeamCard $color={color}>
                    <S.TeamHeader>
                      <S.TeamIcon $color={color}>
                        <Users size={28} />
                      </S.TeamIcon>
                      <S.TeamInfo>
                        <S.TeamTitle>Composition de l&apos;équipe</S.TeamTitle>
                        <S.TeamSubtitle>
                          {(experience as any).team?.size || 1} membre{((experience as any).team?.size || 1) > 1 ? 's' : ''}
                          {(experience as any).team?.methodology && ` - ${(experience as any).team.methodology}`}
                        </S.TeamSubtitle>
                      </S.TeamInfo>
                    </S.TeamHeader>

                    {(experience as any).team?.members && (
                      <S.TeamMembersGrid>
                        {(experience as any).team.members.map((member: { role: string; count: number }, index: number) => (
                          <S.TeamMemberCard key={index} $color={color}>
                            <S.TeamMemberCount $color={color}>{member.count}</S.TeamMemberCount>
                            <S.TeamMemberRole>{member.role}</S.TeamMemberRole>
                          </S.TeamMemberCard>
                        ))}
                      </S.TeamMembersGrid>
                    )}
                  </S.TeamCard>

                  {/* Company Info */}
                  <S.TeamCard $color={color}>
                    <S.TeamHeader>
                      <S.TeamIcon $color={color}>
                        <Building2 size={28} />
                      </S.TeamIcon>
                      <S.TeamInfo>
                        <S.TeamTitle>{experience.company}</S.TeamTitle>
                        <S.TeamSubtitle>Entreprise</S.TeamSubtitle>
                      </S.TeamInfo>
                    </S.TeamHeader>

                    <S.TeamDetails>
                      <S.TeamDetail $color={color}>
                        <h4>Secteur</h4>
                        <p>
                          {experience.company === 'WaysToSucceed' && 'Éducation / EdTech'}
                          {experience.company === 'Weneeds' && 'Recrutement / IA'}
                          {experience.company === 'Capgemini' && 'Conseil / IT Services'}
                          {experience.company === '42c' && 'Conseil / Recrutement Tech'}
                          {!['WaysToSucceed', 'Weneeds', 'Capgemini', '42c'].includes(experience.company) && 'Tech'}
                        </p>
                      </S.TeamDetail>
                      <S.TeamDetail $color={color}>
                        <h4>Localisation</h4>
                        <p>{experience.location.city}, {experience.location.country}</p>
                      </S.TeamDetail>
                      <S.TeamDetail $color={color}>
                        <h4>Mode de travail</h4>
                        <p>{experience.location.remote === 'remote' ? 'Full Remote' : experience.location.remote === 'hybrid' ? 'Hybride' : 'Sur site'}</p>
                      </S.TeamDetail>
                      {experience.companyUrl && (
                        <S.TeamDetail $color={color}>
                          <h4>Site web</h4>
                          <p>
                            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" style={{ color }}>
                              {experience.companyUrl.replace('https://', '').replace('www.', '')}
                            </a>
                          </p>
                        </S.TeamDetail>
                      )}
                    </S.TeamDetails>
                  </S.TeamCard>
                </S.TeamSection>
              </S.TabContent>
            )}
          </AnimatePresence>
        </S.Container>
      </S.ContentSection>
    </S.PageContainer>
  );
}
