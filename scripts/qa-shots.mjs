// QA visual: screenshot halaman penuh (desktop & HP, terang & gelap) ke qa/. Pakai: node scripts/qa-shots.mjs [baseUrl]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:3030';
const pages = ['/', '/work/ai-assist-funnel-builder', '/work/solvara-reserva', '/cv'];
mkdirSync('qa', { recursive: true });
const browser = await chromium.launch();
for (const [vw, w, h] of [['desk', 1440, 900], ['mob', 390, 844]]) {
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const name = `${vw}-${theme}-${p === '/' ? 'home' : p.replaceAll('/', '_').slice(1)}`;
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      for (let y = 0, i = 0; y < total; y += 1800, i++) {
        await page.screenshot({ path: `qa/${name}-${i}.png`, fullPage: true, clip: { x: 0, y, width: w, height: Math.min(1800, total - y) } });
      }
      console.log(name, total + 'px', overflow ? 'HORIZONTAL OVERFLOW' : '');
    }
    if (errors.length) console.log('console errors:', [...new Set(errors)].slice(0, 5));
    await ctx.close();
  }
}
await browser.close();
