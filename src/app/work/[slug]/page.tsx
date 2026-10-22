import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudyBySlug } from '@/content/work';
import { profile } from '@/content/profile';
import { ArrowIcon, BrowserFrame, Chips, ExternalIcon, JsonLd } from '@/components/ui';
import { FlowDiagram } from '@/components/FlowDiagram';
import { MorphTitle, PageTransition } from '@/components/PageTransition';
import { caseStudyJsonLd, jsonLdString, workTitle } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseStudyBySlug((await params).slug);
  if (!c) return {};
  const path = `/work/${c.slug}`;
  const image = { url: `/og/${c.slug}.png`, width: 1200, height: 630, alt: c.title };
  return {
    title: workTitle(c),
    description: c.summary,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: c.title, description: c.summary, images: [image], authors: [profile.name] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.summary, images: [image.url] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseStudyBySlug((await params).slug);
  if (!c) notFound();
  const idx = caseStudies.indexOf(c);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <PageTransition>
    <article className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <JsonLd data={jsonLdString(caseStudyJsonLd(c))} />

      <nav aria-label="Breadcrumb" className="pt-8 text-[14px] font-semibold text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" transitionTypes={['nav-back']} className="hover:text-title">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/#work" transitionTypes={['nav-back']} className="hover:text-title">Work</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-title">{c.client}</li>
        </ol>
      </nav>

      <header className="hero-grad relative mt-5 overflow-hidden rounded-[28px] px-6 py-10 text-white sm:px-12 sm:py-12">
        <div aria-hidden className="topline absolute inset-x-0 top-0 h-1.5" />
        <p className="flex flex-wrap items-center gap-2 text-[13.5px] font-bold text-[#c9d6f5]">
          <span className="rounded-full bg-[#EE5533] px-2 py-0.5 text-[10.5px] font-extrabold tracking-wider text-white">{c.cc}</span>
          {c.client} · {c.period}
        </p>
        <MorphTitle slug={c.slug}>
          <h1 className="mt-4 max-w-[24ch] text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-[46px]">{c.title}</h1>
        </MorphTitle>
        <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-[#dce4f7]">{c.summary}</p>
        <p className="mt-4 text-[14px] font-semibold text-[#F4714F]">{c.role}</p>
        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          {c.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl bg-white px-5 py-4">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-[26px] font-extrabold tracking-tight text-navy-700">{m.value}</span>
                <span className="text-[13px] font-semibold text-[#4b5361]">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-12">
          <section aria-labelledby="context">
            <p className="eyebrow">Context</p>
            <h2 id="context" className="mt-2 text-[26px] font-extrabold tracking-tight text-title">The situation</h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-muted">{c.context}</p>
            <p className="mt-4 text-[17px] leading-[1.75] text-muted">
              <b className="text-ink">The problem.</b> {c.problem}
            </p>
          </section>

          <section aria-labelledby="decisions">
            <p className="eyebrow">Approach</p>
            <h2 id="decisions" className="mt-2 text-[26px] font-extrabold tracking-tight text-title">Key decisions</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.decisions.map((d, i) => (
                <li key={d.title} className="card p-6">
                  <span className="text-[13px] font-extrabold text-accent">0{i + 1}</span>
                  <h3 className="mt-1.5 text-[17.5px] font-extrabold leading-snug text-title">{d.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="visual">
            <h2 id="visual" className="sr-only">
              {c.visual.kind === 'flow' ? 'How it works' : 'Screenshot'}
            </h2>
            {c.visual.kind === 'flow' ? (
              <FlowDiagram steps={c.visual.steps} caption={c.visual.caption} />
            ) : (
              <BrowserFrame src={c.visual.src} url={c.visual.url} alt={c.visual.alt} />
            )}
          </section>

          <section aria-labelledby="results">
            <p className="eyebrow">Outcome</p>
            <h2 id="results" className="mt-2 text-[26px] font-extrabold tracking-tight text-title">Results</h2>
            <ul className="check mt-5 text-[16.5px]">
              {c.results.map((r) => (
                <li key={r.slice(0, 24)}>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card space-y-5 p-6">
            <div>
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-muted">Role</h2>
              <p className="mt-1 text-[15px] font-semibold text-ink">{c.role}</p>
            </div>
            <div>
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-muted">Stack</h2>
              <div className="mt-2.5">
                <Chips items={c.stack} small />
              </div>
            </div>
            {c.live ? (
              <a href={c.live} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-full bg-accent-strong px-4 py-3 text-[14.5px] font-bold text-white">
                Visit live product <ExternalIcon />
              </a>
            ) : null}
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`About: ${c.title}`)}`} className="flex items-center justify-center rounded-full border border-line px-4 py-3 text-[14.5px] font-bold text-title hover:bg-surface-alt">
              Ask me about this
            </a>
          </div>
        </aside>
      </div>

      <Link href={`/work/${next.slug}`} transitionTypes={['nav-forward']} className="card group mt-16 flex items-center gap-5 p-6 sm:p-8">
        <div className="flex-1">
          <p className="eyebrow">Next case study</p>
          <p className="mt-1.5 text-[20px] font-extrabold tracking-tight text-title sm:text-[24px]">{next.title}</p>
          <p className="mt-1 text-[14px] font-semibold text-muted">{next.client}</p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-strong text-white transition-transform duration-200 group-hover:translate-x-1">
          <ArrowIcon className="h-5 w-5" />
        </span>
      </Link>
    </article>
    </PageTransition>
  );
}
