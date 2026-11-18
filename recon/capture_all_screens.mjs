import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  console.log('Starting full suite capture across all 7 screens (14 steps)...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.maman-corp.com/', { waitUntil: 'load', timeout: 35000 });
  await page.waitForTimeout(4000);

  // Click landing scroll button to enter Screen 1 Step 1
  await page.evaluate(() => {
    const btn = document.getElementById('home-landing__scroll') || document.getElementById('home-landing__content__cta');
    if (btn) btn.click();
  });
  await page.waitForTimeout(2000);

  const screens = [
    { num: 1, name: 'story' },
    { num: 2, name: 'client-commitment' },
    { num: 3, name: 'vision' },
    { num: 4, name: 'expertise' },
    { num: 5, name: 'who-we-are' },
    { num: 6, name: 'services' },
    { num: 7, name: 'personal-commitment' }
  ];

  for (let s = 0; s < screens.length; s++) {
    const sc = screens[s];
    console.log(`Capturing Screen ${sc.num}: ${sc.name} ...`);

    // We are on Step 1 of this screen (or first screen)
    if (s > 0) {
      // Advance to next screen step 1
      await page.evaluate(() => {
        const btn = document.getElementById('home-scroll-cta__btn') || document.getElementById('home-scroll-cta');
        if (btn) btn.click();
      });
      // Capture 2 transition frames
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', `trans_s${sc.num}_f1.png`) });
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', `trans_s${sc.num}_f2.png`) });
      await page.waitForTimeout(1000);
    }

    // Capture Step 1
    const s1File = `screen_0${sc.num}_step1.png`;
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', s1File) });
    console.log(`Saved ${s1File}`);

    // Advance to Step 2
    await page.evaluate(() => {
      const btn = document.getElementById('home-scroll-cta__btn') || document.getElementById('home-scroll-cta');
      if (btn) btn.click();
    });
    // Capture 2 transition frames
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', `step2_s${sc.num}_f1.png`) });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', `step2_s${sc.num}_f2.png`) });
    await page.waitForTimeout(1000);

    // Capture Step 2
    const s2File = `screen_0${sc.num}_step2.png`;
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', s2File) });
    console.log(`Saved ${s2File}`);
  }

  console.log('All 14 screen states captured successfully!');
  await browser.close();
}

run();
