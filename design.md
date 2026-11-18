Design-system spec derived from the site at https://www.maman-corp.com/ (Home and Solutions pages).

Evidence legend

[Observed]: seen directly in the fetched page content (structure, copy, asset names, meta tags).
[Inferred]: a reasonable reading of the observed structure and the agency behind the site (Immersive Garden). Treat as a hypothesis.
[Proposed]: a value I chose because the real one could not be retrieved. Replace it once you inspect the live site in DevTools.

Limit of this analysis: my fetch tools return page content as text. They do not return the CSS, font files, JS bundles or computed styles, and my shell cannot reach external sites. Exact hex colors, font families, easing curves and animation code are therefore not recoverable here. See "Reverse-engineering checklist" at the bottom for how to get them in about 10 minutes.

1. Brand and tone
Company: commercial and industrial construction management and general contractor, founded 1997, Elk Grove Village IL, 15 states. [Observed]
Positioning: premium, craftsmanship-led, relationship-driven ("family-like"), 100% women-owned (WBDC certified). [Observed]
Tagline / loader text: "quality is our standard". [Observed]
Voice: warm, confident, human. Short declarative headlines, then a calm paragraph of 60 to 90 words. "We create environments" rather than "we build buildings". [Observed]
Visual mood: cinematic, editorial, minimal chrome. Lets large footage and photography carry the brand. [Inferred]
2. Site architecture [Observed]
Route	Purpose
/	Home: 7 full-screen story chapters
/solutions	Services, M.E.S.T emergency team, in-house experts, sectors, brochure download
/process	Process
/project/ and /project/<slug>	Case studies (water-u, schneider-schaumburg, schneider-houston, ecolab-lobby, customer-experience-center)
/about	About
/contact (+ #jobs)	Contact and careers
/terms-and-conditions	Legal

Primary nav: Home, Solutions, Process, Projects, About us, Contact. The menu also exposes a second level (home chapter anchors, solutions anchors, project list).

3. Layout and page patterns
3.1 Home: scroll-driven chapter experience [Observed]
One looping background video per chapter: home-landing.mp4, then home-1.mp4 to home-7.mp4.
Chapter counter in the corner: 1/07, with "Scroll to explore" and "Scroll to discover" hints.
Chapters, in order: Hero, Our story, Our client commitment, Our vision, Our expertise, Who we are, Our safety services, Our personal commitment.
Chapter anatomy:
Eyebrow label (the h1, e.g. "Our story")
Statement headline (the h2, one sentence, e.g. "Quality is not only our standard. It's also an attitude instilled in our company.")
One body paragraph
Text link: "Discover more about …" (links to /about)
The eyebrow and headline are duplicated in the markup, which suggests a split-text or masked reveal animation (one copy visible, one animating). [Inferred]
Hero: eyebrow "Experts since 1997", an h1 statement, a two-sentence sub-line, then "Scroll to discover".
3.2 Solutions: editorial long page [Observed]
Image header (solutions-header.jpg) with the pattern "We provide / Complete Construction Solutions / tagline".
Intro paragraph, then a feature block ("Maman Emergency Service Team", 24/7).
Two-image pairing (solutions-price-1.jpg, solutions-price-2.jpg) beside the "labor of love" copy.
"In-house experts": 4 items, each with a title and a one-line descriptor (Project management, Carpentry, Audiovisual, Hardware).
Sector gallery: 5 image tiles with captions (Industrial, New Construction, Renovations, Start-up, Tenant Improvements).
Closing CTA: brochure and capabilities sell-sheet download.
3.3 Global chrome [Observed]
Fixed header with logo (logo-txt) and a menu toggle.
Preloader: numeric counter (00 to 100), the line "quality is our standard", "Loading".
Footer: company name, address, copyright, Terms link, credit "Website by Immersive Garden".
meta theme-color: #ffffff, so a white UI base. user-scalable=no is set (not recommended for accessibility; do not copy).
4. Design tokens
4.1 Color

Only one value is observed: 
#ffffff (theme color). The rest are proposed to match the premium-construction tone and need to be verified.

Token	Value	Status
--color-bg	
#ffffff	Observed
--color-ink	
#111111	Proposed
--color-ink-muted	
#5b5b5b	Proposed
--color-overlay	rgba(0,0,0,.35) over video so white text stays legible	Proposed
--color-on-media	
#ffffff	Inferred
--color-accent	
#c8a45d (warm brass, a nod to craftsmanship)	Proposed
--color-line	rgba(17,17,17,.12)	Proposed
4.2 Typography [Proposed]

The real fonts are unknown. The pairing below matches the editorial feel.

Display / headlines: a refined serif or high-contrast grotesque, e.g. "Playfair Display" or "Cormorant Garamond", weight 400 to 500, tight leading (1.05 to 1.15).
UI / body: a neutral sans, e.g. "Inter" or "DM Sans", 400 and 500.
Scale (desktop): eyebrow 12 to 13px uppercase, letter-spacing .14em; statement headline clamp(32px, 4.2vw, 64px); body 16 to 18px with 1.6 line height; counter and loader numerals use a large display size.
Measure: body paragraphs capped around 60 to 70ch.
4.3 Spacing and grid [Proposed]
12-column grid, 24px gutters, 5 to 6vw page margins.
Spacing scale: 4, 8, 12, 16, 24, 32, 48, 72, 120.
Chapters are 100vh with text anchored low-left or centered over the video.
4.4 Radius, borders, elevation [Inferred]
Sharp or near-sharp corners (0 to 4px). Architectural, not playful.
No heavy shadows. Separation comes from imagery, whitespace and hairline rules.
5. Components
Component	Spec
Preloader	Full-screen white or black, numeric counter 00 to 100, tagline text, fades or wipes out on ready [Observed content, Inferred motion]
Header	Fixed, transparent over media, logo left, menu toggle and Contact right. Becomes a full-screen or side menu with two-level navigation [Observed content]
Chapter indicator	n/07 counter plus "Scroll to explore" hint, fixed bottom [Observed]
Chapter text block	Eyebrow, statement headline, paragraph, text link with an arrow or underline that animates on hover [Observed structure]
Text link / CTA	Lowercase or sentence-case phrase, underline-draw hover, no filled buttons on the homepage [Inferred]
Image pair	Two offset images with different aspect ratios and a slight parallax [Inferred]
Expert list item	Title plus one-line descriptor, divider rule, numbered or hover-highlight [Observed content]
Sector tile	Image with a caption overlay; hover reveals, zooms or scales the image [Observed content, Inferred hover]
Download block	Two file rows plus a "Download file" action [Observed]
Footer	Minimal, 3 columns: address, nav, legal and credit [Observed]
6. Motion [Inferred]

Immersive Garden is known for WebGL and scroll-choreographed sites, but the exact stack is not confirmed here.

Scroll model: smooth (inertial) scrolling with snap-like chapter transitions, driven by an index (1/07).
Video: muted, looping, autoplay, playsinline, cross-fading between chapters.
Text reveals: line-by-line mask or translate-up on enter; the duplicated headings suggest this technique.
Easing (proposed): cubic-bezier(.16, 1, .3, 1) (expo-out), 0.8 to 1.2s for reveals, 0.3s for hovers.
Reduced motion: disable smooth scroll and reveals under prefers-reduced-motion.
7. Imagery and media [Observed]
Real project footage and photography: interiors, lobbies, data centers, healthcare and retail spaces.
File naming: /assets/video/home-*.mp4, /assets/img/solutions-*.jpg.
Direction: wide, well-lit, architectural shots; people appear sparingly. Avoid stock-looking imagery.
8. Accessibility notes
Keep text over video at 4.5:1 or better using an overlay or gradient.
Provide a poster image and a pause control for the background videos.
Do not disable pinch-zoom (the source's user-scalable=no is an anti-pattern).
Make the menu keyboard-navigable with visible focus rings.
9. Implementation brief (to reproduce the look)
Stack suggestion: Next.js or Astro, GSAP + ScrollTrigger (or Lenis for smooth scroll), <video> elements for chapters, CSS custom properties from section 4.
Build order: tokens, global chrome (header, menu, preloader), chapter layout with video, text reveal utility, Solutions page blocks, footer.
Content: reuse the page structure from section 3 with your own copy and media.
Reverse-engineering checklist (to replace the Proposed values)

Open the site in Chrome, then:

DevTools, Network, filter "CSS" / "Font" / "JS" to get the real stylesheet, font file names and bundle names. File names like *.woff2 give you the font families.
DevTools, Elements, :root: look for CSS custom properties (--…) holding the real palette and spacing.
Computed styles on the h2: read the actual font-family, font-size, line-height, letter-spacing, color.
Sources tab: check for GSAP, Lenis, Three.js or other libraries, and the easing values used.
Wappalyzer (browser extension) to confirm the framework and animation libraries.
Paste the :root block and fonts back to me and I will update sections 4 and 6 to be exact.

Note: copying the exact CSS, fonts, videos or images would infringe the agency's and client's work. Use this as a reference for structure and feel, and build with your own assets.