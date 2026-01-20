import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Database, Wrench, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing['6xl']} 0;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const SectionLabel = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionDescription = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
`;

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled(motion.div)<{ span?: number }>`
  perspective: 1000px;
  grid-column: span ${({ span }) => span || 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 1;
  }
`;

const SkillCard = styled(motion.div)<{ featured?: boolean }>`
  position: relative;
  background: rgba(17, 17, 17, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 100%;
  transform-style: preserve-3d;
  transition: border-color 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(99, 102, 241, 0.06),
      transparent 40%
    );
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const CardIcon = styled.div<{ color?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ color }) => color || 'rgba(99, 102, 241, 0.1)'};
  border: 1px solid ${({ color }) => color ? `${color}40` : 'rgba(99, 102, 241, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: all 0.3s;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ color }) => color || '#6366F1'};
  }

  ${SkillCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${({ color }) => color ? `${color}30` : 'rgba(99, 102, 241, 0.2)'};
  }
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SkillTag = styled(motion.span)<{ highlighted?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ highlighted }) => highlighted
    ? 'rgba(99, 102, 241, 0.15)'
    : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${({ highlighted, theme }) => highlighted
    ? 'rgba(99, 102, 241, 0.3)'
    : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ highlighted, theme }) => highlighted
    ? theme.colors.secondary
    : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all 0.3s;

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

const TechStackSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: rgba(17, 17, 17, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TechStackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const TechStackTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const TechStackSubtitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TechStackGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TechBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.3s;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

interface SkillCategoryProps {
  category: typeof portfolioData.skills[0];
  index: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const SkillCategoryCard: React.FC<SkillCategoryProps> = ({
  category,
  index,
  icon,
  color,
  description,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    cardRef.current.style.setProperty('--mouse-x', `${(x + 0.5) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const highlightedSkills = ['TypeScript', 'NestJS', 'Next.js', 'AWS', 'Kubernetes', 'PostgreSQL'];

  return (
    <CardWrapper
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SkillCard
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        <CardIcon color={color}>
          {icon}
        </CardIcon>
        <CardTitle>{category.category}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <SkillTags>
          {category.skills.map((skill, skillIndex) => (
            <SkillTag
              key={skillIndex}
              highlighted={highlightedSkills.includes(skill)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + skillIndex * 0.02 }}
            >
              {skill}
            </SkillTag>
          ))}
        </SkillTags>
      </SkillCard>
    </CardWrapper>
  );
};

export const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categoryConfig: { [key: string]: { icon: React.ReactNode; color: string; description: string } } = {
    'Frontend': {
      icon: <Code2 />,
      color: 'rgba(59, 130, 246, 0.1)',
      description: 'Building responsive and performant user interfaces with modern frameworks and tools.',
    },
    'Backend': {
      icon: <Server />,
      color: 'rgba(34, 197, 94, 0.1)',
      description: 'Designing scalable APIs and microservices with event-driven architectures.',
    },
    'Database': {
      icon: <Database />,
      color: 'rgba(249, 115, 22, 0.1)',
      description: 'Optimizing data storage with both SQL and NoSQL solutions for high performance.',
    },
    'DevOps & Cloud': {
      icon: <Cloud />,
      color: 'rgba(168, 85, 247, 0.1)',
      description: 'Automating deployments and managing cloud infrastructure at scale.',
    },
    'Tools & Others': {
      icon: <Wrench />,
      color: 'rgba(236, 72, 153, 0.1)',
      description: 'Leveraging development tools and methodologies for efficient workflows.',
    },
  };

  const allTechnologies = portfolioData.skills.flatMap(cat => cat.skills);

  return (
    <SkillsSection id="skills" ref={ref}>
      <div className="container">
        <SectionHeader>
          <SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles />
            Technical Expertise
          </SectionLabel>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Skills & Technologies
          </SectionTitle>
          <SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Specialized in building production-ready applications with modern
            technologies and best practices.
          </SectionDescription>
        </SectionHeader>

        <BentoGrid>
          {portfolioData.skills.map((category, index) => (
            <SkillCategoryCard
              key={category.category}
              category={category}
              index={index}
              icon={categoryConfig[category.category]?.icon || <Code2 />}
              color={categoryConfig[category.category]?.color || 'rgba(99, 102, 241, 0.1)'}
              description={categoryConfig[category.category]?.description || ''}
            />
          ))}
        </BentoGrid>

        <TechStackSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TechStackHeader>
            <TechStackTitle>Complete Tech Stack</TechStackTitle>
            <TechStackSubtitle>{allTechnologies.length} technologies</TechStackSubtitle>
          </TechStackHeader>
          <TechStackGrid>
            {allTechnologies.map((tech, index) => (
              <TechBadge
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </TechBadge>
            ))}
          </TechStackGrid>
        </TechStackSection>
      </div>
    </SkillsSection>
  );
};
