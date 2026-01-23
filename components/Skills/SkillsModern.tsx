import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Database, Palette } from 'lucide-react';
import { database } from '../../data/portfolio.data';

const SkillsSection = styled.section`
  padding: 100px 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  margin-bottom: 48px;
`;

const Label = styled(motion.span)`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 16px;
`;

const SectionDescription = styled(motion.p)`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  max-width: 500px;
`;

const CategoryNav = styled.nav`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
`;

const CategoryButton = styled(motion.button)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${({ $active }) =>
    $active ? '#fff' : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active }) =>
    $active ? '#0a0a0a' : 'rgba(255, 255, 255, 0.6)'};
  border: 1px solid ${({ $active }) =>
    $active ? '#fff' : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 100px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    ${({ $active }) => !$active && `
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.15);
      color: #fff;
    `}
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
`;

const SkillCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 28px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  cursor: default;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-4px);
  }

  @media (max-width: 640px) {
    padding: 20px 12px;
  }
`;

const SkillIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(20%);
    opacity: 0.9;
    transition: all 0.3s ease;
  }

  ${SkillCard}:hover & img {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
  }

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
  }
`;

const SkillName = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  transition: color 0.2s ease;

  ${SkillCard}:hover & {
    color: #fff;
  }

  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 3px;
`;

const LevelDot = styled.div<{ $filled: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ $filled }) =>
    $filled ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'};
  transition: all 0.2s ease;

  ${SkillCard}:hover & {
    ${({ $filled }) => $filled && `
      background: #fff;
    `}
  }
`;

const StatsBar = styled(motion.div)`
  display: flex;
  gap: 32px;
  margin-top: 48px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const StatItem = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 0;
    order: 2;
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);

  @media (max-width: 768px) {
    order: 1;
  }
`;

interface Skill {
  name: string;
  icon?: string;
  level: number;
}

const skillIcons: { [key: string]: string } = {
  'React.js': 'react',
  'Next.js': 'nextdotjs',
  'Node.js': 'nodedotjs',
  'Express.js': 'express',
  'Material UI': 'mui',
  'Three.js': 'threedotjs',
  'Socket.io': 'socketdotio',
  'GitHub Actions': 'githubactions',
  'VS Code': 'visualstudiocode',
  'API REST': 'fastapi',
  'CI/CD': 'githubactions',
  'Nx Monorepo': 'nx',
  'Adobe XD': 'adobexd',
  'SASS/SCSS': 'sass',
  'Styled Components': 'styledcomponents',
};

export const SkillsModern: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'Frontend': <Code2 />,
    'Backend': <Server />,
    'Database': <Database />,
    'DevOps & Cloud': <Cloud />,
    'Tools & Others': <Palette />,
  };

  useEffect(() => {
    const allSkillsData = selectedCategory === 'all'
      ? database.skills.technical.flatMap(cat => cat.items)
      : database.skills.technical.find(cat => cat.category === selectedCategory)?.items || [];

    const formattedSkills = allSkillsData.map(skill => {
      const iconName = skillIcons[skill.name] || skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');

      return {
        name: skill.name,
        icon: iconName,
        level: Math.ceil(skill.level / 20),
      };
    });

    setSkills(formattedSkills);
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const totalSkills = database.skills.technical.flatMap(cat => cat.items).length;
  const categories = database.skills.technical.length;

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionHeader>
          <Label
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Expertise
          </Label>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Compétences & Technologies
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stack technique moderne pour des applications performantes et maintenables.
          </SectionDescription>
        </SectionHeader>

        <CategoryNav>
          <CategoryButton
            $active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Toutes
          </CategoryButton>
          {database.skills.technical.map((category) => (
            <CategoryButton
              key={category.category}
              $active={selectedCategory === category.category}
              onClick={() => setSelectedCategory(category.category)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {categoryIcons[category.category]}
              {category.category}
            </CategoryButton>
          ))}
        </CategoryNav>

        <AnimatePresence mode="wait">
          <SkillsGrid
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skills.map((skill, index) => (
              <SkillCard
                key={`${selectedCategory}-${skill.name}`}
                variants={itemVariants}
              >
                <SkillIcon>
                  <img
                    src={`https://cdn.simpleicons.org/${skill.icon}`}
                    alt={skill.name}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';
                    }}
                  />
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>
                  {[...Array(5)].map((_, i) => (
                    <LevelDot key={i} $filled={i < skill.level} />
                  ))}
                </SkillLevel>
              </SkillCard>
            ))}
          </SkillsGrid>
        </AnimatePresence>

        <StatsBar
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatItem>
            <StatNumber>{totalSkills}+</StatNumber>
            <StatLabel>Technologies</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{categories}</StatNumber>
            <StatLabel>Domaines d'expertise</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>5+</StatNumber>
            <StatLabel>Années d'expérience</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>20+</StatNumber>
            <StatLabel>Projets livrés</StatLabel>
          </StatItem>
        </StatsBar>
      </Container>
    </SkillsSection>
  );
};
