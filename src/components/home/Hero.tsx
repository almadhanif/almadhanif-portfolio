import { profile } from '@/content/profile';
import { DownloadIcon } from '@/components/Nav';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 sm:pt-10">
      <div className="hero-grad relative overflow-hidden rounded-[28px] px-6 py-10 text-white sm:px-12 sm:py-14">
        <div aria-hidden className="topline absolute inset-x-0 top-0 h-1.5" />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-bold text-[#D94526]">
              <i aria-hidden className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_0_4px_rgba(34,197,94,.2)]" />
              {profile.availability} · {profile.timezone}
            </span>
            <h1 id="hero-title" className="mt-6 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[54px]">
              {profile.name}
            </h1>
            <p className="mt-3 text-[20px] font-light text-[#dce4f7] sm:text-[25px]">
              <b className="font-extrabold text-white">{profile.title}</b> <span className="font-bold text-[#F4714F]">· {profile.titleAccent}</span>
            </p>
            <p className="mt-5 max-w-[60ch] text-[16.5px] leading-relaxed text-[#c9d6f5]">{profile.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Current roles">
              {profile.roles.map((r) => (
                <li key={r.label} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/35 py-1.5 pl-1.5 pr-3.5 text-[13.5px] font-semibold">
                  <span className="rounded-full bg-[#EE5533] px-2 py-0.5 text-[10.5px] font-extrabold tracking-wider">{r.cc}</span>
                  {r.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.cvPath} download className="inline-flex items-center gap-2 rounded-full bg-[#EE5533] px-6 py-3.5 text-[15px] font-bold text-white transition-transform duration-150 hover:-translate-y-0.5">
                <DownloadIcon /> Download CV
              </a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-navy-700 transition-transform duration-150 hover:-translate-y-0.5">
                Get in touch
              </a>
              <a href="#work" className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/40 px-6 py-3.5 text-[15px] font-bold text-white transition-colors duration-150 hover:bg-white/10">
                See my work
              </a>
            </div>
          </div>
          <div className="order-first mx-auto w-full max-w-[180px] sm:max-w-[240px] lg:order-none lg:max-w-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={720}
              height={720}
              fetchPriority="high"
              className="aspect-square w-full rounded-[26px] border-[5px] border-white object-cover shadow-[0_24px_50px_-20px_rgba(0,0,0,.55)]"
            />
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white px-5 py-4">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-[28px] font-extrabold tracking-tight text-navy-700">{s.value}</span>
                <span className="text-[13px] font-semibold text-[#4b5361]">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ProofStrip />
    </section>
  );
}

const SHIPPED_FOR = ['Openloop Health', 'Quill Learn', 'Fortech Indotama', 'Krakatau Jasa Industri', 'Pelindo (via KMPlus)', 'Hutama Karya', 'Naturindo'];

function ProofStrip() {
  return (
    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted">Shipped for</span>
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {SHIPPED_FOR.map((c) => (
          <li key={c} className="text-[15px] font-extrabold tracking-tight text-title/80">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
