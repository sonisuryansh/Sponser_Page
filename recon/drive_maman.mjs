import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function run() {
  console.log('Launching browser to capture authentic Maman Corp experience...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'no-preference',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    await page.goto('https://www.maman-corp.com/', { waitUntil: 'load', timeout: 45000 });

    // 1. Preloader capture (00-preloader)
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '00_preloader.png') });

    // Wait until main-loading-page is gone or opacity is 0
    console.log('Waiting for preloader completion...');
    await page.waitForFunction(() => {
      const loader = document.getElementById('main-loading-page');
      return !loader || getComputedStyle(loader).display === 'none' || getComputedStyle(loader).visibility === 'hidden' || getComputedStyle(loader).opacity === '0';
    }, { timeout: 15000 }).catch(() => console.log('Loader wait timeout, continuing...'));

    await page.waitForTimeout(2000);
    // 2. Landing hero settled
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '01_landing_settled.png') });
    console.log('Saved 01_landing_settled.png');

    // Trigger step transition via mouse wheel
    console.log('Navigating to Screen 1: Our story (Step 1)...');
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', 'strip1_f1.png') });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', 'strip1_f2.png') });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '02_screen1_step1.png') });
    console.log('Saved 02_screen1_step1.png');

    // Step 1 to Step 2
    console.log('Advancing to Screen 1 (Step 2 - Pale Editorial)...');
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', 'strip2_f1.png') });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', 'strip2_f2.png') });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', 'strip2_f3.png') });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '03_screen1_step2.png') });
    console.log('Saved 03_screen1_step2.png');

    // Advance to Screen 2
    console.log('Advancing to Screen 2 (Client Commitment)...');
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', 'strip3_f1.png') });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '04_screen2_step1.png') });
    console.log('Saved 04_screen2_step1.png');

    // Screen 2 Step 2
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '05_screen2_step2.png') });
    console.log('Saved 05_screen2_step2.png');

    // Advance to Screen 3 (Vision)
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '06_screen3_step1.png') });
    console.log('Saved 06_screen3_step1.png');

    // Menu toggle open
    console.log('Opening Nav Menu...');
    const navToggle = await page.$('#nav-toggle');
    if (navToggle) {
      await navToggle.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '07_menu_open.png') });
      console.log('Saved 07_menu_open.png');

      const navLink = await page.$('#nav a');
      if (navLink) {
        await navLink.hover();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '08_menu_hover.png') });
        console.log('Saved 08_menu_hover.png');
      }
      await navToggle.click();
      await page.waitForTimeout(600);
    }

    console.log('All authentic shots captured successfully!');
  } catch (err) {
    console.error('Drive error:', err);
  } finally {
    await browser.close();
  }
}

run();
