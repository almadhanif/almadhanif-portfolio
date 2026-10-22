// Ambil screenshot halaman publik produk live ke assets/raw (sekali jalan, hasil di-commit).
import { chromium } from 'playwright';
const targets = [
  ['nata', 'https://nata.solvara-tech.com'],
  ['prakira', 'https://solvara-tech.com/prakira-sawit'],
  ['solvara', 'https://solvara-tech.com'],
];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
for (const [name, url] of targets) {
  await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `assets/raw/${name}.png` });
  console.log('ok', name);
}
await browser.close();
