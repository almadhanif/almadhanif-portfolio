/** SEO & structured data — murni (tanpa next/*), dites di seo.test.ts. Pola sama dengan solvara-reserva/src/lib/seo.ts. */
import { profile } from '@/content/profile';
import { experience } from '@/content/experience';
import { caseStudies, type CaseStudy } from '@/content/work';
import { awards } from '@/content/more';

export const SITE_URL = 'https://almadhanif.solvara-tech.com';
/** Maks 70 karakter (dijaga tes). */
export const SITE_TITLE = 'Firman Almadhani Kurniawan — Senior Fullstack & AI Engineer';
/** Maks 160 karakter (dijaga tes). */
export const SITE_DESCRIPTION =
  'Tech Lead & Senior Fullstack/AI Engineer in Jakarta building production RAG, LLM and SaaS systems for US, UK, Singapore and Indonesian clients.';
export const SITE_KEYWORDS = [
  'Firman Almadhani Kurniawan', 'Almadhani', 'Senior Fullstack Engineer', 'AI Engineer', 'Tech Lead',
  'RAG pipeline', 'LLM integration', 'Next.js developer', 'remote fullstack developer Indonesia', 'Solvara',
];
export const OG_IMAGE = { path: '/og/home.png', width: 1200, height: 630, alt: 'Firman Almadhani Kurniawan — Senior Fullstack & AI Engineer · Tech Lead' };

/**
 * `lastmod` sitemap: tanggal terakhir isi situs berubah. Perbarui saat mengubah src/content.
 * Bukan waktu build — tanggal yang selalu "sekarang" membuat mesin pencari mengabaikan lastmod.
 */
export const CONTENT_LAST_MODIFIED = '2026-10-22';

export const PUBLIC_PAGES = ['/', '/cv', ...caseStudies.map((c) => `/work/${c.slug}`)] as const;

export const workTitle = (c: CaseStudy) => `${c.title} — Case study`;

/** Serialisasi JSON-LD aman di dalam <script>: `<` di-escape agar `</script>` pada data tidak menutup tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

const PERSON_ID = `${SITE_URL}/#person`;
const SOLVARA_ORG_ID = 'https://solvara-tech.com/#organization';

export function person() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: `${profile.title} · ${profile.titleAccent}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}${profile.photo}`,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
    sameAs: [profile.linkedin, profile.github],
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.education.school },
    worksFor: [
      { '@type': 'Organization', '@id': SOLVARA_ORG_ID, name: 'Solvara Tech', url: profile.solvara },
      ...experience.filter((e) => e.current).map((e) => ({ '@type': 'Organization', name: e.org })),
    ],
    knowsAbout: ['Retrieval-augmented generation', 'Large language models', 'Next.js', 'TypeScript', 'Microservices', 'PostgreSQL', 'DevOps'],
    award: awards.map((a) => `${a.place} — ${a.name}`),
  };
}

export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person(),
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: profile.name, inLanguage: 'en', publisher: { '@id': PERSON_ID } },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        dateModified: CONTENT_LAST_MODIFIED,
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'ItemList',
        name: 'Case studies',
        itemListElement: caseStudies.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/work/${c.slug}`, name: c.title })),
      },
    ],
  };
}

export function caseStudyJsonLd(c: CaseStudy) {
  const url = `${SITE_URL}/work/${c.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: c.title,
        description: c.summary,
        url,
        image: `${SITE_URL}/og/${c.slug}.png`,
        author: { '@id': PERSON_ID, '@type': 'Person', name: profile.name, url: SITE_URL },
        dateModified: CONTENT_LAST_MODIFIED,
        keywords: c.stack.join(', '),
        about: c.client,
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/#work` },
          { '@type': 'ListItem', position: 3, name: c.title, item: url },
        ],
      },
    ],
  };
}

/** Isi /llms.txt: ringkasan situs untuk agen AI. */
export function llmsTxt(): string {
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    profile.summary.join('\n\n'),
    '',
    '## Case studies',
    ...caseStudies.map((c) => `- [${c.title}](${SITE_URL}/work/${c.slug}): ${c.summary}`),
    '',
    '## Experience',
    ...experience.map((e) => `- ${e.role}, ${e.org} (${e.period})`),
    '',
    '## Contact',
    `- Email: ${profile.email}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- GitHub: ${profile.github}`,
    `- CV (PDF): ${SITE_URL}${profile.cvPath}`,
  ];
  return lines.join('\n') + '\n';
}
