import { ImageResponse } from 'next/og';
import { profile } from '@/data/portfolio.data';

export const runtime = 'edge';

// Image affichée lors du partage du site (LinkedIn, Slack, X...)
export const alt = `${profile.fullName} | ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const STACK = ['TypeScript', 'Python', 'NestJS', 'FastAPI', 'AWS'];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.35) 0%, #030303 60%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#818CF8', letterSpacing: 4, textTransform: 'uppercase' }}>
          Portfolio
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 16 }}>{profile.fullName}</div>
        <div style={{ fontSize: 40, color: '#A1A1AA', marginTop: 12 }}>{profile.title}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          {STACK.map((tech) => (
            <div
              key={tech}
              style={{
                fontSize: 26,
                padding: '10px 24px',
                borderRadius: 999,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {tech}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 26, color: '#52525B', marginTop: 'auto' }}>
          {profile.socialLinks.portfolio.replace('https://', '')}
        </div>
      </div>
    ),
    size
  );
}
