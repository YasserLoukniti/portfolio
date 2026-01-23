import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import * as S from './Experience.styles';

export const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <S.ExperienceSection id="experience" ref={ref}>
      <div className="container">
        <S.SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience Professionnelle
        </S.SectionTitle>

        <S.Timeline>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {portfolioData.experiences.slice(0, 5).map((exp, index) => (
              <S.TimelineItem key={exp.id} index={index}>
                <S.TimelineDot isCurrent={exp.isCurrent} />
                <S.TimelineContent>
                  <motion.div variants={itemVariants}>
                    <S.ExperienceCard>
                      <S.CardHeader>
                        <S.CompanyInfo>
                          {exp.companyLogo && (
                            <S.CompanyLogo src={exp.companyLogo} alt={exp.company} />
                          )}
                          <S.CompanyDetails>
                            <S.JobTitle>{exp.title}</S.JobTitle>
                            <S.Company>
                              <Briefcase size={16} />
                              {exp.company}
                              {exp.isCurrent && (
                                <S.CurrentBadge>
                                  <Award size={12} />
                                  Actuel
                                </S.CurrentBadge>
                              )}
                            </S.Company>
                          </S.CompanyDetails>
                        </S.CompanyInfo>

                        <S.MetaInfo>
                          <S.MetaItem>
                            <Calendar size={14} />
                            {exp.dateRange}
                          </S.MetaItem>
                          <S.MetaItem>
                            <MapPin size={14} />
                            {exp.location}
                          </S.MetaItem>
                        </S.MetaInfo>
                      </S.CardHeader>

                      <S.Description>{exp.description}</S.Description>

                      <S.SkillsContainer>
                        {exp.skills.map((skill, skillIndex) => (
                          <S.SkillTag key={skillIndex}>{skill}</S.SkillTag>
                        ))}
                      </S.SkillsContainer>
                    </S.ExperienceCard>
                  </motion.div>
                </S.TimelineContent>
              </S.TimelineItem>
            ))}
          </motion.div>
        </S.Timeline>
      </div>
    </S.ExperienceSection>
  );
};
