import type { MetadataRoute } from 'next';
import { database, profile } from '@/data/portfolio.data';

const SITE_URL = profile.socialLinks.portfolio || 'https://yasserloukniti.com';

// Sitemap généré au build : page d'accueil + une page par expérience
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...database.experiences.map((exp) => ({
      url: `${SITE_URL}/experience/${exp.id}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
