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
})();
