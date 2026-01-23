import React, { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cloud, Database, Wrench, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import * as S from './Skills.styles';

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
    <S.CardWrapper
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <S.SkillCard
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        <S.CardIcon color={color}>
          {icon}
        </S.CardIcon>
        <S.CardTitle>{category.category}</S.CardTitle>
        <S.CardDescription>{description}</S.CardDescription>
        <S.SkillTags>
          {category.skills.map((skill, skillIndex) => (
            <S.SkillTag
              key={skillIndex}
              highlighted={highlightedSkills.includes(skill)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + skillIndex * 0.02 }}
            >
              {skill}
            </S.SkillTag>
          ))}
        </S.SkillTags>
      </S.SkillCard>
    </S.CardWrapper>
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
    <S.SkillsSection id="skills" ref={ref}>
      <div className="container">
        <S.SectionHeader>
          <S.SectionLabel
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles />
            Technical Expertise
          </S.SectionLabel>
          <S.SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Skills & Technologies
          </S.SectionTitle>
          <S.SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Specialized in building production-ready applications with modern
            technologies and best practices.
          </S.SectionDescription>
        </S.SectionHeader>

        <S.BentoGrid>
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
        </S.BentoGrid>

        <S.TechStackSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <S.TechStackHeader>
            <S.TechStackTitle>Complete Tech Stack</S.TechStackTitle>
            <S.TechStackSubtitle>{allTechnologies.length} technologies</S.TechStackSubtitle>
          </S.TechStackHeader>
          <S.TechStackGrid>
            {allTechnologies.map((tech, index) => (
              <S.TechBadge
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </S.TechBadge>
            ))}
          </S.TechStackGrid>
        </S.TechStackSection>
      </div>
    </S.SkillsSection>
  );
};
