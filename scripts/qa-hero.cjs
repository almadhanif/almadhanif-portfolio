// Screenshot area hero (desktop & HP, terang & gelap) setelah animasi masuk selesai.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [n, w, h] of [['desk', 1440, 900], ['mob', 390, 844]]) {
    for (const t of ['light', 'dark']) {
      const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme: t });
      const errs = [];
      p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      await p.goto('http://localhost:3030/', { waitUntil: 'networkidle' });
      await p.mouse.move(w * 0.3, 300);
      await p.waitForTimeout(2600);
      await p.screenshot({ path: `qa/hero-${n}-${t}.png`, fullPage: false, clip: { x: 0, y: 0, width: w, height: n === 'desk' ? 1100 : 1500 } , fullPage: true });
      const ow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      console.log(n, t, ow ? 'OVERFLOW' : 'ok', errs.slice(0, 2));
      await p.close();
    }
  }
  await b.close();
})();
