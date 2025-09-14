import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Database, Palette } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background: ${({ theme }) => theme.colors.backgroundLight};
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

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const CategoryTab = styled(motion.button)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ active, theme }) => 
    active ? theme.colors.gradientPrimary : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ active, theme }) => 
    active ? 'transparent' : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    ${({ active, theme }) => !active && `
      background: ${theme.colors.surfaceLight};
      border-color: ${theme.colors.primary};
    `}
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    transform: scaleX(0);
    transform-origin: center;
    transition: ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceLight};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const SkillName = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const SkillLevel = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  height: 4px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const AllSkillsContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SkillCategoryGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CategorySkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillBadge = styled(motion.span)`
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.fast};
  display: inline-block;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'Frontend': <Code2 size={20} />,
    'Backend': <Server size={20} />,
    'Database': <Database size={20} />,
    'DevOps & Cloud': <Cloud size={20} />,
    'Tools & Others': <Palette size={20} />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const getSkillLevel = (skill: string): number => {
    const expertSkills = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'NestJS'];
    const advancedSkills = ['AWS', 'Docker', 'PostgreSQL', 'PHP', 'Symfony'];
    
    if (expertSkills.includes(skill)) return 95;
    if (advancedSkills.includes(skill)) return 85;
    return 75;
  };

  const filteredSkills = selectedCategory === 'all' 
    ? portfolioData.skills.flatMap(cat => cat.skills)
    : portfolioData.skills.find(cat => cat.category === selectedCategory)?.skills || [];

  return (
    <SkillsSection id="skills" ref={ref}>
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Compétences
        </SectionTitle>
        
        <CategoryTabs>
          <CategoryTab
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Toutes
          </CategoryTab>
          {portfolioData.skills.map((category) => (
            <CategoryTab
              key={category.category}
              active={selectedCategory === category.category}
              onClick={() => setSelectedCategory(category.category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryIcons[category.category]}
              {category.category}
            </CategoryTab>
          ))}
        </CategoryTabs>
        
        {selectedCategory === 'all' ? (
          <AllSkillsContainer
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {portfolioData.skills.map((category) => (
              <SkillCategoryGroup key={category.category}>
                <CategoryTitle>
                  {categoryIcons[category.category]}
                  {category.category}
                </CategoryTitle>
                <CategorySkills>
                  {category.skills.map((skill, index) => (
                    <SkillBadge
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </SkillBadge>
                  ))}
                </CategorySkills>
              </SkillCategoryGroup>
            ))}
          </AllSkillsContainer>
        ) : (
          <SkillsGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={index} variants={itemVariants}>
                <SkillName>{skill}</SkillName>
                <SkillLevel>
                  <SkillProgress
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${getSkillLevel(skill)}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.05 }}
                  />
                </SkillLevel>
              </SkillCard>
            ))}
          </SkillsGrid>
        )}
      </div>
    </SkillsSection>
  );
};