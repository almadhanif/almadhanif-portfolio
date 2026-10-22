import type { FlowStep } from '@/content/work';

/** Diagram alur bernomor (HTML, bukan gambar) — terbaca mesin pencari & pembaca layar. Vertikal di HP, horizontal di desktop. */
export function FlowDiagram({ steps, caption }: { steps: FlowStep[]; caption: string }) {
  return (
    <figure className="card p-6 sm:p-8">
      <ol className="grid gap-3 lg:grid-cols-5 lg:gap-0">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 lg:flex-col lg:gap-3 lg:px-3">
            <div className="flex items-center lg:w-full">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[16px] font-extrabold text-white ${
                  i === steps.length - 1 ? 'bg-accent-strong' : 'bg-navy-700'
                }`}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 ? <span aria-hidden className="ml-3 hidden h-0.5 flex-1 bg-line lg:block" /> : null}
            </div>
            <div>
              <p className="text-[15px] font-extrabold text-title">{s.title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 text-[12.5px] font-semibold text-muted">{caption}</figcaption>
    </figure>
  );
}
