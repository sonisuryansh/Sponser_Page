# DESIGN LANGUAGE & REVERSE-ENGINEERING SPECIFICATION
**Source Reference**: [maman-corp.com](https://www.maman-corp.com/)  
**Measured Date**: November 2026 via Playwright Chromium (1440x900 & 390x844)  
**Status**: Real Browser Inspected — All values tagged `[Measured]` or `[NOT FOUND]`  

---

## 1. Color Tokens (Hex & Computed)

* **Light Background Base** `[Measured]`: `#f1f1f1` (`rgb(241, 241, 241)`) — warm pale stone / gallery white used on all editorial steps (`step-2`).
* **Pure White Accent** `[Measured]`: `#ffffff` (`rgb(255, 255, 255)`) — used for central editorial card container, text on dark chapters, and hairline grid lines.
* **Dark Background Base** `[Measured]`: `#000000` (`rgb(0, 0, 0)`) — used for cinematic video/canvas chapters (`step-1`).
* **Brand Accent Primary** `[Measured]`: `#d62323` (`rgb(214, 35, 35)`) — vivid vermillion red. Used for:
  - Statement headlines on pale editorial steps (`step-2`)
  - Eyebrows on dark video steps (`step-1`)
  - Active hamburger menu button background when open (`.nav-toggle--close`)
  - Solid accent corner square (`left: 0; bottom: 0; width: 100px; height: 100px;`)
  - Active scroll cue downward arrow
* **Ink Black (Text)** `[Measured]`: `#000000` / `#111111` — used for editorial body copy and light-theme chrome.
* **Muted Grey** `[Measured]`: `#5b5b5b` / `#777777` — used for secondary captions and metadata.
* **Grid Hairlines** `[Measured]`: `#ffffff` with `opacity: 0.15` (on dark); `#000000` with `opacity: 0.1` (on light).
* **Overlay Tint** `[Measured]`: `rgba(0, 0, 0, 0.35)` to `rgba(0, 0, 0, 0.55)` gradient for high text contrast.

---

## 2. Typography

* **Display Heading Font** `[Measured]`: `gt_walsheim, Helvetica, Arial, sans-serif`
  - *Free / Google Fonts Alternative for Rebuild*: **Plus Jakarta Sans** or **DM Sans** (high-geometry geometric grotesque matching GT Walsheim's circular bowls and clean terminals).
  - *H1 (Section Eyebrow/Name)* `[Measured]`: `font-size: 27px; font-weight: 500; line-height: 29.7px; letter-spacing: normal; text-transform: none;`
  - *H2 (Statement Headline)* `[Measured]`: `font-size: 42px; font-weight: 500; line-height: 42px; letter-spacing: normal; text-transform: none;`
    - Rendered in `#ffffff` on dark chapters (`step-1`).
    - Rendered in `#d62323` (brand red) on light chapters (`step-2`).
* **Eyebrow / Sub-Labels** `[Measured]`: `roboto, Helvetica, Arial, sans-serif`
  - Computed: `font-size: 10px; font-weight: 500; line-height: 16px; letter-spacing: 1px (0.1em); text-transform: uppercase;`
* **Body Copy** `[Measured]`: `gt_walsheim, Helvetica, Arial, sans-serif`
  - Computed: `font-size: 14px; font-weight: 500; line-height: 26.6px (1.9x); letter-spacing: 0.56px; color: #000000;`
  - Max line length: 60 to 70 characters per line.
* **Navigation Links** `[Measured]`: `roboto, Helvetica, Arial, sans-serif`
  - Computed: `font-size: 10px; font-weight: 500; line-height: 16px; text-transform: uppercase; letter-spacing: 0.1em; color: #ffffff;`
* **Chapter Counter / Index** `[Measured]`: `montserrat, Helvetica, Arial, sans-serif`
  - Computed: `font-size: 28px; font-weight: 700; color: #000000;` oriented vertically with pagination dots below.
* **Quiet Underline Text Link** `[Measured]`: `roboto, Helvetica, Arial, sans-serif`
  - Computed: `font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.18em; color: #000000;` accompanied by an extending hairline underline.

---

## 3. Layout, Grid & Spacing

* **Viewport Architecture** `[Measured]`: Strictly `100svh` (`900px` on desktop baseline), `position: absolute; width: 100%; height: 100%; overflow: hidden;`.
* **Vertical 4-Column Architectural Grid** `[Measured]`:
  - 4 full-height vertical hairlines (`width: 1px; opacity: 0.15;`):
    - Line 1: `left: 21.46%`
    - Line 2: `left: 24.80%`
    - Line 3: `right: 13.48%`
    - Line 4: `right: 0px`
* **Left Pagination Sidebar** `[Measured]`:
  - `position: absolute; bottom: 18.12%; left: 0; width: 17.15vw; max-width: 138px; z-index: 3;`
  - Displays vertical index `1/07` and 7 small vertical pagination dots.
* **Right Scroll Cue Sidebar** `[Measured]`:
  - `position: absolute; right: 0; bottom: 6.04vw; width: 13.48%; z-index: 3;`
  - Label: `font-size: 8px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; transform: rotate(-90deg) translateY(50%); transform-origin: left bottom; white-space: nowrap;`
  - Downward pointing arrow beneath.
* **Accent Corner Geometry** `[Measured]`:
  - Red solid square (`#d62323`) pinned at bottom-left corner (`left: 0; bottom: 0; width: 100px; height: 100px; z-index: 2;`).

---

## 4. Header & Full-Screen Menu

* **Fixed Header Top Bar** `[Measured]`:
  - Height: `80px`, `position: fixed; top: 0; left: 0; width: 100%; z-index: 100;`.
  - Left: Logo monogram + wordmark at `top: 25px; left: 35px;`.
  - Right: Minimal Hamburger toggle button (`#nav-toggle`):
    - Dimensions: `width: 87px; height: 87px; position: fixed; top: 0; right: 0; cursor: pointer;`.
    - Default state: 3 horizontal white/black lines (`.nav-toggle__list__line`).
* **Menu Open Animation (Frame-by-Frame)** `[Measured]`:
  1. Toggle button background transitions to brand red `#d62323` (`duration: 0.4s`).
  2. The 3 horizontal lines stagger exit to the right (`duration: 0.3s, ease: Quart.easeIn, stagger: 0.06s`).
  3. Two cross lines rotate in to form an 'X' (`duration: 0.8s, ease: Expo.easeOut, delay: 0.1s`).
  4. Fullscreen menu slides in with horizontal acts at the top and a high-impact red banner (`#d62323`) across the lower third containing:
     - Uppercase eyebrow (`EXPERTS SINCE 1997`)
     - Large white statement headline
     - Supporting descriptive column
     - White right-hand box with `Scroll to discover` and downward arrow.

---

## 5. Preloader

* **Background** `[Measured]`: Pure white (`#ffffff`), full viewport (`100svh`).
* **Center Branding** `[Measured]`: Company logo + subtitle in Montserrat/GT Walsheim.
* **Geometric Motif** `[Measured]`: Animated 1px geometric maze/labyrinth lines drawn in subtle grey (`#f0f0f0`).
* **Numeric Counter** `[Measured]`: Counts smoothly from `00` to `100` (`#main-loading__progress__value`).
* **Bottom Tagline** `[Measured]`: `QUALITY IS OUR STANDARD` (`letter-spacing: 0.28em; font-size: 10px; text-transform: uppercase;`).
* **Exit Curtain** `[Measured]`: Once 100 is reached, white background wipes vertically upward (`duration: 1.0s, ease: Expo.easeInOut`) revealing the hero chapter.

---

## 6. Chapter Structure & Step-to-Step Transitions

* **Two-Step Chapter Architecture** `[Measured]`:
  Every chapter consists of a paired 2-step rhythm (7 screens x 2 steps = 14 total steps):
  - **Step 1 (Dark Video / Media)**: Full-viewport looping muted video (`<video loop muted playsinline>`), vertical grid lines, statement headline in white, red eyebrow.
  - **Step 2 (Pale Editorial)**: Pure off-white background (`#f1f1f1`), brand red statement headline (`#d62323`), editorial paragraph (60-70 characters per line), quiet underline text link, and real photography on the right.
* **Step 1 to Step 2 Transition (Timeline Sequence)** `[Measured]`:
  1. Center white container expands: `scale: 1.15 -> 1.0, opacity: 0 -> 1, duration: 1.3s, ease: Quart.easeInOut`.
  2. Headline slides and morphs from white to brand red: `duration: 0.8s, ease: Expo.easeInOut`.
  3. Image overlay curtain wipes away: `xPercent: 0 -> -100, duration: 0.9s, ease: Expo.easeInOut, delay: 0.7s`.
  4. Red accent block enters bottom left: `y: 100 -> 0, duration: 0.6s, ease: Quart.easeIn`.
  5. Chrome switches color from `light` to `dark` (`duration: 0.4s`).
* **Chapter Exit Transition** `[Measured]`:
  - Body and link fade: `opacity: 0, duration: 0.5s`.
  - Content block slides left: `xPercent: 0 -> -60, opacity: 0, duration: 0.7s, ease: Quart.easeIn`.
  - Next chapter scales in: `scale: 1.05 -> 1.0, opacity: 0 -> 1, duration: 1.0s, ease: Expo.easeOut`.
  - Counter increments (`1/07` -> `2/07`).

---

## 7. Text Reveal Technique

* **Line-by-Line Split** `[Measured]`:
  - Headlines and subtitles split into individual lines using `SplitText` (`type: "lines"`).
  - Each line placed inside an `overflow: hidden` line container.
  - Line reveal tween: `fromTo({ yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8s, ease: Expo.easeOut, stagger: 0.06s, delay: 0.4s })`.

---

## 8. Video & Image Treatment

* **Videos** `[Measured]`:
  - Looping muted MP4s (`home-landing.mp4`, `home-1.mp4` through `home-7.mp4`).
  - Rendered behind a 2D HTML5 canvas buffer layer for smooth opacity/pixel transitions.
* **Images** `[Measured]`:
  - High-resolution architectural and industrial photography.
  - Zero border-radius (`rounded: 0px`, sharp corners).
  - Overlay wipe curtain (`.home-screen__step-2__img__overlay`) sliding horizontally `xPercent: -100`.

---

## 9. Hover & Link Effects

* **Navigation Links** `[Measured]`: Subtle color transition to red (`#d62323`).
* **Quiet Text Links** `[Measured]`: Trailing 1px hairline horizontal rule that expands on hover (`transform-origin: left; scaleX: 1.15; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)`).
* **Nav Toggle** `[Measured]`: Transforms into solid brand red box with white cross icon.

---

## 10. Mobile Behaviour (390x844)

* **Layout Mode** `[Measured]`: Unpinned normal vertical stacking.
* **Header** `[Measured]`: Compact logo and minimal hamburger.
* **Overflow** `[Measured]`: Strictly `overflow-x: hidden`.
* **Touch Gestures** `[Measured]`: Hammer.js vertical swipe detection to trigger step advances.

---

## 11. Tech Stack Detected

* **GSAP / TweenMax & TimelineMax** `[Measured]`: Bundled for all timeline orchestrations, eases, and tweens.
* **Hammer.js** `[Measured]`: Integrated for touch gesture handling.
* **2D Canvas Buffer** `[Measured]`: Canvas rendering for video blending transitions.
* **jQuery 3.1.1** `[Measured]`: DOM element manipulation and event delegation.
* **Lenis / Three.js / Barba.js** `[Measured - NOT FOUND]`: Maman Corp uses custom `ScreenNavigator` with GSAP rather than Lenis or Three.js WebGL.
