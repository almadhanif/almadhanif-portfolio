// Unduh path SVG simple-icons untuk daftar keahlian → src/content/icons.generated.json (di-commit).
// Beberapa merek dihapus dari rilis baru simple-icons, jadi coba beberapa versi.
import { writeFileSync } from 'node:fs';
import { skills } from '../src/content/more.ts';

const VERSIONS = ['15.6.0', '13.21.0', '9.21.0'];
const out = {};
for (const { items } of skills) {
  for (const [, slug] of items) {
    if (!slug || out[slug]) continue;
    for (const v of VERSIONS) {
      const r = await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@${v}/icons/${slug}.svg`);
      if (!r.ok) continue;
      const svg = await r.text();
      const d = svg.match(/ d="([^"]+)"/)?.[1];
      if (d) { out[slug] = d; break; }
    }
    if (!out[slug]) console.warn('tidak ditemukan:', slug);
  }
}
writeFileSync('src/content/icons.generated.json', JSON.stringify(out, null, 0) + '\n');
console.log('ikon:', Object.keys(out).length);
