import Link from 'next/link';
import { profile } from '@/content/profile';
import { DownloadIcon } from '@/components/Nav';
import { ArrowIcon } from '@/components/ui';
import { CountUp, HeroSpotlight } from './HeroFx';

const ROTATING = ['RAG pipelines', 'AI assistants', 'SaaS products', 'microservices'];
const SHIPPED_FOR = ['Openloop Health', 'Quill Learn', 'Fortech Indotama', 'Krakatau Jasa Industri', 'Pelindo (via KMPlus)', 'Hutama Karya', 'Naturindo'];

/** Urutan muncul (stagger) lewat variabel --d; animasi murni CSS, mati saat prefers-reduced-motion. */
const d = (i: number) => ({ '--d': `${i * 90}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-grad relative isolate overflow-hidden text-white">
      <HeroSpotlight />
      <div aria-hidden className="hero-bg">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
        {/* Goresan "AL" dari logo, sangat besar & samar, "digambar" sekali saat halaman dibuka */}
        <svg className="hero-mark" viewBox="0 0 256 256" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength={1} d="M40 204 Q70 128 98 64 Q103 52 109 62 Q118 128 122 200" />
          <path pathLength={1} className="hero-mark-bar" d="M34 142 Q72 136 112 134" />
          <path pathLength={1} d="M166 48 Q158 118 152 168 Q148 194 172 186 Q200 176 224 158" />
        </svg>
      </div>
      <div aria-hidden className="topline absolute inset-x-0 top-0 h-1" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[1fr_380px] lg:pb-24">
        <div>
          <span className="hero-in inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[13.5px] font-bold text-[#D94526]" style={d(0)}>
            <span className="live-dot" aria-hidden />
            {profile.availability} · {profile.timezone}
          </span>

          <h1 id="hero-title" className="hero-in mt-6 text-[40px] font-extrabold leading-[1.02] tracking-tight sm:text-[60px] lg:text-[66px]" style={d(1)}>
            {profile.name.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="name-accent">{profile.name.split(' ').slice(2).join(' ')}</span>
          </h1>

          <p className="hero-in mt-4 text-[20px] font-light text-[#dce4f7] sm:text-[25px]" style={d(2)}>
            <b className="font-extrabold text-white">{profile.title}</b> <span className="font-bold text-[#F4714F]">· {profile.titleAccent}</span>
          </p>

          <p className="hero-in mt-6 flex flex-wrap items-baseline gap-x-2.5 text-[22px] font-bold sm:text-[28px]" style={d(3)}>
            <span className="text-[#c9d6f5]">I build</span>
            <span className="sr-only">{ROTATING.join(', ')}</span>
            <span aria-hidden className="rotator">
              <span className="rotator-track">
                {[...ROTATING, ROTATING[0]].map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </span>
            </span>
          </p>

          <p className="hero-in mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-[#c9d6f5]" style={d(4)}>
            {profile.lead}
          </p>

          <div className="hero-in mt-8 flex flex-wrap gap-3" style={d(5)}>
            <a href={profile.cvPath} download className="btn-shine group inline-flex items-center gap-2 rounded-full bg-[#EE5533] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(238,85,51,.7)] transition-transform duration-200 hover:-translate-y-0.5">
              <DownloadIcon /> Download CV
            </a>
            <Link href="/#work" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-navy-700 transition-transform duration-200 hover:-translate-y-0.5">
              See my work <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/40 px-6 py-3.5 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white hover:bg-white/10">
              Get in touch
            </a>
          </div>

          <ul className="hero-in mt-8 flex flex-wrap gap-2.5" aria-label="Current roles" style={d(6)}>
            {profile.roles.map((r) => (
              <li key={r.label} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 bg-white/5 py-1.5 pl-1.5 pr-3.5 text-[13.5px] font-semibold backdrop-blur-sm">
                <span className="rounded-full bg-[#EE5533] px-2 py-0.5 text-[10.5px] font-extrabold tracking-wider">{r.cc}</span>
                {r.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in relative order-first mx-auto mt-4 w-full max-w-[210px] sm:max-w-[300px] lg:order-none lg:mt-0 lg:max-w-none" style={d(2)}>
          <div className="photo-ring">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={720}
              height={720}
              fetchPriority="high"
              className="relative z-10 aspect-square w-full rounded-[30px] object-cover"
            />
          </div>
          <div className="float-card float-a" aria-hidden>
            <span className="fc-icon">AI</span>
            <span>
              <b>315-call eval</b>
              <small>picked the production model</small>
            </span>
          </div>
          <div className="float-card float-b" aria-hidden>
            <span className="fc-icon fc-orange">5</span>
            <span>
              <b>Live SaaS products</b>
              <small>running on one VPS</small>
            </span>
          </div>
          <div className="float-chip" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
            </svg>
            APICTA 2024 Finalist
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-4 max-w-6xl px-5 pb-12 sm:px-8 lg:-mt-16">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.stats.map((s, i) => (
            <div key={s.label} className="hero-in stat-card" style={d(7 + i)}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value} className="block text-[30px] font-extrabold tracking-tight text-navy-700" />
                <span className="text-[13px] font-semibold text-[#4b5361]">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative border-t border-white/10 bg-black/10 py-5">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 sm:px-8">
          <span className="shrink-0 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#c9d6f5]">Shipped for</span>
          <div className="marquee" aria-label="Clients">
            <ul className="marquee-track">
              {[...SHIPPED_FOR, ...SHIPPED_FOR].map((c, i) => (
                <li key={i} aria-hidden={i >= SHIPPED_FOR.length} className="text-[16px] font-extrabold tracking-tight text-white/85">
                  {c}
                  <span aria-hidden className="mx-6 text-[#F4714F]">✦</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
