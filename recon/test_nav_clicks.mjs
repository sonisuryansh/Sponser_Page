import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.maman-corp.com/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(4000);

  // Click scroll on landing
  console.log('Clicking landing scroll button...');
  await page.evaluate(() => {
    const btn = document.getElementById('home-landing__scroll') || document.getElementById('home-landing__content__cta');
    if (btn) btn.click();
  });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'step_after_landing.png') });
  console.log('Saved step_after_landing.png');

  // Next step
  console.log('Clicking home-scroll-cta__btn...');
  await page.evaluate(() => {
    const btn = document.getElementById('home-scroll-cta__btn') || document.getElementById('home-scroll-cta');
    if (btn) btn.click();
  });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'step_after_cta1.png') });
  console.log('Saved step_after_cta1.png');

  // Check which screen is currently visible
  const visibility = await page.evaluate(() => {
    const screens = Array.from(document.querySelectorAll('.home-screen'));
    return screens.map(s => ({
      id: s.id,
      display: getComputedStyle(s).display,
      visibility: getComputedStyle(s).visibility,
      opacity: getComputedStyle(s).opacity,
      zIndex: getComputedStyle(s).zIndex,
      classes: s.className
    }));
  });
  console.log('Visibility:', JSON.stringify(visibility, null, 2));

  await browser.close();
}

run();
