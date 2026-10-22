// Proyek lain (tanpa halaman studi kasus), keahlian, penghargaan, sertifikasi.
export const otherWork = [
  {
    title: 'Aluminium price prediction',
    client: 'Fortech Indotama',
    cc: 'ID',
    desc: 'Hybrid Prophet + XGBoost forecasting with a FinBERT news-sentiment engine pushing recalibrated forecasts over WebSocket.',
    stack: ['Prophet', 'XGBoost', 'FinBERT', 'WebSocket'],
  },
  {
    title: 'SEO campaign platform',
    client: 'Naturindo Surya Niaga',
    cc: 'ID',
    desc: '#1 Google ranking for target keywords within weeks of launch, with S3 receipt storage and zero-downtime CI/CD.',
    stack: ['Next.js 14', 'Prisma', 'PostgreSQL', 'AWS S3'],
    href: 'https://umrohnaturindo.com',
  },
  {
    title: 'Pelindo LMS',
    client: 'KMPlus International',
    cc: 'ID',
    desc: 'Scaled to 8,300+ active users with a drag-and-drop course builder, rich-text editing and dashboards.',
    stack: ['Express', 'Tiptap', 'dnd-kit', 'Chart.js'],
  },
  {
    title: 'Whistleblowing system',
    client: 'Hutama Karya',
    cc: 'ID',
    desc: 'Multi-tenant compliance platform with Django + Celery, RSA-signed JWT auth and a Next.js admin console.',
    stack: ['Django', 'Celery', 'Next.js', 'Jenkins'],
  },
] as const;

// [nama, slug simple-icons atau null]; ikon diunduh saat build oleh scripts/icons.mjs
export const skills: { group: string; items: [string, string | null][] }[] = [
  { group: 'AI & ML', items: [['Vertex AI', 'googlecloud'], ['Gemini', 'googlegemini'], ['OpenAI', 'openai'], ['Ollama', 'ollama'], ['LangChain', 'langchain'], ['Qdrant · RAG', null], ['FinBERT', 'huggingface'], ['Prophet · XGBoost', null], ['MCP', 'modelcontextprotocol']] },
  { group: 'Frontend', items: [['React', 'react'], ['Next.js', 'nextdotjs'], ['SvelteKit', 'svelte'], ['TypeScript', 'typescript'], ['Tailwind', 'tailwindcss'], ['TanStack Query', 'reactquery'], ['Zustand', null], ['Tiptap', null]] },
  { group: 'Backend', items: [['Node.js', 'nodedotjs'], ['Express', 'express'], ['FastAPI', 'fastapi'], ['Django', 'django'], ['Bun · Elysia', 'bun'], ['tRPC', 'trpc'], ['Prisma', 'prisma'], ['Drizzle', 'drizzle'], ['GraphQL', 'graphql']] },
  { group: 'Data & queues', items: [['PostgreSQL', 'postgresql'], ['PostGIS', null], ['TimescaleDB', 'timescale'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Redis', 'redis'], ['RabbitMQ', 'rabbitmq'], ['Celery', 'celery']] },
  { group: 'DevOps & cloud', items: [['Docker', 'docker'], ['GitHub Actions', 'githubactions'], ['Caddy', 'caddy'], ['Nginx', 'nginx'], ['Cloudflare', 'cloudflare'], ['AWS S3', 'amazons3'], ['Azure', 'microsoftazure'], ['MinIO', 'minio'], ['SOPS · age', null]] },
];

export const awards = [
  { scope: 'International', name: 'APICTA 2024', place: 'Finalist', note: 'Asia Pacific ICT Awards · representing 1 of 16 countries' },
  { scope: 'International', name: 'Thailand Inventors Day 2023', place: 'Silver Medal', note: '469 competing teams from 57 countries' },
  { scope: 'International', name: 'Bio Farma × MIT Hacking Medicine 2023', place: 'Finalist', note: 'Healthcare innovation challenge' },
  { scope: 'National', name: 'IdenTIK 2023', place: '4th Place', note: 'Private Sector Technology · Kominfo' },
  { scope: 'National', name: 'IdenTIK 2023', place: '5th Place', note: 'Digital Content Innovation · Kominfo' },
  { scope: 'Academic', name: 'Hackathon AMICTA 2022', place: '1st Place', note: 'Universitas AMIKOM · judged by AWS' },
] as const;

export const certifications = [
  { name: 'IELTS Academic', detail: 'Band 6.5 · B2', issuer: 'British Council · 2024' },
  { name: 'Google for Education', detail: 'Deployment Credential', issuer: 'Google · Nov 2025' },
  { name: 'Google Workspace', detail: 'Deployment Services Technical', issuer: 'Google · Nov 2025' },
] as const;
