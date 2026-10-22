'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { profile } from '@/content/profile';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#products', label: 'Products' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={`no-print sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled || open ? 'border-line bg-bg/90 backdrop-blur' : 'border-transparent bg-bg'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center gap-6 px-5 sm:px-8" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 text-[17px] font-extrabold tracking-tight text-title" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- logo SVG statis */}
          <img src="/logo/al-tile.svg" alt="" width={36} height={36} className="h-9 w-9 transition-transform duration-300 hover:-rotate-6" />
          {profile.shortName}
        </Link>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-lg px-3 py-2 text-[14.5px] font-semibold text-muted transition-colors duration-150 hover:text-title">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <a
            href={profile.cvPath}
            download
            className="hidden items-center gap-2 rounded-full bg-accent-strong px-4 py-2.5 text-[14px] font-bold text-white transition-transform duration-150 hover:-translate-y-0.5 sm:inline-flex"
          >
            <DownloadIcon /> Download CV
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-title md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line px-5 pb-5 md:hidden">
          <ul className="grid gap-1 pt-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-[16px] font-semibold text-ink hover:bg-surface-alt">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.cvPath} download className="mt-3 flex items-center justify-center gap-2 rounded-full bg-accent-strong px-4 py-3 font-bold text-white">
            <DownloadIcon /> Download CV
          </a>
        </div>
      ) : null}
    </header>
  );
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}
