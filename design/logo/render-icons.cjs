// Render ikon web berwarna dari SVG kit (Chromium, transparan) — export_variants hanya untuk logo satu warna.
const { chromium } = require('playwright');
const fs = require('fs');
const K = 'design/logo/kit/';
const jobs = [
  ['al-tile.svg', [16, 32, 48, 192, 512], 'icon'],
  ['al-maskable.svg', [512], 'maskable'],
  ['al-tile.svg', [180], 'apple-touch-icon'],
];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [src, sizes, name] of jobs) {
    const svg = fs.readFileSync(K + src, 'utf8');
    for (const s of sizes) {
      await p.setViewportSize({ width: s, height: s });
      await p.setContent(`<body style="margin:0;background:transparent">${svg.replace('<svg', `<svg width="${s}" height="${s}"`)}</body>`);
      const out = K + (name === 'icon' ? `icon-${s}.png` : name === 'maskable' ? `maskable-${s}.png` : `${name}.png`);
      await p.screenshot({ path: out, omitBackground: true, clip: { x: 0, y: 0, width: s, height: s } });
      console.log('ok', out);
    }
  }
  await b.close();
  // favicon.ico = PNG 16/32/48 hasil Chromium (Quick Look merender logo jadi titik kecil di kanvas putih).
  const pngs = [16, 32, 48].map((n) => fs.readFileSync(`${K}icon-${n}.png`));
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let off = head.length;
  pngs.forEach((buf, i) => {
    const n = [16, 32, 48][i], e = 6 + 16 * i;
    head.writeUInt8(n, e); head.writeUInt8(n, e + 1); head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(buf.length, e + 8); head.writeUInt32LE(off, e + 12); off += buf.length;
  });
  fs.writeFileSync(K + 'favicon.ico', Buffer.concat([head, ...pngs]));
  console.log('ok', K + 'favicon.ico');
})();
