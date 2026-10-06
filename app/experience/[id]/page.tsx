import type { Metadata } from 'next';
import { database } from '@/data/portfolio.data';
import { ExperienceDetail } from '@/components/ExperienceDetail/ExperienceDetail';

interface PageProps {
  params: { id: string };
}

// Pages pré-générées au build pour chaque expérience
export function generateStaticParams() {
  return database.experiences.map((exp) => ({ id: exp.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const experience = database.experiences.find((exp) => exp.id === params.id);
  if (!experience) {
    return { title: 'Expérience non trouvée' };
  }

  const title = `${experience.title} chez ${experience.company}`;
  const description = experience.description.length > 160
    ? `${experience.description.slice(0, 157)}...`
    : experience.description;

  return {
    title,
    description,
    alternates: { canonical: `/experience/${experience.id}` },
    openGraph: { title, description, url: `/experience/${experience.id}` },
  };
}

export default function ExperienceDetailPage({ params }: PageProps) {
  return <ExperienceDetail id={params.id} />;
}
