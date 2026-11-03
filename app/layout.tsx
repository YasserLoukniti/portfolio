import type { Metadata, Viewport } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { profile } from "@/data/portfolio.data";
import "./globals.css";

const SITE_URL = profile.socialLinks.portfolio || "https://yasserloukniti.com";
const TITLE = `${profile.fullName} | ${profile.title}`;
const DESCRIPTION =
  "Portfolio de Yasser Loukniti, Full Stack Engineer spécialisé en TypeScript et Python (NestJS, FastAPI, Next.js, LangChain, AWS). Expériences, projets, compétences et assistant IA pour répondre à vos questions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${profile.fullName}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Yasser Loukniti",
    "Full Stack Engineer",
    "Développeur Full Stack",
    "TypeScript",
    "Python",
    "NestJS",
    "FastAPI",
    "Next.js",
    "React",
    "AWS",
    "Paris",
  ],
  authors: [{ name: profile.fullName, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: profile.fullName,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#030303",
};

// Données structurées pour Google (schema.org Person)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.title,
  url: SITE_URL,
  image: `${SITE_URL}${profile.profileImage}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressCountry: profile.location.countryCode,
  },
  sameAs: [profile.socialLinks.linkedin, profile.socialLinks.github].filter(Boolean),
  knowsAbout: ["TypeScript", "Python", "NestJS", "FastAPI", "Next.js", "React", "Node.js", "LangChain", "AWS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
