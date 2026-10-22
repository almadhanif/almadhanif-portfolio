import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { DownloadIcon } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'CV',
  description: `CV of ${profile.name}, ${profile.title} and Tech Lead based in Jakarta. Download the PDF.`,
  alternates: { canonical: '/cv' },
};

export default function CvPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-20 pt-10 sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="eyebrow">Curriculum vitae</p>
          <h1 className="mt-2 text-[34px] font-extrabold tracking-tight text-title sm:text-[42px]">{profile.name}</h1>
          <p className="mt-2 text-[16px] text-muted">
            {profile.title} · {profile.titleAccent} · {profile.location}
          </p>
        </div>
        <a href={profile.cvPath} download className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-strong px-6 py-3.5 text-[15px] font-bold text-white">
          <DownloadIcon /> Download PDF
        </a>
      </div>
      <div className="card mt-8 overflow-hidden p-0">
        <object data={`${profile.cvPath}#view=FitH`} type="application/pdf" className="block h-[80vh] min-h-[560px] w-full" aria-label="CV PDF preview">
          <div className="p-8 text-[15px] text-muted">
            Your browser can’t show the PDF here.{' '}
            <a href={profile.cvPath} className="font-bold text-accent underline">
              Download the CV
            </a>{' '}
            instead.
          </div>
        </object>
      </div>
    </section>
  );
}
