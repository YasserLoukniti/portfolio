import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Database, Palette, Sparkles, ChevronRight } from 'lucide-react';
import { portfolioData, database } from '../../data/portfolio.data';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0px) rotate(-1deg); }
  75% { transform: translateY(-5px) rotate(1deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.2); }
`;

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['5xl']} 0;
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundLight} 50%,
    ${({ theme }) => theme.colors.background} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: inline-block;
  position: relative;
`;

const Subtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const CategoryNav = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const CategoryButton = styled(motion.button)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ $active, theme }) =>
    $active
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : theme.colors.surface};
  color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.text};
  border: 2px solid ${({ $active, theme }) =>
    $active ? 'transparent' : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
    ${({ $active, theme }) => !$active && `
      background: ${theme.colors.surfaceLight};
      border-color: #667eea;
    `}
  }

  svg {
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: rotate(20deg) scale(1.1);
  }
`;

const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkillCard = styled(motion.div)<{ $delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3);
    border-color: rgba(124, 58, 237, 0.5);
    background: ${({ theme }) => theme.colors.surface};

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const SkillIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    transition: transform 0.3s;
  }

  ${SkillCard}:hover & img {
    transform: rotate(360deg) scale(1.2);
    filter: drop-shadow(0 6px 12px rgba(124, 58, 237, 0.3));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 45px;
    height: 45px;
  }
`;

const SkillName = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  transition: color 0.3s;
  position: relative;
  z-index: 1;

  ${SkillCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const SkillLevel = styled.div`
  display: flex;
  gap: 2px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  position: relative;
  z-index: 1;
`;

const LevelDot = styled.div<{ $filled: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $filled, theme }) =>
    $filled
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : theme.colors.border};
  transition: all 0.3s;

  ${SkillCard}:hover & {
    ${({ $filled }) => $filled && `
      box-shadow: 0 0 10px rgba(124, 58, 237, 0.6);
    `}
  }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.1;
  pointer-events: none;
`;

interface Skill {
  name: string;
  icon?: string;
  level: number;
}

// Mapping spécial pour les noms qui ne correspondent pas directement aux identifiants Simple Icons
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

// Supprimé car on utilise maintenant les niveaux directement depuis la base de données

export const SkillsModern: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'Frontend': <Code2 size={18} />,
    'Backend': <Server size={18} />,
    'Database': <Database size={18} />,
    'DevOps & Cloud': <Cloud size={18} />,
    'Tools & Others': <Palette size={18} />,
  };

  useEffect(() => {
    const allSkillsData = selectedCategory === 'all'
      ? database.skills.technical.flatMap(cat => cat.items)
      : database.skills.technical.find(cat => cat.category === selectedCategory)?.items || [];

    const formattedSkills = allSkillsData.map(skill => {
      // Chercher dans le mapping ou générer automatiquement l'identifiant pour Simple Icons
      const iconName = skillIcons[skill.name] || skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');

      return {
        name: skill.name,
        icon: iconName,
        level: Math.ceil(skill.level / 20), // Convertir de 0-100 à 1-5
      };
    });

    setSkills(formattedSkills);
  }, [selectedCategory]);

  const getIconUrl = (iconName: string) => {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${iconName}.svg`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <Sparkles style={{ display: 'inline', marginRight: '10px' }} />
            Compétences & Technologies
          </SectionTitle>
          <Subtitle
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stack technique moderne et outils de développement
          </Subtitle>
        </Header>

        <CategoryNav>
          <CategoryButton
            $active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={18} />
            Toutes
          </CategoryButton>
          {database.skills.technical.map((category, index) => (
            <CategoryButton
              key={category.category}
              $active={selectedCategory === category.category}
              onClick={() => setSelectedCategory(category.category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              {categoryIcons[category.category]}
              {category.category}
            </CategoryButton>
          ))}
        </CategoryNav>

        <AnimatePresence mode="wait">
          <SkillsContainer
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {skills.map((skill, index) => (
              <SkillCard
                key={`${selectedCategory}-${skill.name}`}
                variants={itemVariants}
                $delay={index * 0.1}
                whileHover={{
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <SkillIcon>
                  <img
                    src={`https://cdn.simpleicons.org/${skill.icon}`}
                    alt={skill.name}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';
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
          </SkillsContainer>
        </AnimatePresence>

        <FloatingIcon
          initial={{ x: -100, y: 100 }}
          animate={{ x: 1200, y: -100 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <Code2 />
        </FloatingIcon>
        <FloatingIcon
          initial={{ x: 1200, y: 200 }}
          animate={{ x: -100, y: -50 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        >
          <Cloud />
        </FloatingIcon>
      </Container>
    </SkillsSection>
  );
};