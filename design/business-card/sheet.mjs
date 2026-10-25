// Lembar perbandingan 3 opsi (depan | belakang) untuk dipilih.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const D = 'design/business-card/out/';
const u = (f) => 'data:image/png;base64,' + readFileSync(D + f).toString('base64');
const rows = [['a', 'A — Navy mark', 'Navy front with a large drawn AL; clean white back with contacts and QR.'],
  ['b', 'B — Paper minimal', 'Quiet white front, name and colour logo; navy back with a framed QR.'],
  ['c', 'C — Signature orange', 'Bold orange front, giant white AL cropped off the edge; tidy white back.']];
const html = `<body style="margin:0;padding:36px 40px;background:#e9ebef;font-family:-apple-system,Helvetica,sans-serif">
${rows.map(([k, t, n]) => `<section style="margin-bottom:34px"><h2 style="margin:0 0 4px;font-size:20px;color:#14161a">${t}</h2>
<p style="margin:0 0 14px;color:#4b5361;font-size:14px">${n}</p><div style="display:flex;gap:26px">
${['front', 'back'].map((s) => `<figure style="margin:0"><img src="${u(`${k}-${s}.png`)}" style="width:450px;border-radius:10px;box-shadow:0 14px 30px -14px rgba(0,0,0,.45);display:block"><figcaption style="margin-top:8px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.1em">${s}</figcaption></figure>`).join('')}
</div></section>`).join('')}</body>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1006, height: 800 }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.screenshot({ path: D + 'options.png', fullPage: true });
await b.close();
console.log('ok', D + 'options.png');
