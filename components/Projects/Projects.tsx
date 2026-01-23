import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Folder, Star } from 'lucide-react';
import { projects } from '../../data/portfolio.data';
import * as S from './Projects.styles';

export const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Utiliser les donnees depuis la base de donnees JSON
  const projectsData = projects.map(project => ({
    ...project,
    githubUrl: project.links.github || '#',
    liveUrl: project.links.live || project.links.demo || '#',
    statusLabel: project.status === 'production' ? 'En production' :
                 project.status === 'development' ? 'En developpement' :
                 project.status === 'open-source' ? 'Open Source' : 'En cours'
  }));

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
        duration: 0.5,
      },
    },
  };

  return (
    <S.ProjectsSection id="projects" ref={ref}>
      <div className="container">
        <S.SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Projets Recents
        </S.SectionTitle>

        <S.ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projectsData.map((project) => (
            <S.ProjectCard
              key={project.id}
              variants={itemVariants}
            >
              <S.ProjectImage>
                {project.featured && (
                  <S.FeaturedBadge>
                    <Star size={14} />
                    Featured
                  </S.FeaturedBadge>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.background = 'linear-gradient(135deg, #111111 0%, #1A1A1A 100%)';
                    target.parentElement!.innerHTML = `
                      <div style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #10B981;
                        font-size: 20px;
                        font-weight: bold;
                      ">
                        ${project.title}
                      </div>
                    `;
                  }}
                />
                <S.ProjectImageOverlay>
                  {project.githubUrl && (
                    <S.ProjectLink
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Voir sur GitHub"
                    >
                      <Github size={24} />
                    </S.ProjectLink>
                  )}
                  {project.liveUrl && (
                    <S.ProjectLink
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Voir le site"
                    >
                      <ExternalLink size={24} />
                    </S.ProjectLink>
                  )}
                </S.ProjectImageOverlay>
              </S.ProjectImage>

              <S.ProjectContent>
                <S.ProjectHeader>
                  <S.ProjectIcon>
                    <Folder size={24} />
                  </S.ProjectIcon>
                  <S.ProjectTitle>{project.title}</S.ProjectTitle>
                </S.ProjectHeader>

                <S.ProjectDescription>{project.description}</S.ProjectDescription>

                <S.ProjectTechStack>
                  {project.technologies.map((tech) => (
                    <S.TechBadge key={tech}>{tech}</S.TechBadge>
                  ))}
                </S.ProjectTechStack>

                <S.ProjectFooter>
                  <S.ProjectStatus>
                    <span>•</span>
                    {project.statusLabel}
                  </S.ProjectStatus>
                  <S.ProjectLinks>
                    {project.githubUrl && (
                      <S.ProjectLinkIcon
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </S.ProjectLinkIcon>
                    )}
                    {project.liveUrl && (
                      <S.ProjectLinkIcon
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live"
                      >
                        <ExternalLink size={20} />
                      </S.ProjectLinkIcon>
                    )}
                  </S.ProjectLinks>
                </S.ProjectFooter>
              </S.ProjectContent>
            </S.ProjectCard>
          ))}
        </S.ProjectsGrid>
      </div>
    </S.ProjectsSection>
  );
};
