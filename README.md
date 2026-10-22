# almadhanif-portfolio

Personal portfolio of Firman Almadhani Kurniawan — https://almadhanif.solvara-tech.com

Next.js 16 (App Router) static export, Tailwind v4, Plus Jakarta Sans. Visual identity follows the Solvara deck
(navy `#1E3A8A` + orange `#EE5533`). Served by a small Caddy container on the Solvara VPS.

## Develop

    pnpm install
    pnpm dev            # http://localhost:3030
    pnpm lint && pnpm typecheck && pnpm test

## Content

All text lives in `src/content/*` (profile, experience, case studies, products, skills, awards). Every claim must
come from the CV, the GitHub profile README, or Solvara code. After editing content, bump `CONTENT_LAST_MODIFIED`
in `src/lib/seo.ts` (sitemap `lastmod`).

| Task | Command |
| --- | --- |
| Re-crop screenshots (`assets/raw` → `public/img`) | `pnpm images` |
| Re-render OG images (`public/og`) | `pnpm og` |
| Refresh skill icons | `pnpm icons` |
| Visual QA screenshots (`qa/`) | `pnpm capture` |

The CV PDF in `public/` is v4 with the phone number redacted (removed from the text layer, not covered).

## SEO

Same pattern as solvara-reserva: tested `src/lib/seo.ts` (title ≤ 70, description ≤ 160), `robots.txt`,
`sitemap.xml`, `manifest.webmanifest`, `llms.txt`, JSON-LD (`Person`, `ProfilePage`, `Article`, `BreadcrumbList`),
canonical URLs and per-page OG images.

## Deploy

`docker compose up -d --build` on the VPS (`/opt/apps/solvara/almadhanif`); the main Caddy in solvara-proxy routes
`almadhanif.solvara-tech.com` to `almadhanif-web:8080`.
