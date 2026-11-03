// Génère les CV PDF (version Full Stack et version Python) via Chrome headless.
// Usage : node scripts/cv/generate-cv.mjs
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { variants } from './cv.data.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const asset = (p) => pathToFileURL(join(ROOT, 'public', p)).href;

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);

// Icônes inline (tracés Lucide)
const ICONS = {
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5-2.6-.5-5.4-.5-8 0C6 2 5 2 5 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1-.8 1.6-.2.6-.3 1.2-.2 1.9v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0"/><path d="M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
};
const icon = (name, cls = 'ic') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Met en gras le préfixe "LABEL :" d'une puce
const bullet = (b) => {
  const m = b.match(/^([A-ZÀ-Ý][A-ZÀ-Ý0-9 &'/-]+(?: \([^)]*\))?) : (.*)$/);
  return m ? `<li><b>${esc(m[1])} :</b> ${esc(m[2])}</li>` : `<li>${esc(b)}</li>`;
};
const tags = (list) => `<div class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
const sectionTitle = (ic, label) => `<h2 class="section-title">${icon(ic)}${label}</h2>`;

const logo = (exp) =>
  exp.logo
    ? `<div class="logo"><img src="${asset(exp.logo)}" alt=""></div>`
    : `<div class="logo logo-text">${esc(exp.logoText)}</div>`;

const renderExperience = (exp) => `
  <article class="exp">
    ${logo(exp)}
    <div class="exp-body">
      <div class="exp-head">
        <div>
          <h3>${esc(exp.title)}</h3>
          <div class="company">${esc(exp.company)} <span class="loc">${icon('pin', 'ic-sm')}${esc(exp.location)}</span></div>
        </div>
        <div class="date">${icon('calendar', 'ic-sm')}${esc(exp.date)}</div>
      </div>
      <p class="lead">${esc(exp.lead)}</p>
      ${exp.bullets.length ? `<ul>${exp.bullets.map(bullet).join('')}</ul>` : ''}
      ${exp.tags.length ? tags(exp.tags) : ''}
    </div>
  </article>`;

// Logo du projet : image de public/, pastille Job Hunter en CSS ou icône
const projectLogo = (p) => {
  if (p.logo) return `<img src="${asset(p.logo)}" alt="">`;
  if (p.logoKind === 'dot') return '<span class="dot"></span>';
  return icon(p.logoKind);
};

const renderProject = (p) => `
  <a class="proj" href="${esc(p.url)}"><div class="proj-logo proj-logo-${p.logoKind || 'img'}">${projectLogo(p)}</div><div><div>${esc(p.name)}</div><div class="proj-url">${esc(p.linkLabel || p.url.replace(/^https:\/\/(www\.)?/, ''))}</div></div></a>`;

const renderSkills = (groups) =>
  groups.map((g) => `<div class="skill-group"><h4>${esc(g.label)}</h4>${tags(g.items)}</div>`).join('');

const renderHtml = (v) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>CV ${esc(v.profile.name)} - ${esc(v.profile.title)}</title>
<style>
  @page { size: A4; margin: 0; }
  :root {
    --navy: #0f172a; --navy-2: #1e293b; --accent: #10b981; --accent-dark: #047857;
    --text: #1e293b; --muted: #64748b; --border: #e2e8f0; --side: #f8fafc;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Segoe UI", "Noto Sans", Arial, sans-serif; color: var(--text); font-size: 9pt; line-height: 1.32; background: #fff; }
  .page { width: 210mm; height: 297mm; overflow: hidden; display: flex; flex-direction: column; }

  header { background: var(--navy); color: #fff; padding: 18px 28px 12px; }
  .head-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
  h1 { font-size: 22pt; font-weight: 800; letter-spacing: .5px; line-height: 1.1; }
  .title { color: var(--accent); font-size: 12.5pt; font-weight: 600; margin-top: 2px; }
  .summary { display: flex; gap: 10px; margin-top: 7px; color: #cbd5e1; font-size: 9pt; text-align: justify; }
  .summary .ic { color: #facc15; width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }
  .summary b { color: #fff; font-weight: 600; }
  .photo { width: 84px; height: 84px; border-radius: 50%; object-fit: cover; border: 4px solid var(--navy-2); box-shadow: 0 0 0 2px #334155; flex-shrink: 0; }
  .contacts { display: flex; flex-wrap: wrap; gap: 4px 14px; border-top: 1px solid #334155; margin-top: 10px; padding-top: 8px; font-size: 8.2pt; color: #e2e8f0; }
  a { color: inherit; text-decoration: none; }
  .contacts span, .contacts a { display: inline-flex; align-items: center; gap: 6px; }
  .contacts .ic { color: var(--accent); width: 13px; height: 13px; }

  .grid { flex: 1; display: grid; grid-template-columns: 30% 70%; min-height: 0; }
  aside { background: var(--side); border-right: 1px solid var(--border); padding: 14px 14px 14px 22px; }
  main { padding: 14px 24px 14px 18px; }
  .section-title { display: flex; align-items: center; gap: 9px; font-size: 10.5pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--navy); border-bottom: 1.5px solid var(--border); padding-bottom: 4px; margin-bottom: 8px; }
  .section-title .ic { width: 16px; height: 16px; }
  section + section { margin-top: 16px; }

  .skill-group + .skill-group { margin-top: 8px; }
  .skill-group h4 { color: var(--accent-dark); font-size: 8.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; margin-bottom: 5px; }
  .tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .tag { border: 1px solid var(--border); background: #fff; border-radius: 4px; padding: 0 6px; font-size: 7.9pt; color: #334155; }
  main .tags { margin-top: 4px; }
  main .tag { background: #f1f5f9; font-weight: 600; font-size: 7.4pt; color: #475569; }

  .edu + .edu { margin-top: 6px; }
  .edu h3 { font-size: 9pt; }
  .edu .school { color: var(--accent-dark); font-size: 8.4pt; }
  .edu .years { color: var(--muted); font-style: italic; font-size: 8.6pt; }
  .edu p { font-size: 8.6pt; color: #475569; }
  .lang { display: flex; justify-content: space-between; font-size: 8.8pt; padding: 1px 0; }
  .lang span:last-child { color: var(--muted); font-size: 8.6pt; }
  .cert { border: 1px solid #a7f3d0; background: #ecfdf5; border-radius: 7px; padding: 8px 10px; }
  .cert h3 { font-size: 9.4pt; color: #064e3b; }
  .cert p { font-size: 8.4pt; color: var(--accent-dark); }

  .exp { display: flex; gap: 12px; }
  .exp + .exp { margin-top: 12px; }
  .logo { width: 32px; height: 32px; border-radius: 9px; border: 1px solid var(--border); background: #fff; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .logo img { width: 100%; height: 100%; object-fit: contain; }
  .logo-text { font-size: 6.5pt; font-weight: 700; color: var(--accent-dark); text-align: center; line-height: 1.1; }
  .exp-body { flex: 1; min-width: 0; }
  .exp-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
  h3 { font-size: 9.8pt; font-weight: 700; color: var(--navy); }
  .company { color: var(--accent-dark); font-weight: 700; font-size: 8.6pt; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
  .loc { color: var(--muted); font-weight: 400; text-transform: none; font-size: 8.6pt; display: inline-flex; align-items: center; gap: 3px; }
  .date { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; background: #f1f5f9; border: 1px solid var(--border); border-radius: 5px; padding: 1px 7px; font-size: 7.8pt; font-weight: 600; color: #475569; }
  .ic-sm { width: 11px; height: 11px; }
  .lead { font-weight: 600; font-size: 8.8pt; margin-top: 2px; }
  ul { list-style: none; margin-top: 3px; }
  li { position: relative; padding-left: 11px; font-size: 8.5pt; color: #334155; margin-top: 1px; }
  li::before { content: ""; position: absolute; left: 2px; top: 6px; width: 4px; height: 4px; border-radius: 50%; background: var(--accent); }
  li b { font-weight: 600; color: var(--navy); }

  .proj { display: flex; align-items: center; gap: 9px; font-size: 9pt; font-weight: 600; color: var(--navy); }
  .proj + .proj { margin-top: 6px; }
  .proj-url { font-size: 7.6pt; font-weight: 400; color: var(--accent-dark); }
  .proj-logo { width: 22px; height: 22px; border-radius: 6px; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .proj-logo img { width: 100%; height: 100%; object-fit: cover; }
  .proj-logo-dot { background: #0b1220; }
  .proj-logo-dot .dot { width: 10px; height: 10px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 3px #1f3b35; }
  .proj-logo-github { background: #0f172a; color: #fff; }
  .proj-logo-github .ic { width: 13px; height: 13px; }
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="head-top">
        <div>
          <h1>${esc(v.profile.name.toUpperCase())}</h1>
          <div class="title">${esc(v.profile.title)}</div>
          <div class="summary">${icon('sparkles')}<div>${v.profile.summary}</div></div>
        </div>
        <img class="photo" src="${asset('profile-2026.jpg')}" alt="">
      </div>
      <div class="contacts">
        ${v.profile.contacts.map((c) => (c.href
          ? `<a href="${esc(c.href)}">${icon(c.icon)}${esc(c.label)}</a>`
          : `<span>${icon(c.icon)}${esc(c.label)}</span>`)).join('')}
      </div>
    </header>
    <div class="grid">
      <aside>
        <section>${sectionTitle('code', 'Compétences')}${renderSkills(v.skills)}</section>
        <section>${sectionTitle('book', 'Formation')}${v.education.map((e) => `
          <div class="edu"><h3>${esc(e.degree)}</h3><div class="school">${esc(e.school)} · <span class="years">${esc(e.years)}</span></div></div>`).join('')}
        </section>
        <section>${sectionTitle('globe', 'Langues')}${v.languages.map((l) => `<div class="lang"><span>${esc(l.name)}</span><span>${esc(l.level)}</span></div>`).join('')}</section>
        <section>${sectionTitle('award', 'Certification')}${v.certifications.map((c) => `
          <div class="cert"><h3>${esc(c.name)}</h3><p>${esc(c.authority)} · ${esc(c.years)}</p></div>`).join('')}
        </section>
        <section>${sectionTitle('rocket', 'Projets')}${v.projects.map(renderProject).join('')}</section>
      </aside>
      <main>
        <section>${sectionTitle('briefcase', 'Expériences professionnelles')}${v.experiences.map(renderExperience).join('')}</section>
      </main>
    </div>
  </div>
</body>
</html>`;

const chrome = CHROME_PATHS.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome/Edge introuvable : définir CHROME_PATH');

const workDir = mkdtempSync(join(tmpdir(), 'cv-'));
for (const v of variants) {
  const htmlPath = join(workDir, `${v.id}.html`);
  writeFileSync(htmlPath, renderHtml(v), 'utf8');
  const out = join(ROOT, 'public', v.output);
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--allow-file-access-from-files',
    `--print-to-pdf=${out}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: 'ignore' });
  console.log(`CV généré : public/${v.output}`);
}
