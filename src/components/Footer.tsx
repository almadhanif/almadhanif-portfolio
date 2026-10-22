import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <ul className="flex gap-5 sm:ml-auto">
          <li><a className="font-semibold hover:text-title" href={`mailto:${profile.email}`}>Email</a></li>
          <li><a className="font-semibold hover:text-title" href={profile.linkedin} rel="me noopener" target="_blank">LinkedIn</a></li>
          <li><a className="font-semibold hover:text-title" href={profile.github} rel="me noopener" target="_blank">GitHub</a></li>
          <li><a className="font-semibold hover:text-title" href={profile.solvara} target="_blank" rel="noopener">Solvara</a></li>
        </ul>
      </div>
    </footer>
  );
}
