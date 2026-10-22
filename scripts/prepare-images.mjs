// Potong screenshot mentah (assets/raw, 2x) menjadi WebP siap tampil di public/img.
// Static export tidak punya optimasi gambar runtime, jadi ukuran ditentukan di sini.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });

// crop dalam piksel sumber; rasio 16:10 agar semua bingkai browser seragam
const shots = {
  reserva: { left: 540, top: 150, width: 2300 },
  jaga: { left: 520, top: 130, width: 1900 },
  sigap: { left: 600, top: 120, width: 2250 },
  nata: { left: 0, top: 0, width: 2880 },
  prakira: { left: 280, top: 0, width: 2400 },
  solvara: { left: 0, top: 0, width: 2880 },
};

for (const [name, c] of Object.entries(shots)) {
  const height = Math.round((c.width * 10) / 16);
  await sharp(`assets/raw/${name}.png`)
    .extract({ left: c.left, top: c.top, width: c.width, height })
    .resize(1600)
    .webp({ quality: 82 })
    .toFile(`${OUT}/${name}.webp`);
  console.log('ok', name);
}

await sharp('assets/raw/photo.jpeg')
  .extract({ left: 90, top: 40, width: 860, height: 860 })
  .resize(720)
  .webp({ quality: 85 })
  .toFile(`${OUT}/almadhani.webp`);
await sharp('assets/raw/solvara-icon.png').resize(96).png().toFile(`${OUT}/solvara-icon.png`);
console.log('ok photo, icon');
