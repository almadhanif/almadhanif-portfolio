import icons from '@/content/icons.generated.json';

/** Judul bagian bernomor bergaya deck: "01  About me ———— ALMADHANI | 01". */
export function SectionHeader({ num, a, b, id }: { num: string; a: string; b: string; id?: string }) {
  return (
    <div className="reveal mb-8 flex items-center gap-4 sm:mb-10">
      <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tint text-[17px] font-extrabold text-accent">
        {num}
      </span>
      <h2 id={id} className="text-[28px] font-extrabold tracking-tight sm:text-[34px]">
        <span className="text-title">{a}</span> <span className="text-accent">{b}</span>
      </h2>
      <span aria-hidden className="hidden h-0.5 flex-1 bg-gradient-to-r from-line to-transparent sm:block" />
      <span aria-hidden className="hidden text-[12px] font-bold tracking-[0.14em] text-muted lg:block">
        <b className="font-extrabold text-title">ALMADHANI</b> | {num}
      </span>
    </div>
  );
}

export function Chips({ items, small }: { items: readonly string[]; small?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {items.map((s) => (
        <li key={s} className={`chip ${small ? '!px-2.5 !py-1 !text-[12px]' : ''}`}>
          {s}
        </li>
      ))}
    </ul>
  );
}

export function BrowserFrame({ src, url, alt, priority }: { src: string; url: string; alt: string; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="flex h-9 items-center gap-1.5 border-b border-line bg-surface-alt px-3.5" aria-hidden>
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-surface px-3 py-0.5 text-[12px] font-semibold text-muted">{url}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: gambar sudah dioptimasi saat build */}
      <img src={src} alt={alt} width={1600} height={1000} loading={priority ? 'eager' : 'lazy'} decoding="async" className="block aspect-[16/10] h-auto w-full object-cover object-top" />
    </figure>
  );
}

export function SkillIcon({ slug, name }: { slug: string | null; name: string }) {
  const d = slug ? (icons as Record<string, string>)[slug] : undefined;
  if (!d)
    return (
      <span aria-hidden className="grid h-[18px] w-[18px] place-items-center rounded-[5px] bg-accent-strong text-[10px] font-extrabold text-white">
        {name[0]}
      </span>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current text-title" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function JsonLd({ data }: { data: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
