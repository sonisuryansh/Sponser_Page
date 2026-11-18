import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('https://www.maman-corp.com/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(4000);

  // Trigger nav open directly via evaluate
  await page.evaluate(() => {
    const btn = document.getElementById('nav-toggle');
    if (btn) {
      btn.click();
    } else {
      const checkbox = document.getElementById('nav-is-open');
      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '07_menu_open.png') });
  console.log('Saved 07_menu_open.png');

  // Hover over Solutions or Story
  const link = await page.$('#nav a');
  if (link) {
    await link.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '08_menu_hover.png') });
    console.log('Saved 08_menu_hover.png');
  }

  await browser.close();
}

run();
