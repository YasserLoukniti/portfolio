import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolioData, profile } from '../../data/portfolio.data';
import * as S from './About.styles';

export const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = ['TypeScript', 'NestJS', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'MongoDB'];

  return (
    <S.AboutSection id="about" ref={ref}>
      <S.Container>
        <S.Grid>
          {/* Sidebar gauche */}
          <S.Sidebar
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <S.ProfileImage>
              <img src={profile.profileImage} alt={profile.fullName} />
            </S.ProfileImage>

            <S.SidebarName>{profile.fullName}</S.SidebarName>
            <S.SidebarTitle>Full Stack Developer</S.SidebarTitle>

            <S.Location>
              <MapPin />
              {profile.location.city}, {profile.location.country}
            </S.Location>

            <S.SocialLinks>
              <S.SocialLink
                href={portfolioData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin />
              </S.SocialLink>
              <S.SocialLink
                href={portfolioData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github />
              </S.SocialLink>
              <S.SocialLink
                href={`mailto:${portfolioData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail />
              </S.SocialLink>
            </S.SocialLinks>

            <S.DownloadButton
              href={portfolioData.resumeUrl}
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download />
              Telecharger CV
            </S.DownloadButton>
          </S.Sidebar>

          {/* Contenu principal */}
          <S.MainContent
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <S.Label>A propos</S.Label>

            <S.Title>
              Full Stack TypeScript, de l'idee au produit
            </S.Title>

            <S.Description>
              {profile.about.short}
            </S.Description>

            <S.CTAButton
              href="#experience"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir mon parcours
              <ArrowRight />
            </S.CTAButton>

            <S.TechSection>
              <S.TechLabel>Stack technique</S.TechLabel>
              <S.TechTags>
                {technologies.map((tech) => (
                  <S.TechTag key={tech}>{tech}</S.TechTag>
                ))}
              </S.TechTags>
            </S.TechSection>
          </S.MainContent>
        </S.Grid>
      </S.Container>
    </S.AboutSection>
  );
};
