// Riwayat kerja dari CV v4. `highlights` = 2 poin terkuat per peran.
export type Experience = {
  org: string;
  role: string;
  period: string;
  start: string; // ISO yyyy-mm, dipakai JSON-LD
  end?: string;
  cc: 'US' | 'SG' | 'ID';
  where: string;
  context: string;
  highlights: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    org: 'Openloop Health',
    role: 'Team Lead Senior Fullstack Developer',
    period: 'May 2026 – Present',
    start: '2026-05',
    cc: 'US',
    where: 'Remote',
    context: 'White-label telehealth platform: 600+ insurance plans, 3M+ annual patient visits, all 50 US states.',
    highlights: [
      'Owned AI Assist (Vertex AI / Gemini) from spike to production — model picked through a 315-call eval harness, shipped in 6 PRs with 100+ new tests.',
      'Release gatekeeper: verified 15+ tickets with QA, made ship/hold calls, shipped 2 hotfixes and ran 40+ code reviews.',
    ],
    current: true,
  },
  {
    org: 'Quill Learn',
    role: 'Senior Fullstack Developer',
    period: 'Nov 2025 – Present',
    start: '2025-11',
    cc: 'SG',
    where: 'Remote contract',
    context: 'International education provider.',
    highlights: [
      'Owned the AI question reviewer end to end: 40-question analysis cut from ~4 min to ~1.7 min, import from ~30 s to near-instant.',
      'Inherited a half-built platform and shipped ~45–50% of the codebase that followed, including a standalone SCORM 1.2/2004 runtime.',
    ],
    current: true,
  },
  {
    org: 'Fortech Indotama',
    role: 'Tech Lead',
    period: 'Aug 2025 – Jun 2026',
    start: '2025-08',
    end: '2026-06',
    cc: 'ID',
    where: 'Jakarta',
    context: 'Enterprise software & AI consultancy.',
    highlights: [
      'Migrated a Flask monolith to Next.js, Express and FastAPI microservices; CI/CD cut deployment time 75% and moved releases from weekly to daily.',
      'Built a RAG pipeline from scratch for PT Krakatau Jasa Industri and cut average PostgreSQL query time 40%.',
    ],
  },
  {
    org: 'Naturindo Surya Niaga',
    role: 'Project Lead & Fullstack Developer',
    period: 'Oct 2024 – Aug 2025',
    start: '2024-10',
    end: '2025-08',
    cc: 'ID',
    where: 'Yogyakarta',
    context: 'Consumer goods & marketing.',
    highlights: [
      'Led an SEO-optimised campaign platform (Next.js 14, Prisma, PostgreSQL) to #1 Google ranking for target keywords within weeks of launch.',
      'Built S3 storage for receipts and zero-downtime GitHub Actions deployments.',
    ],
  },
  {
    org: 'KMPlus International',
    role: 'Fullstack Developer',
    period: 'Aug 2024 – Aug 2025',
    start: '2024-08',
    end: '2025-08',
    cc: 'ID',
    where: 'South Jakarta',
    context: 'IT consulting.',
    highlights: [
      'Scaled Pelindo’s Learning Management System to 8,300+ active users.',
      'Delivered a drag-and-drop course builder (dnd-kit), Tiptap editing and Chart.js dashboards; set team code-quality standards.',
    ],
  },
  {
    org: 'AMIKOM Yogyakarta University',
    role: 'Fullstack Developer',
    period: 'May 2023 – Jun 2024',
    start: '2023-05',
    end: '2024-06',
    cc: 'ID',
    where: 'Yogyakarta',
    context: 'Part-time.',
    highlights: [
      'Led backend API development, testing and deployment for cross-device web apps used by university stakeholders.',
      'Authored system architecture documentation and ran internal training sessions.',
    ],
  },
];
