import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, Globe } from 'lucide-react';
import { portfolioData } from '../../data/portfolio.data';
import * as S from './Certifications.styles';

const getLevelDots = (proficiency: string): number => {
  const levels: { [key: string]: number } = {
    'native': 5,
    'natif': 5,
    'fluent': 5,
    'courant': 5,
    'professional': 4,
    'professionnel': 4,
    'advanced': 4,
    'avance': 4,
    'intermediate': 3,
    'intermediaire': 3,
    'basic': 2,
    'basique': 2,
    'beginner': 1,
    'debutant': 1,
  };
  return levels[proficiency.toLowerCase()] || 3;
};

export const Certifications: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certification = portfolioData.certifications[0];

  return (
    <S.CertificationsSection id="certifications" ref={ref}>
      <S.Container>
        <S.Grid>
          {/* Certifications */}
          <S.CertificationsColumn
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <S.ColumnHeader>
              <S.Label>Credentials</S.Label>
              <S.ColumnTitle>Certifications</S.ColumnTitle>
            </S.ColumnHeader>

            <S.CertificationCard
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <S.CertHeader>
                <S.CertIcon>
                  <Award />
                </S.CertIcon>
                <S.CertInfo>
                  <S.CertName>{certification.name}</S.CertName>
                  <S.CertAuthority>{certification.authority}</S.CertAuthority>
                </S.CertInfo>
              </S.CertHeader>

              <S.CertMeta>
                <S.CertDate>
                  <Calendar />
                  {certification.issued}
                </S.CertDate>
                <S.CertLink
                  href={certification.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir credential
                  <ExternalLink />
                </S.CertLink>
              </S.CertMeta>
            </S.CertificationCard>
          </S.CertificationsColumn>

          {/* Languages */}
          <S.LanguagesColumn
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <S.ColumnHeader>
              <S.Label>Communication</S.Label>
              <S.ColumnTitle>Langues</S.ColumnTitle>
            </S.ColumnHeader>

            <S.LanguagesGrid>
              {portfolioData.languages.map((language, index) => (
                <S.LanguageCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <S.LanguageInfo>
                    <S.LanguageIcon>
                      <Globe />
                    </S.LanguageIcon>
                    <div>
                      <S.LanguageName>{language.name}</S.LanguageName>
                      <S.LanguageLevel>{language.proficiency}</S.LanguageLevel>
                    </div>
                  </S.LanguageInfo>
                  <S.LevelDots>
                    {[...Array(5)].map((_, i) => (
                      <S.LevelDot
                        key={i}
                        $filled={i < getLevelDots(language.proficiency)}
                      />
                    ))}
                  </S.LevelDots>
                </S.LanguageCard>
              ))}
            </S.LanguagesGrid>
          </S.LanguagesColumn>
        </S.Grid>
      </S.Container>
    </S.CertificationsSection>
  );
};
