// Kartu nama final (opsi A): 90×55 mm potong, +3 mm bleed tiap sisi (kanvas 96×61 mm).
// Pakai: node design/business-card/build-cards.mjs
// Hasil di print/: PDF vektor RGB (+ versi tanda potong) dan PNG pratinjau. CMYK & cek QR: print-check.sh.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = join(HERE, '../logo/kit');
const OUT = join(HERE, 'print');
mkdirSync(OUT, { recursive: true });

const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const svgFile = (f, cls = '') => `<svg class="${cls}" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">${inner(readFileSync(join(KIT, f), 'utf8'))}</svg>`;
const qr = () => readFileSync(join(HERE, 'qr-navy.svg'), 'utf8').replace(/<svg[^>]*viewBox="([^"]+)"[^>]*>/, '<svg class="qr" viewBox="$1" xmlns="http://www.w3.org/2000/svg">');
// Goresan "AL" yang sama dengan hero situs (dekorasi besar)
const bigMark = (cls) => `<svg class="${cls}" viewBox="0 0 256 256" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path d="M40 204 Q70 128 98 64 Q103 52 109 62 Q118 128 122 200"/><path class="bar" d="M34 142 Q72 136 112 134"/>
  <path d="M166 48 Q158 118 152 168 Q148 194 172 186 Q200 176 224 158"/></svg>`;

const P = {
  name: 'Firman Almadhani Kurniawan',
  title: 'Senior Fullstack & AI Engineer',
  accent: 'Tech Lead · Founder, Solvara',
  email: 'almadhanif17@gmail.com',
  web: 'almadhanif.solvara-tech.com',
  linkedin: 'in/firman-almadhani-kurniawan',
  github: 'github.com/almadhanif',
  city: 'Jakarta, Indonesia · UTC+7',
};

// Ikon kontak: garis untuk email/web/lokasi, simple-icons untuk LinkedIn/GitHub
const SI = { ...JSON.parse(readFileSync(join(HERE, 'icon-linkedin.json'), 'utf8')), ...JSON.parse(readFileSync(join(HERE, 'icon-github.json'), 'utf8')) };
const line = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICON = {
  email: line('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/>'),
  web: line('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18"/>'),
  pin: line('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>'),
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${SI.linkedin}"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${SI.github}"/></svg>`,
};
const contacts = () => `<ul class="contacts">
  <li><i>${ICON.email}</i>${P.email}</li><li><i>${ICON.web}</i>${P.web}</li><li><i>${ICON.linkedin}</i>${P.linkedin}</li>
  <li><i>${ICON.github}</i>${P.github}</li><li><i>${ICON.pin}</i>${P.city}</li></ul>`;

const FRONT = `<div class="card front"><div class="top"></div>${bigMark('mark')}
  <div class="safe">${svgFile('al-symbol-reversed.svg', 'logo')}
    <div class="who"><h1>${P.name}</h1><p>${P.title}</p><p class="acc">${P.accent}</p></div></div></div>`;

const BACK = `<div class="card back"><div class="top"></div>
  <div class="safe"><div class="col">
    <h2>Let’s build something<br><span>reliable.</span></h2><span class="rule"></span>${contacts()}</div></div>
  <aside class="panel">${bigMark('mark')}
    <div class="qrcard">${qr()}<p>Scan for portfolio</p></div>
    <p class="hint">See case studies, live products &amp; CV <b>→</b></p></aside></div>`;

// Font ditanam langsung (OFL) — @import Google Fonts tidak andal saat membuat PDF (sempat jatuh ke Helvetica)
// Instans statis per ketebalan (dibuat dari font variabel dengan fonttools) agar tertanam sebagai TrueType, bukan Type 3.
const WEIGHTS = { 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold' };
const FONT_FACES = Object.entries(WEIGHTS)
  .map(([w, n]) => `@font-face{font-family:'Plus Jakarta Sans';src:url(data:font/ttf;base64,${readFileSync(join(HERE, `fonts/PlusJakartaSans-${n}.ttf`)).toString('base64')}) format('truetype');font-weight:${w};font-style:normal;font-display:block}`)
  .join('\n');
const CSS = `
${FONT_FACES}
*{margin:0;padding:0;box-sizing:border-box} html,body{background:transparent}
body{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;-webkit-print-color-adjust:exact;print-color-adjust:exact}
/* Kanvas = potong + bleed 3 mm; konten penting ≥ 3 mm di dalam garis potong (.safe = 6 mm dari tepi kanvas) */
.card{position:relative;width:96mm;height:61mm;overflow:hidden;break-after:page}
.card:last-child{break-after:auto}
.safe{position:absolute;inset:6mm}
/* Tanpa transparansi: warna samar sudah dicampur dengan latarnya. Gradien = gambar 600 dpi ber-dither (lihat GRADIENTS):
   konversi CMYK Ghostscript merasterisasi gradien CSS di ~90 ppi atau membuangnya. */
.top{position:absolute;left:0;right:0;top:0;height:4.2mm;background-size:100% 100%}
.front .top{background-image:url(__TOP_FRONT__)}.back .top{background-image:url(__TOP_BACK__)}
.mark .bar{stroke-width:17}

.front{background:#17307A url(__BG_FRONT__) 0 0/100% 100%;color:#fff}
.front .mark{position:absolute;right:-12mm;top:-4mm;width:70mm;stroke:#30488E;stroke-width:19;transform:rotate(-6deg)}
.front .mark .bar{stroke:#664167}
.front .logo{width:12mm;height:12mm;margin-left:-1.2mm}
.front .who{position:absolute;left:0;bottom:0}
.front h1{font-size:10.5pt;font-weight:800;letter-spacing:-.01em;line-height:1.1}
.front p{font-size:6.8pt;font-weight:500;color:#DCE4F7;margin-top:1mm}
.front .acc{color:#F4714F;font-weight:700;margin-top:.4mm}

.back{background:#fff;color:#14161A}
.back .col{position:absolute;left:0;top:1mm;bottom:0;width:48mm;display:flex;flex-direction:column;justify-content:center}
.back h2{font-size:9.6pt;font-weight:800;line-height:1.12;letter-spacing:-.01em;color:#1E3A8A}
.back h2 span{color:#EE5533}
.back .rule{display:block;width:8mm;height:.9mm;border-radius:1mm;background:#EE5533;margin:2.2mm 0 2.6mm}
.contacts{list-style:none;display:grid;gap:1.25mm;font-size:6.3pt;font-weight:600}
.contacts li{display:flex;align-items:center;gap:1.6mm;line-height:1}
.contacts i{display:grid;place-items:center;flex:none;width:3.8mm;height:3.8mm;border-radius:1.1mm;background:#EEF2FB;color:#1E3A8A}
.contacts i svg{width:2.3mm;height:2.3mm}
.back .panel{position:absolute;right:0;top:0;bottom:0;width:37mm;background:#17307A url(__BG_PANEL__) 0 0/100% 100%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2mm;padding:4mm 6mm 4mm 3mm;overflow:hidden}
.back .panel .mark{position:absolute;left:-6mm;bottom:-19mm;width:48mm;stroke:#273A76;stroke-width:19;transform:rotate(-6deg)}
.back .panel .mark .bar{stroke:#673A55}
/* Tanpa box-shadow: bayangan blur di PDF bisa tercetak sebagai kotak abu (pelajaran deck Solvara) */
.back .qrcard{position:relative;background:#fff;border-radius:2.4mm;padding:2.3mm 2.3mm 1.6mm;display:grid;justify-items:center;gap:1.2mm}
.qr{width:17mm;height:17mm;color:#1E3A8A}
.qr path{fill:currentColor}
.back .qrcard p{font-size:5.2pt;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#D94526}
.back .hint{position:relative;width:24mm;text-align:center;font-size:4.9pt;font-weight:600;line-height:1.35;color:#C9D6F5}
.back .hint b{color:#F4714F}
`;

// Tanda potong: halaman 112×77 mm, kartu (96×61) di tengah; garis 0,25 pt dimulai 1 mm di luar bleed
const MARK_CSS = `
@page{size:112mm 77mm;margin:0}
.sheet{position:relative;width:112mm;height:77mm;break-after:page;background:#fff}
.sheet:last-child{break-after:auto}
.sheet .card{position:absolute;left:8mm;top:8mm;break-after:auto}
.cm{position:absolute;background:#000}
.cm.h{height:.25pt;width:5mm}.cm.v{width:.25pt;height:5mm}
.label{position:absolute;left:8mm;bottom:1.6mm;font:500 5pt/1 'Plus Jakarta Sans',sans-serif;color:#000}`;
function cropMarks() {
  const tl = 11, tr = 101, tt = 11, tb = 66; // garis potong (8 mm offset + 3 mm bleed)
  const m = [];
  for (const x of [tl, tr]) for (const y of [tt, tb]) {
    const left = x === tl;
    const top = y === tt;
    m.push(`<i class="cm h" style="top:${y}mm;left:${left ? x - 4 - 5 : x + 4}mm"></i>`);
    m.push(`<i class="cm v" style="left:${x}mm;top:${top ? y - 4 - 5 : y + 4}mm"></i>`);
  }
  return m.join('');
}


// Gradien dirender sendiri pada 600 dpi + dither ±1 level (mencegah banding saat dicetak), lalu ditanam sebagai PNG.
const GRADIENTS = {
  __BG_FRONT__: ['linear-gradient(140deg,#2B4BA0 0%,#17307A 55%,#10205A 100%)', 96, 61],
  __BG_PANEL__: ['linear-gradient(160deg,#2B4BA0 0%,#17307A 55%,#10205A 100%)', 37, 61],
  __TOP_FRONT__: ['linear-gradient(90deg,#F5A623,#EE5533 45%,#22408F 90%)', 96, 4.2],
  __TOP_BACK__: ['linear-gradient(90deg,#F5A623,#EE5533 45%,#FFFFFF 90%)', 96, 4.2],
};
async function renderGradients(browser) {
  const ctx = await browser.newContext({ deviceScaleFactor: 600 / 96 });
  const pg = await ctx.newPage();
  const out = {};
  for (const [key, [bg, w, h]] of Object.entries(GRADIENTS)) {
    await pg.setContent(`<body style="margin:0"><div id="g" style="width:${w}mm;height:${h}mm;background:${bg}"></div></body>`);
    const png = await pg.locator('#g').screenshot();
    const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i++) data[i] = Math.max(0, Math.min(255, data[i] + Math.round(Math.random() * 2 - 1)));
    const dithered = await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toBuffer();
    out[key] = `data:image/png;base64,${dithered.toString('base64')}`;
    console.log(`gradien ${key} ${info.width}×${info.height}px (${Math.round(dithered.length / 1024)} KB)`);
  }
  await ctx.close();
  return out;
}

const doc = (body, extra = '', pageCss = '@page{size:96mm 61mm;margin:0}') =>
  `<!doctype html><html><head><meta charset="utf-8"><title>Almadhani business card</title><style>${pageCss}${CSS}${extra}</style></head><body>${body}</body></html>`;

const browser = await chromium.launch();
const GRAD = await renderGradients(browser);
const withGrad = (html) => Object.entries(GRAD).reduce((h, [k, v]) => h.replaceAll(k, v), html);
const ctx = await browser.newContext({ deviceScaleFactor: 4 });
const page = await ctx.newPage();
const ready = async (html) => {
  await page.setContent(withGrad(html), { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await Promise.all(['500', '600', '700', '800'].map((w) => document.fonts.load(`${w} 10pt "Plus Jakarta Sans"`)));
    await document.fonts.ready;
  });
};

// 1) PDF cetak: 2 halaman 96×61 mm (depan, belakang) — vektor, font tertanam
const printHtml = doc(FRONT + BACK);
writeFileSync(join(OUT, 'card.html'), withGrad(printHtml));
await ready(printHtml);
await page.pdf({ path: join(OUT, 'almadhani-card-print-rgb.pdf'), preferCSSPageSize: true, printBackground: true });

// 2) Versi dengan tanda potong
const sheets = [['FRONT', FRONT], ['BACK', BACK]]
  .map(([n, c]) => `<div class="sheet">${c}${cropMarks()}<p class="label">Almadhani business card · ${n} · trim 90×55 mm · bleed 3 mm</p></div>`)
  .join('');
await ready(doc(sheets, MARK_CSS, ''));
await page.pdf({ path: join(OUT, 'almadhani-card-cropmarks-rgb.pdf'), preferCSSPageSize: true, printBackground: true });

// 3) Pratinjau PNG (area potong saja, seperti kartu jadi)
for (const [name, html] of [['front', FRONT], ['back', BACK]]) {
  await ready(doc(html));
  const box = await page.locator('.card').boundingBox();
  const b = (box.width * 3) / 96;
  await page.screenshot({ path: join(OUT, `preview-${name}.png`), clip: { x: box.x + b, y: box.y + b, width: box.width - 2 * b, height: box.height - 2 * b } });
}
await browser.close();
console.log('ok print/: almadhani-card-print-rgb.pdf, almadhani-card-cropmarks-rgb.pdf, preview-*.png');
