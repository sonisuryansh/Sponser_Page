import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.maman-corp.com/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(4000);

  const appInfo = await page.evaluate(() => {
    const keys = Object.keys(window.app || {});
    let pageObj = null;
    for (const k of keys) {
      const val = window.app[k];
      if (val && typeof val === 'object') {
        if (val.screenNavigator || val.stepNavigator || val.screen) {
          pageObj = k;
        }
      }
    }
    return {
      keys,
      pageObj,
      homeScreens: Array.from(document.querySelectorAll('.home-screen')).map(s => s.id)
    };
  });

  console.log('App info:', JSON.stringify(appInfo, null, 2));
  await browser.close();
}

run();
