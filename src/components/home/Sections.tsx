import Link from 'next/link';
import { profile } from '@/content/profile';
import { caseStudies } from '@/content/work';
import { products } from '@/content/products';
import { experience } from '@/content/experience';
import { awards, certifications, otherWork, skills } from '@/content/more';
import { ArrowIcon, BrowserFrame, Chips, ExternalIcon, SectionHeader, SkillIcon } from '@/components/ui';
import { DownloadIcon } from '@/components/Nav';
import { MorphTitle } from '@/components/PageTransition';

const wrap = 'mx-auto max-w-6xl px-5 sm:px-8';

export function About() {
  return (
    <section aria-labelledby="about" className={`${wrap} pt-24`}>
      <SectionHeader num="01" a="About" b="me" id="about" />
      <div className="reveal grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4 text-[17px] leading-[1.75] text-muted">
          {profile.summary.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <aside className="card p-6">
          <h3 className="text-[15px] font-extrabold text-title">At a glance</h3>
          <ul className="check mt-4 text-[15px]">
            <li><span><b>Strengths</b> RAG & LLM integration, microservices, performance under real load</span></li>
            <li><span><b>Ways of working</b> spike → privacy review → build → post-deploy validation</span></li>
            <li><span><b>Time zones</b> works across US and European hours from {profile.timezone}</span></li>
            <li><span><b>Education</b> {profile.education.degree}, {profile.education.school} ({profile.education.detail})</span></li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section aria-labelledby="work" className={`${wrap} pt-24`}>
      <SectionHeader num="02" a="Selected" b="work" id="work" />
      <ul className="grid gap-5 md:grid-cols-2">
        {caseStudies.map((c) => (
          <li key={c.slug} className="reveal">
            <Link
              href={`/work/${c.slug}`}
              transitionTypes={['nav-forward']}
              className="card group flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7"
            >
              <div className="flex items-center gap-2 text-[13px] font-bold text-muted">
                <span className="cc">{c.cc}</span>
                {c.client}
                <span className="ml-auto font-semibold">{c.period}</span>
              </div>
              <MorphTitle slug={c.slug}>
                <h3 className="mt-3 text-[21px] font-extrabold leading-snug tracking-tight text-title">{c.title}</h3>
              </MorphTitle>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{c.summary}</p>
              <dl className="mt-5 grid grid-cols-2 gap-2.5">
                {c.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="rounded-2xl border-l-[3px] border-accent-strong bg-surface-alt px-4 py-3">
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block text-[20px] font-extrabold tracking-tight text-accent">{m.value}</span>
                      <span className="text-[12.5px] font-semibold text-muted">{m.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-bold text-accent">
                Read case study <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="reveal mt-14 text-[18px] font-extrabold text-title">More client work</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {otherWork.map((w) => (
          <li key={w.title} className="reveal card flex flex-col p-5">
            <div className="flex items-center gap-2 text-[12.5px] font-bold text-muted">
              <span className="cc">{w.cc}</span>
              {w.client}
            </div>
            <h4 className="mt-2.5 text-[16.5px] font-extrabold text-title">{w.title}</h4>
            <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted">{w.desc}</p>
            {'href' in w ? (
              <a href={w.href} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-bold text-accent">
                Live site <ExternalIcon />
              </a>
            ) : null}
            <div className="mt-4">
              <Chips items={w.stack} small />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Products() {
  return (
    <section aria-labelledby="products" className={`${wrap} pt-24`}>
      <SectionHeader num="03" a="Live" b="products" id="products" />
      <p className="reveal -mt-4 mb-10 max-w-[70ch] text-[16.5px] leading-relaxed text-muted">
        Five SaaS products I designed, built and operate at{' '}
        <a href={profile.solvara} className="font-bold text-title underline decoration-accent-strong decoration-2 underline-offset-4" target="_blank" rel="noopener">
          Solvara
        </a>
        , all running on one 4 vCPU / 8 GB server behind Caddy.
      </p>
      <ul className="space-y-6">
        {products.map((p, i) => (
          <li key={p.key} className="reveal card grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
            <div className={i % 2 ? 'lg:order-2' : ''}>
              <p className="eyebrow">{p.eyebrow}</p>
              <h3 className="mt-2 text-[28px] font-extrabold tracking-tight text-title">{p.name}</h3>
              <a href={p.href} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-bold text-accent">
                <i aria-hidden className="h-2 w-2 rounded-full bg-[#22c55e]" /> Live · {p.url} <ExternalIcon />
              </a>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{p.desc}</p>
              <ul className="check mt-5 text-[15px]">
                {p.points.map(([b, t]) => (
                  <li key={b}>
                    <span>
                      <b>{b}</b> {t}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Chips items={p.stack} />
                {p.caseStudy ? (
                  <Link href={`/work/${p.caseStudy}`} transitionTypes={['nav-forward']} className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-accent">
                    Case study <ArrowIcon />
                  </Link>
                ) : null}
              </div>
            </div>
            <a href={p.href} target="_blank" rel="noopener" aria-label={`Open ${p.name} (${p.url})`} className={i % 2 ? 'lg:order-1' : ''}>
              <BrowserFrame src={p.img} url={p.url} alt={`${p.name} screenshot`} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Experience() {
  return (
    <section aria-labelledby="experience" className={`${wrap} pt-24`}>
      <SectionHeader num="04" a="Experience" b="timeline" id="experience" />
      <ol className="reveal card px-5 py-7 sm:px-9">
        {experience.map((e, i) => (
          <li key={e.org} className="grid grid-cols-[28px_1fr] gap-x-4 sm:grid-cols-[170px_28px_1fr]">
            <p className="hidden pt-0.5 text-[14px] font-bold text-muted sm:block">{e.period}</p>
            <div className="relative flex justify-center" aria-hidden>
              <span
                className={`z-10 mt-1 h-4 w-4 rounded-full border-[3px] ${
                  e.current ? 'border-accent-strong bg-accent-strong shadow-[0_0_0_5px_var(--tint)]' : 'border-title bg-surface'
                }`}
              />
              {i < experience.length - 1 ? <span className="absolute bottom-0 top-6 w-0.5 bg-line" /> : null}
            </div>
            <div className="pb-8">
              <h3 className="flex flex-wrap items-center gap-2 text-[19px] font-extrabold text-title">
                {e.org} <span className="cc">{e.cc}</span>
                {e.current ? <span className="rounded-full bg-accent-strong px-2.5 py-0.5 text-[11px] font-extrabold tracking-wider text-white">NOW</span> : null}
              </h3>
              <p className="mt-1 text-[15px] font-semibold text-ink">
                {e.role} <span className="font-medium text-muted">· {e.where}</span>
              </p>
              <p className="mt-0.5 text-[13.5px] font-semibold text-muted sm:hidden">{e.period}</p>
              <p className="mt-1 text-[14px] italic text-muted">{e.context}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted marker:text-accent-strong">
                {e.highlights.map((h) => (
                  <li key={h.slice(0, 24)}>{h}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section aria-labelledby="skills" className={`${wrap} pt-24`}>
      <SectionHeader num="05" a="Tech" b="stack" id="skills" />
      <div className="reveal card divide-y divide-dashed divide-line px-5 py-2 sm:px-8">
        {skills.map((g) => (
          <div key={g.group} className="grid gap-3 py-5 sm:grid-cols-[170px_1fr] sm:gap-5">
            <h3 className="flex items-center gap-2.5 pt-1.5 text-[15px] font-extrabold text-title">
              <i aria-hidden className="h-2 w-2 rounded-[2px] bg-accent-strong" />
              {g.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map(([name, slug]) => (
                <li key={name} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-alt py-1.5 pl-2.5 pr-3.5 text-[14px] font-semibold text-ink">
                  <SkillIcon slug={slug} name={name} />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Awards() {
  return (
    <section aria-labelledby="awards" className={`${wrap} pt-24`}>
      <SectionHeader num="06" a="Awards &" b="certifications" id="awards" />
      <div className="reveal rounded-[28px] bg-[#EE5533] p-5 sm:p-8">
        <p className="mb-4 flex items-center gap-3 text-[12.5px] font-extrabold tracking-[0.14em] text-[#ffe3db]">
          AWARDS <span aria-hidden className="h-0.5 flex-1 bg-white/35" />
        </p>
        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a) => (
            <li key={a.name + a.place} className="rounded-2xl bg-white p-5 text-[#14161a]">
              <p className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-[#D94526]">{a.scope}</p>
              <h3 className="mt-1.5 text-[17px] font-extrabold leading-snug text-[#1e3a8a]">{a.name}</h3>
              <span
                className={`mt-2.5 inline-block rounded-full px-3 py-1 text-[12.5px] font-bold ${
                  a.place === 'Silver Medal' ? 'bg-[#6b7280] text-white' : a.place === '1st Place' ? 'bg-[#f5a623] text-[#14161a]' : 'bg-[#1e3a8a] text-white'
                }`}
              >
                {a.place}
              </span>
              <p className="mt-2.5 text-[13.5px] leading-normal text-[#4b5361]">{a.note}</p>
            </li>
          ))}
        </ul>
        <p className="mb-4 mt-7 flex items-center gap-3 text-[12.5px] font-extrabold tracking-[0.14em] text-[#ffe3db]">
          CERTIFICATIONS & LANGUAGES <span aria-hidden className="h-0.5 flex-1 bg-white/35" />
        </p>
        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.name} className="flex items-center gap-4 rounded-2xl bg-white p-5">
              <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fdebe6]">
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="#EE5533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
                </svg>
              </span>
              <div>
                <h3 className="text-[15px] font-extrabold text-[#1e3a8a]">{c.name}</h3>
                <p className="text-[13.5px] font-semibold text-[#14161a]">{c.detail}</p>
                <p className="text-[12.5px] text-[#4b5361]">{c.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13.5px] font-semibold text-white">{profile.languages}</p>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section aria-labelledby="contact" className={`${wrap} pb-20 pt-24`}>
      <div className="reveal hero-grad relative overflow-hidden rounded-[28px] px-6 py-10 text-white sm:px-12 sm:py-12">
        <div aria-hidden className="topline absolute inset-x-0 top-0 h-1.5" />
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 id="contact" className="text-[32px] font-light leading-tight tracking-tight sm:text-[40px]">
              <b className="font-extrabold">Let’s build something</b>
              <br />
              <span className="font-extrabold text-[#F4714F]">reliable.</span>
            </h2>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-[#c9d6f5]">
              Open to remote roles and contracts as a senior fullstack, AI or tech-lead engineer. I usually reply within a day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#EE5533] px-6 py-3.5 text-[15px] font-bold text-white transition-transform duration-150 hover:-translate-y-0.5">
                Email me
              </a>
              <a href={profile.cvPath} download className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-navy-700 transition-transform duration-150 hover:-translate-y-0.5">
                <DownloadIcon /> Download CV
              </a>
            </div>
          </div>
          <ul className="grid gap-2.5 rounded-2xl bg-white p-5">
            {[
              ['@', profile.email, `mailto:${profile.email}`],
              ['in', 'firman-almadhani-kurniawan', profile.linkedin],
              ['gh', 'github.com/almadhanif', profile.github],
            ].map(([k, label, href]) => (
              <li key={k}>
                <a href={href} target={k === '@' ? undefined : '_blank'} rel={k === '@' ? undefined : 'me noopener'} className="flex min-h-11 items-center gap-3 rounded-xl px-2 text-[15px] font-bold text-[#1e3a8a] hover:bg-[#f2f4f7]">
                  <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#fdebe6] text-[13px] font-extrabold text-[#D94526]">
                    {k}
                  </span>
                  <span className="truncate">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
