// Produk Solvara yang live. `caseStudy` menautkan ke /work/<slug> bila ada.
export type Product = {
  key: string;
  name: string;
  eyebrow: string;
  url: string;
  href: string;
  img: string;
  desc: string;
  points: [string, string][];
  stack: string[];
  caseStudy?: string;
};

export const products: Product[] = [
  {
    key: 'reserva',
    name: 'Solvara Reserva',
    eyebrow: 'Booking SaaS · Clinics & rentals',
    url: 'reserva.solvara-tech.com',
    href: 'https://reserva.solvara-tech.com',
    img: '/img/reserva.webp',
    desc: 'No-code booking funnels with live slots, online deposits, a customer portal and analytics.',
    points: [
      ['Zero double bookings', 'enforced by a Postgres exclusion constraint'],
      ['Deposits', 'paid straight into each tenant’s own Mayar account'],
      ['REST API, webhooks & MCP', 'for tenants and AI agents'],
    ],
    stack: ['Next.js 16', 'tRPC', 'Prisma', 'PostgreSQL'],
    caseStudy: 'solvara-reserva',
  },
  {
    key: 'nata',
    name: 'Solvara Nata',
    eyebrow: 'Space leasing · Commercial areas',
    url: 'nata.solvara-tech.com',
    href: 'https://nata.solvara-tech.com',
    img: '/img/nata.webp',
    desc: 'Lease tenant units straight from an interactive site map, with listings, brochures and an inquiry flow.',
    points: [
      ['Per-client terminology', 'so one codebase fits different industries'],
      ['Scoped admin roles', 'by region and area, checked on every record'],
    ],
    stack: ['Django', 'Celery', 'Next.js', 'PostgreSQL'],
  },
  {
    key: 'jaga',
    name: 'Solvara JAGA',
    eyebrow: 'Workforce · Outsourcing & security',
    url: 'jaga.solvara-tech.com',
    href: 'https://jaga.solvara-tech.com',
    img: '/img/jaga.webp',
    desc: 'Field-workforce management with per-client work rules and contract expiry alerts.',
    points: [
      ['Geo-fenced attendance', 'that counts an overnight shift as one shift'],
      ['PII masked by default', 'and every reveal audit-logged'],
    ],
    stack: ['Next.js', 'Prisma', 'PostGIS'],
  },
  {
    key: 'sigap',
    name: 'Solvara SIGAP',
    eyebrow: 'School-meal logistics · MBG programme',
    url: 'sigap.solvara-tech.com',
    href: 'https://sigap.solvara-tech.com',
    img: '/img/sigap.webp',
    desc: 'Kitchens, schools, drivers and nutritionists in one multi-tenant platform, from menu costing to proof of delivery.',
    points: [
      ['7 role types', 'across foundation, kitchen and school'],
      ['Network monitoring', 'on-time rate, ratings and complaints per kitchen'],
    ],
    stack: ['Next.js 16', 'Prisma', 'PostgreSQL', 'MinIO'],
  },
  {
    key: 'prakira',
    name: 'Prakira Sawit',
    eyebrow: 'Price forecasting · Palm-oil FFB',
    url: 'solvara-tech.com/prakira-sawit',
    href: 'https://solvara-tech.com/prakira-sawit',
    img: '/img/prakira.webp',
    desc: 'Weekly FFB prices for 22 provinces with ranking, trend and a next-period projection with confidence bands.',
    points: [
      ['Provincial parity', 'computed from K-index and actual rendemen'],
      ['Walk-forward backtesting', 'on every forecast'],
    ],
    stack: ['Next.js 16', 'Drizzle', 'FastAPI', 'Prophet'],
  },
];
