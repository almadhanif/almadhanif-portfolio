// Render gambar Open Graph 1200×630 (beranda + tiap studi kasus) ke public/og/*.png. Hasil di-commit.
// Pakai: node scripts/og-images.mjs
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { caseStudies } from '../src/content/work.ts';
import { profile } from '../src/content/profile.ts';

mkdirSync('public/og', { recursive: true });
const photo = `data:image/webp;base64,${readFileSync('public/img/almadhani.webp').toString('base64')}`;
const logo = readFileSync('design/logo/kit/al-lockup-reversed.svg', 'utf8').replace('<svg', '<svg class="logo" height="44"');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;600;700;800&display=block');
*{margin:0;box-sizing:border-box} body{width:1200px;height:630px;font-family:'Plus Jakarta Sans',sans-serif;color:#fff;
background:linear-gradient(140deg,#2B4BA0 0%,#17307A 55%,#10205A 100%);position:relative;overflow:hidden;padding:64px 72px}
.top{position:absolute;left:0;top:0;height:8px;width:100%;background:linear-gradient(90deg,#F5A623,#EE5533 40%,transparent 85%)}
.eyebrow{display:inline-flex;gap:10px;align-items:center;background:#fff;color:#D94526;border-radius:999px;padding:9px 18px;font-size:20px;font-weight:700}
h1{font-size:64px;line-height:1.05;font-weight:800;letter-spacing:-.02em;margin-top:30px}
.sub{font-size:30px;font-weight:300;color:#DCE4F7;margin-top:14px}.sub b{font-weight:800;color:#fff}.sub span{color:#F4714F;font-weight:700}
.foot{position:absolute;left:72px;right:72px;bottom:56px;display:flex;gap:14px}
.stat{background:#fff;border-radius:18px;padding:16px 22px;color:#1E3A8A}.stat b{display:block;font-size:30px;font-weight:800}.stat span{font-size:16px;color:#4B5361;font-weight:600}
.url{position:absolute;right:72px;top:118px;font-size:18px;font-weight:700;color:#C9D6F5}
.logo{position:absolute;right:72px;top:62px}
img{position:absolute;right:72px;top:160px;width:250px;height:250px;border-radius:28px;border:6px solid #fff;object-fit:cover}
`;

function home() {
  return `<div class="top"></div><span class="eyebrow">● Open to remote work · UTC+7</span>
  ${logo}
  <h1 style="max-width:760px">${esc(profile.name)}</h1>
  <p class="sub"><b>${esc(profile.title)}</b> <span>· ${esc(profile.titleAccent)}</span></p>
  <img src="${photo}">
  <div class="foot">${profile.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`;
}

function study(c) {
  return `<div class="top"></div><span class="eyebrow">Case study · ${esc(c.client)}</span>
  ${logo}
  <div class="url">almadhanif.solvara-tech.com</div>
  <h1 style="max-width:1000px;font-size:58px">${esc(c.title)}</h1>
  <p class="sub" style="font-size:24px;max-width:960px;line-height:1.45">${esc(c.summary)}</p>
  <div class="foot">${c.metrics.map((m) => `<div class="stat"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join('')}</div>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const jobs = [['home', home()], ...caseStudies.map((c) => [c.slug, study(c)])];
for (const [name, body] of jobs) {
  await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>${body}</body></html>`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${name}.png` });
  console.log('ok', name);
}
await browser.close();
