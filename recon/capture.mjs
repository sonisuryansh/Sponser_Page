import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure directories exist
const dirs = [
  path.join(rootDir, 'recon'),
  path.join(rootDir, 'recon', 'shots'),
  path.join(rootDir, 'recon', 'frames'),
  path.join(rootDir, 'recon', 'video')
];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

async function run() {
  console.log('Starting Playwright capture for https://www.maman-corp.com/ ...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: path.join(rootDir, 'recon', 'video'), size: { width: 1440, height: 900 } },
    reducedMotion: 'no-preference',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Track network assets
  const networkAssets = {
    css: [],
    js: [],
    fonts: [],
    images: [],
    videos: [],
    other: []
  };

  page.on('response', response => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (url.endsWith('.css') || contentType.includes('text/css')) {
      networkAssets.css.push(url);
    } else if (url.endsWith('.js') || contentType.includes('javascript')) {
      networkAssets.js.push(url);
    } else if (url.includes('.woff') || url.includes('.woff2') || url.includes('.ttf') || contentType.includes('font')) {
      networkAssets.fonts.push(url);
    } else if (url.match(/\.(png|jpg|jpeg|webp|avif|svg)(\?.*)?$/i) || contentType.includes('image')) {
      networkAssets.images.push(url);
    } else if (url.match(/\.(mp4|webm|mov)(\?.*)?$/i) || contentType.includes('video')) {
      networkAssets.videos.push(url);
    }
  });

  try {
    console.log('Navigating to https://www.maman-corp.com/ ...');
    await page.goto('https://www.maman-corp.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
    
    // Initial shot (Preloader / Hero entry)
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '00-preloader-entry.png') });

    // Wait for preloader to finish or 3.5s
    await page.waitForTimeout(3500);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', '01-hero-settled.png') });

    // Extract real tokens and computed values
    console.log('Extracting design tokens and window globals...');
    const tokens = await page.evaluate(() => {
      // 1. Root custom properties
      const rootStyles = getComputedStyle(document.documentElement);
      const rootVars = {};
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          const rules = sheet.cssRules || sheet.rules;
          for (let r = 0; r < rules.length; r++) {
            const rule = rules[r];
            if (rule.selectorText === ':root') {
              for (let v = 0; v < rule.style.length; v++) {
                const varName = rule.style[v];
                if (varName.startsWith('--')) {
                  rootVars[varName] = rootStyles.getPropertyValue(varName).trim();
                }
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheet security exception
        }
      }

      // 2. Computed styles helper
      function getStyle(selector) {
        const el = document.querySelector(selector);
        if (!el) return 'NOT FOUND';
        const cs = getComputedStyle(el);
        return {
          selector,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          textTransform: cs.textTransform,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          margin: cs.margin,
          padding: cs.padding
        };
      }

      // 3. Headings & Typography
      const typography = {
        h1: getStyle('h1'),
        h2: getStyle('h2'),
        h3: getStyle('h3'),
        p: getStyle('p'),
        a: getStyle('a'),
        eyebrow: getStyle('.eyebrow, [class*="eyebrow"], [class*="sub"], [class*="label"], [class*="category"]'),
        navLink: getStyle('nav a, header a'),
        cta: getStyle('a.btn, button, [class*="btn"], [class*="button"]'),
        counter: getStyle('[class*="counter"], [class*="num"], [class*="index"]')
      };

      // 4. Backgrounds & Overlays
      const bodyStyles = getComputedStyle(document.body);
      const sections = Array.from(document.querySelectorAll('section, main > div, [class*="section"]')).slice(0, 10).map((sec, i) => {
        const cs = getComputedStyle(sec);
        return {
          index: i,
          tagName: sec.tagName,
          className: sec.className,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          height: cs.height,
          padding: cs.padding,
          position: cs.position
        };
      });

      // 5. Tech stack & window inspection
      const tech = {
        hasGsap: typeof window.gsap !== 'undefined',
        hasScrollTrigger: typeof window.ScrollTrigger !== 'undefined' || (window.gsap && !!window.gsap.plugins && !!window.gsap.plugins.ScrollTrigger),
        hasLenis: typeof window.Lenis !== 'undefined' || !!document.querySelector('.lenis'),
        hasThree: typeof window.THREE !== 'undefined',
        hasPixi: typeof window.PIXI !== 'undefined',
        hasBarba: typeof window.barba !== 'undefined',
        hasSwup: typeof window.swup !== 'undefined',
        hasLocomotive: typeof window.LocomotiveScroll !== 'undefined' || !!document.querySelector('[data-scroll-container]'),
        hasWebflow: typeof window.Webflow !== 'undefined',
        hasWebGLCanvas: !!document.querySelector('canvas'),
        framework: window.React ? 'React' : window.Vue ? 'Vue' : window.angular ? 'Angular' : 'Custom / Static',
        metaGenerator: document.querySelector('meta[name="generator"]')?.getAttribute('content') || 'NOT FOUND'
      };

      // 6. CSS Animations & Transitions
      const activeAnimations = document.getAnimations ? document.getAnimations().map(a => {
        const eff = a.effect;
        const timing = eff ? eff.getTiming() : {};
        return {
          id: a.id || 'unnamed',
          playState: a.playState,
          duration: timing.duration,
          easing: timing.easing,
          delay: timing.delay
        };
      }).slice(0, 15) : [];

      // 7. Scroll & Viewport Metrics
      const scrollMetrics = {
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
        hasWheelListeners: false, // will check externally
        isPinned: !!document.querySelector('.pin-spacer, [data-scroll-pin]')
      };

      return {
        rootVars,
        typography,
        bodyBg: bodyStyles.backgroundColor,
        bodyColor: bodyStyles.color,
        sections,
        tech,
        activeAnimations,
        scrollMetrics
      };
    });

    // Merge network assets
    tokens.networkAssets = {
      css: [...new Set(networkAssets.css)],
      js: [...new Set(networkAssets.js)],
      fonts: [...new Set(networkAssets.fonts)],
      images: [...new Set(networkAssets.images)].slice(0, 30),
      videos: [...new Set(networkAssets.videos)]
    };

    fs.writeFileSync(path.join(rootDir, 'recon', 'tokens.json'), JSON.stringify(tokens, null, 2));
    console.log('Saved recon/tokens.json successfully!');

    // Smooth scroll and capture chapters & frame strips
    console.log('Beginning progressive scroll capture...');
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = 900;
    const scrollSteps = Math.min(Math.ceil(totalHeight / 250), 30);

    let chapterIndex = 2;
    for (let i = 1; i <= scrollSteps; i++) {
      await page.mouse.wheel(0, 250);
      await page.waitForTimeout(350);

      // Capture transition frame every 4 steps
      if (i % 3 === 0) {
        await page.screenshot({ path: path.join(rootDir, 'recon', 'frames', `frame-${String(i).padStart(2, '0')}.png`) });
      }

      // Capture chapter milestone roughly every 6 steps
      if (i % 6 === 0) {
        const shotName = `${String(chapterIndex).padStart(2, '0')}-chapter-scroll-${i}.png`;
        await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', shotName) });
        chapterIndex++;
      }
    }

    // Capture Menu state
    console.log('Inspecting and capturing menu...');
    const menuBtn = await page.$('button[class*="menu"], [aria-label*="menu" i], .menu-toggle, [class*="burger"], nav button, header button');
    if (menuBtn) {
      await menuBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'menu-open.png') });

      // Hover first nav link if present
      const navLinks = await page.$$('nav a, [class*="menu"] a');
      if (navLinks.length > 0) {
        await navLinks[0].hover();
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'menu-hover.png') });
      }

      // Close menu
      await menuBtn.click();
      await page.waitForTimeout(600);
    } else {
      console.log('Menu button selector not directly found, scanning header elements...');
    }

    // Subpages: /solutions, /process, /about, /contact
    const subpages = ['/solutions', '/process', '/about', '/contact'];
    for (const sub of subpages) {
      try {
        console.log(`Checking subpage: https://www.maman-corp.com${sub} ...`);
        const res = await page.goto(`https://www.maman-corp.com${sub}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        if (res && res.status() < 400) {
          await page.waitForTimeout(1500);
          const safeName = sub.replace('/', '');
          await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', `page-${safeName}.png`) });
        }
      } catch (err) {
        console.log(`Subpage ${sub} skipped: ${err.message}`);
      }
    }

    // Mobile Viewport (390x844)
    console.log('Switching to mobile viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://www.maman-corp.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'mobile-01-hero.png') });

    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'mobile-02-mid.png') });

    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(rootDir, 'recon', 'shots', 'mobile-03-lower.png') });

    console.log('All captures and extractions finished successfully!');
  } catch (err) {
    console.error('Capture script error:', err);
  } finally {
    await context.close();
    await browser.close();
  }
}

run();
