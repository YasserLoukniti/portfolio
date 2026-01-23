import React from 'react';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import * as S from './Education.styles';

export const Education: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <S.EducationSection id="education" ref={ref}>
      <S.Container>
        <S.SectionHeader>
          <S.Label
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Formation
          </S.Label>
          <S.SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Parcours academique
          </S.SectionTitle>
          <S.SectionDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Formation en informatique et developpement logiciel.
          </S.SectionDescription>
        </S.SectionHeader>

        <S.EducationGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {portfolioData.educations.map((education) => (
            <S.EducationCard key={education.id} variants={itemVariants}>
              <S.CardHeader>
                <S.SchoolLogo>
                  {education.logo ? (
                    <img src={education.logo} alt={education.school} />
                  ) : (
                    <GraduationCap size={24} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  )}
                </S.SchoolLogo>
                <S.SchoolInfo>
                  <S.School>{education.school}</S.School>
                  {education.institutionFullName && (
                    <S.Institution>{education.institutionFullName}</S.Institution>
                  )}
                </S.SchoolInfo>
              </S.CardHeader>

              <S.Degree>{education.degree}</S.Degree>
              {education.fieldOfStudy && <S.Field>{education.fieldOfStudy}</S.Field>}

              <S.DateRange>
                <Calendar />
                {education.dateRange}
              </S.DateRange>

              {(education.description || education.activities) && (
                <S.Description>
                  {education.description || education.activities}
                </S.Description>
              )}
            </S.EducationCard>
          ))}
        </S.EducationGrid>
      </S.Container>
    </S.EducationSection>
  );
};
