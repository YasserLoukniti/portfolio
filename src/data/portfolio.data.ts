import { PortfolioData } from '../types/portfolio.types';
import databaseJson from './database.json';

// Transformer les données de la base de données au format attendu par l'application
export const portfolioData: PortfolioData = {
  firstName: databaseJson.profile.firstName,
  lastName: databaseJson.profile.lastName,
  fullName: databaseJson.profile.fullName,
  headline: `${databaseJson.profile.title} | ${databaseJson.profile.headline}`,
  about: databaseJson.profile.about.long,
  location: `${databaseJson.profile.location.city}, ${databaseJson.profile.location.region}, ${databaseJson.profile.location.country}`,
  profileImageUrl: databaseJson.profile.profileImage,
  linkedinUrl: databaseJson.profile.socialLinks.linkedin,

  experiences: databaseJson.experiences.map(exp => {
    // Fonction pour formater les dates au format "MMM YYYY"
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      const year = parseInt(parts[0]);
      const month = parts[1] ? parseInt(parts[1]) - 1 : 0;
      const date = new Date(year, month);

      // Utiliser les mois en français
      const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
      const formatted = date.toLocaleDateString('fr-FR', options);
      // Capitaliser le premier caractère du mois
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    return {
      id: exp.id,
      company: exp.company,
      title: exp.title,
      dateRange: `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Présent'}`,
      location: `${exp.location.city}${exp.location.region ? ', ' + exp.location.region : ''}`,
      description: exp.description,
      skills: exp.technologies,
      companyLogo: exp.companyLogo || '',
      isCurrent: exp.isCurrent || false
    };
  }),

  educations: databaseJson.education.map(edu => ({
    id: edu.id,
    school: edu.institution,
    degree: edu.degree,
    fieldOfStudy: edu.fieldOfStudy,
    dateRange: `${edu.startDate.split('-')[0]} - ${edu.endDate.split('-')[0]}`,
    activities: edu.activities || ''
  })),

  certifications: databaseJson.certifications.map(cert => ({
    id: cert.id,
    name: cert.name,
    authority: cert.authority,
    issued: `${cert.issued} · Expires ${cert.expires}`,
    url: cert.url
  })),

  languages: databaseJson.languages.map(lang => ({
    name: lang.name,
    proficiency: lang.proficiency
  })),

  skills: databaseJson.skills.technical.map(category => ({
    category: category.category,
    skills: category.items.map(item => item.name)
  }))
};

// Export des données brutes pour un accès direct si nécessaire
export const database = databaseJson;

// Export des statistiques
export const statistics = databaseJson.statistics;

// Export des projets
export const projects = databaseJson.projects;

// Export des témoignages
export const testimonials = databaseJson.testimonials;

// Export du profil complet
export const profile = databaseJson.profile;

// Export des achievements
export const achievements = databaseJson.achievements;

// Export des centres d'intérêt
export const interests = databaseJson.interests;