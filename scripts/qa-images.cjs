// Cek semua <img> termuat setelah scroll penuh + screenshot logo navbar.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3030/', { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
  await p.waitForTimeout(800);
  console.log(await p.evaluate(() => [...document.images].map((i) => `${i.getAttribute('src')} ${i.complete && i.naturalWidth > 0 ? 'ok' : 'BROKEN'}`)));
  await p.evaluate(() => scrollTo(0, 0));
  await p.locator('header nav a').first().screenshot({ path: 'qa/logo.png' });
  await b.close();
})();
