import { ViewTransition } from 'react';

/** Slide berarah saat navigasi bertipe nav-forward / nav-back (lihat globals.css). Dipasang di tiap page.tsx, bukan layout. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const map = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' };
  return (
    <ViewTransition enter={map} exit={map} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/** Judul yang "berubah bentuk" dari kartu studi kasus ke judul halaman studi kasus. */
export function MorphTitle({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={`case-title-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
