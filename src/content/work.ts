// Studi kasus /work/<slug>. Setiap klaim harus bersumber dari CV v4, README profil, atau kode Solvara.
// Klien tanpa screenshot publik memakai diagram alur (`flow`), bukan tangkapan layar.
export type FlowStep = { title: string; note: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  cc: 'US' | 'SG' | 'ID';
  period: string;
  role: string;
  /** ≤ 160 karakter: dipakai meta description & kartu (dijaga tes). */
  summary: string;
  metrics: { value: string; label: string }[];
  context: string;
  problem: string;
  decisions: { title: string; body: string }[];
  results: string[];
  stack: string[];
  visual: { kind: 'shot'; src: string; url: string; alt: string } | { kind: 'flow'; caption: string; steps: FlowStep[] };
  live?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-assist-funnel-builder',
    title: 'AI Assist for a telehealth funnel builder',
    client: 'Openloop Health',
    cc: 'US',
    period: '2026',
    role: 'Team Lead · owner from spike to production',
    summary:
      'An AI editing assistant on Vertex AI that safely edits live funnel pages, with the production model picked through a 315-call evaluation harness.',
    metrics: [
      { value: '315', label: 'eval calls to choose the model' },
      { value: '6 PRs', label: 'shipped with 100+ new tests' },
      { value: '4', label: 'Gemini tool definitions' },
    ],
    context:
      'Openloop runs a white-label telehealth platform serving 600+ insurance plans and hundreds of client brands. Marketers build patient funnels in an in-house page builder.',
    problem:
      'Marketers wanted to change copy and layout by describing the change, but the builder’s page structure is strict: one bad edit can break a live funnel that patients are using right now. The feature needed privacy review before any patient-facing content touched a model.',
    decisions: [
      {
        title: 'Choose the model on evidence, not taste',
        body: 'Built an evaluation harness of 21 real utterances across 5 model and prompt variants — 315 calls — and picked the production setup from the results.',
      },
      {
        title: 'Tools instead of free text',
        body: 'The model answers through 4 Gemini tool definitions behind a tRPC endpoint, so every suggestion is a structured operation rather than HTML to paste.',
      },
      {
        title: 'A patch engine as the safety boundary',
        body: 'Suggested operations go through a patch engine that validates and applies them to live page content, so the page structure cannot be corrupted.',
      },
      {
        title: 'Scope before code',
        body: 'Ran the technical research and privacy review first, then split the work into 10 tickets so it could ship incrementally.',
      },
    ],
    results: [
      'Shipped in 6 PRs with 100+ new tests.',
      'Panel UI with 4 response states, progressive loading, rejection handling and undo — marketers accept or reject edits without touching structure.',
      'Same period: release gatekeeper across sprints, 40+ code reviews, 2 production hotfixes.',
    ],
    stack: ['Vertex AI', 'Gemini', 'tRPC', 'TypeScript', 'React'],
    visual: {
      kind: 'flow',
      caption: 'Request flow (simplified, no client data)',
      steps: [
        { title: 'Marketer prompt', note: 'Plain-language change request in the builder' },
        { title: 'tRPC endpoint', note: 'Page context + privacy-reviewed payload' },
        { title: 'Gemini on Vertex AI', note: '4 tool definitions → structured operations' },
        { title: 'Patch engine', note: 'Validates and applies operations safely' },
        { title: 'Live page', note: 'Accept, reject or undo in the panel' },
      ],
    },
  },
  {
    slug: 'ai-question-reviewer',
    title: 'AI question reviewer for exam content',
    client: 'Quill Learn',
    cc: 'SG',
    period: '2025 – 2026',
    role: 'Senior Fullstack · end-to-end owner',
    summary:
      'GPT-5 and GLM review exam questions against 8 pedagogical indicators with SSE streaming — 40-question analysis cut from ~4 minutes to ~1.7.',
    metrics: [
      { value: '4 → 1.7 min', label: 'per 40-question analysis' },
      { value: '~30s → 0', label: 'question import time' },
      { value: '8', label: 'pedagogical quality indicators' },
    ],
    context:
      'Quill Learn is an international education provider. Examiners review large banks of questions before they reach learners.',
    problem:
      'Manual review was slow and inconsistent, the existing PDF parser failed on real exam papers, and analysis of a full paper took minutes — too slow for examiners to work interactively.',
    decisions: [
      {
        title: 'Structured review, not a chat box',
        body: 'Each question is scored by GPT-5 or GLM against 8 pedagogical quality indicators, with findings triaged for the examiner.',
      },
      {
        title: 'Stream results as they arrive',
        body: 'SSE streaming plus a concurrency pool means examiners see the first findings in seconds instead of waiting for the whole batch.',
      },
      {
        title: 'Fix the input first',
        body: 'Replaced the failing PDF parser with Azure Document Intelligence and added a parse cache and batch inserts.',
      },
      {
        title: 'Ship with the user in the loop',
        body: 'Ran the pilot feedback roadmap directly with the awarding body’s examiner lead through to sign-off.',
      },
    ],
    results: [
      '40-question analysis from ~4 min to ~1.7 min; import from ~30 s to near-instant.',
      'Bulk analysis and examiner findings triage in production.',
      'Same engagement: consolidated scattered role checks into permission-based access control on Better Auth.',
    ],
    stack: ['SvelteKit', 'ElysiaJS', 'Bun', 'GPT-5', 'GLM', 'Azure Document Intelligence', 'PostgreSQL'],
    visual: {
      kind: 'flow',
      caption: 'Review pipeline (simplified)',
      steps: [
        { title: 'Exam PDF', note: 'Uploaded by the examiner' },
        { title: 'Azure Document Intelligence', note: 'Parsing with a parse cache' },
        { title: 'Question bank', note: 'Batch inserts into PostgreSQL' },
        { title: 'GPT-5 / GLM', note: '8 indicators, concurrency pool' },
        { title: 'SSE to examiner', note: 'Findings stream in and get triaged' },
      ],
    },
  },
  {
    slug: 'scorm-runtime-service',
    title: 'A standalone SCORM 1.2 / 2004 runtime',
    client: 'Quill Learn',
    cc: 'SG',
    period: '2026',
    role: 'Senior Fullstack · architect',
    summary:
      'A spec-complete SCORM runtime with per-launch origin isolation and an ADL conformance gate in CI, so broken third-party content can’t take the platform down.',
    metrics: [
      { value: '1.2 + 2004', label: 'SCORM versions, spec-complete' },
      { value: 'ADL', label: 'conformance gate in CI' },
      { value: 'Live', label: 'learner presence via Redis + SSE' },
    ],
    context:
      'Courses on the platform include third-party SCORM packages: content the team does not control, running inside the learning experience.',
    problem:
      'Running SCORM content inside the main app meant a misbehaving package could break sessions or leak across launches, and progress commits were easy to lose silently.',
    decisions: [
      {
        title: 'Separate service, separate origin',
        body: 'The runtime is its own service, and every launch gets its own subdomain origin, isolating third-party content from the platform and from other launches.',
      },
      {
        title: 'Spec-complete adapters',
        body: 'Full SCORM 1.2 and 2004 API adapters with suspend/resume sequencing state, rather than the subset most packages happen to use.',
      },
      {
        title: 'Conformance as a merge gate',
        body: 'An ADL conformance suite runs in CI, so regressions are caught before release.',
      },
    ],
    results: [
      'Third-party content failures no longer affect the main platform.',
      'Root-caused a silent method rename that dropped an entire session’s commits, and missing wildcard DNS behind per-launch subdomains.',
      'Real-time learner presence and mastery monitor on Redis + SSE for non-technical staff.',
    ],
    stack: ['TypeScript', 'Redis', 'SSE', 'Docker', 'GitHub Actions'],
    visual: {
      kind: 'flow',
      caption: 'Launch isolation (simplified)',
      steps: [
        { title: 'Learner opens course', note: 'On the main platform' },
        { title: 'Per-launch origin', note: 'Unique subdomain per launch' },
        { title: 'SCORM runtime', note: '1.2 / 2004 adapters, suspend/resume' },
        { title: 'Commit store', note: 'Progress persisted per session' },
        { title: 'Presence monitor', note: 'Redis + SSE for staff dashboards' },
      ],
    },
  },
  {
    slug: 'rag-document-repository',
    title: 'RAG document repository for an industrial enterprise',
    client: 'Fortech Indotama × Krakatau Jasa Industri',
    cc: 'ID',
    period: '2025 – 2026',
    role: 'Tech Lead',
    summary:
      'Six tools merged into one platform on microservices, then a from-scratch RAG pipeline with IAM-filtered retrieval on Qdrant — 75% faster deploys.',
    metrics: [
      { value: '75%', label: 'faster deployments, weekly → daily' },
      { value: '40%', label: 'faster PostgreSQL queries' },
      { value: '99.9%', label: 'MinIO storage uptime' },
    ],
    context:
      'Fortech Indotama builds enterprise software and AI for industrial clients. The SuperApp was later extended for PT Krakatau Jasa Industri as a production document repository.',
    problem:
      'Six separate tools on a Flask monolith shipped weekly at best, and employees could not search thousands of documents — many of them scanned PDFs — while respecting who is allowed to see what.',
    decisions: [
      {
        title: 'Break up the monolith',
        body: 'Migrated Flask to Next.js, Express and FastAPI microservices with CI/CD on GitHub Actions.',
      },
      {
        title: 'RAG built from scratch',
        body: 'Semantic chunking, Gemini embeddings and retrieval on Qdrant, with an OCR fallback for scanned PDFs.',
      },
      {
        title: 'Permissions inside retrieval',
        body: 'IAM filters are applied at query time, so the model only ever sees chunks the user may read; every access is audit-logged.',
      },
      {
        title: 'Clean deletes across stores',
        body: 'Cascade deletion across MySQL, Qdrant and MinIO so removed documents disappear everywhere.',
      },
    ],
    results: [
      'Deployment time cut 75%; releases moved from weekly to daily.',
      'Average PostgreSQL query time cut 40%; MinIO storage at 99.9% uptime.',
      '14 production features shipped in one 30-hour sprint, including an observability pipeline.',
    ],
    stack: ['Next.js', 'Express', 'FastAPI', 'Qdrant', 'Gemini', 'PostgreSQL', 'MinIO', 'GitHub Actions'],
    visual: {
      kind: 'flow',
      caption: 'Retrieval path (simplified)',
      steps: [
        { title: 'Document upload', note: 'PDF, scans, office files → MinIO' },
        { title: 'Chunk + OCR fallback', note: 'Semantic chunking, OCR for scans' },
        { title: 'Gemini embeddings', note: 'Vectors stored in Qdrant' },
        { title: 'IAM-filtered retrieval', note: 'Only chunks the user may read' },
        { title: 'Answer + audit log', note: 'Cited answer, access recorded' },
      ],
    },
  },
  {
    slug: 'solvara-reserva',
    title: 'Solvara Reserva: booking and deposits for clinics and rentals',
    client: 'Solvara (own product)',
    cc: 'ID',
    period: '2026',
    role: 'Founder · design, build, operate',
    summary:
      'A multi-tenant no-code booking SaaS with live slots, online deposits into each tenant’s own Mayar account, a customer portal, REST API and MCP server.',
    metrics: [
      { value: '0', label: 'double bookings, enforced by Postgres' },
      { value: '14-day', label: 'self-serve trial with abuse scoring' },
      { value: 'API + MCP', label: 'for tenants and AI agents' },
    ],
    context:
      'Beauty clinics and vehicle rentals in Indonesia take bookings through long forms, then confirm deposits one WhatsApp chat at a time and reconcile everything in spreadsheets.',
    problem:
      'Replace that routine with one link: a customisable booking funnel, deposits through a payment gateway, and a dashboard — without any tenant needing a developer.',
    decisions: [
      {
        title: 'Let the database refuse double bookings',
        body: 'Reservations are written through one code path with a Postgres exclusion constraint per seat, so concurrent requests can’t book the same slot.',
      },
      {
        title: 'Money goes straight to the tenant',
        body: 'Deposits are paid into each tenant’s own Mayar account. Their API key is sealed per tenant, and booking status only changes after the payment is verified server-side.',
      },
      {
        title: 'One registry, many interfaces',
        body: 'A single endpoint registry generates the REST API, OpenAPI docs, llms.txt and an MCP server, all calling the same service functions as the dashboard.',
      },
      {
        title: 'Self-serve without abuse',
        body: 'Email-verified signup with a 14-day trial; repeated trials are detected from HMAC-hashed signals without blocking legitimate users.',
      },
    ],
    results: [
      'Live at reserva.solvara-tech.com with clinic and rental verticals.',
      'Customer portal for rescheduling and cancellation requests; POS invoicing for rental tenants.',
      'Signed outgoing webhooks with SSRF protection and per-key IP allow-lists.',
    ],
    stack: ['Next.js 16', 'tRPC', 'Prisma', 'PostgreSQL', 'Mayar', 'S3 (Garage)', 'MCP'],
    visual: {
      kind: 'shot',
      src: '/img/reserva.webp',
      url: 'reserva.solvara-tech.com',
      alt: 'Solvara Reserva schedule view with practitioners, appointments and daily booking stats (demo data)',
    },
    live: 'https://reserva.solvara-tech.com',
  },
  {
    slug: 'solvara-platform-ops',
    title: 'Running 14 apps on one server: Solvara platform & ops',
    client: 'Solvara (own platform)',
    cc: 'ID',
    period: '2026',
    role: 'Founder · infrastructure & tooling',
    summary:
      'One 4 vCPU / 8 GB VPS runs every Solvara product. A custom ops CLI, encrypted env, observability and a Lead Finder keep it fast and safe.',
    metrics: [
      { value: '~6 s', label: 'CI deploy jobs, down from 8–10 min' },
      { value: '1', label: 'command to roll back any app' },
      { value: '514', label: 'regencies crawled by Lead Finder' },
    ],
    context:
      'Solvara runs five live SaaS products plus a company site, an AI service and internal tools — around 14 apps — on a single VPS behind one Caddy reverse proxy.',
    problem:
      'Deploys burned GitHub Actions minutes waiting on server builds, .env files lived in plaintext on the server, and there was no single view of errors, uptime and load across apps.',
    decisions: [
      {
        title: 'An audited ops CLI',
        body: 'solvara-ops gives one command for status, logs, deploy and rollback. CI uses per-app restricted keys that can only deploy their own app, and every command is audit-logged.',
      },
      {
        title: 'Encrypted environment files',
        body: 'Every app’s .env is encrypted with SOPS + age and applied from source control, with drift checks before each deploy.',
      },
      {
        title: 'Observability you own',
        body: 'Self-hosted GlitchTip, Umami and Uptime Kuma feed an executive dashboard alongside server load.',
      },
      {
        title: 'Lead Finder for sales',
        body: 'A RabbitMQ-backed crawler covers 514 regencies, streams progress over SSE and sends picked leads straight into the sales CRM.',
      },
    ],
    results: [
      'CI deploy jobs went from 8–10 minutes of waiting to about 6 seconds; builds run on the server.',
      'Errors, uptime, analytics and server load visible in one place.',
      'Cloudflare Turnstile on logins across products after a security hardening pass.',
    ],
    stack: ['Docker', 'Caddy', 'Bash', 'SOPS + age', 'GlitchTip', 'Umami', 'RabbitMQ', 'FastAPI'],
    visual: {
      kind: 'shot',
      src: '/img/solvara.webp',
      url: 'solvara-tech.com',
      alt: 'Solvara Tech company site showing its live products',
    },
    live: 'https://solvara-tech.com',
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
