import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-[36px] font-extrabold tracking-tight text-title">This page doesn’t exist</h1>
      <p className="mt-3 text-[16px] text-muted">The link may be old, or the page has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-accent-strong px-6 py-3 font-bold text-white">Back to home</Link>
        <Link href="/#work" className="rounded-full border border-line px-6 py-3 font-bold text-title">See case studies</Link>
      </div>
    </section>
  );
}
