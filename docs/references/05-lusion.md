# 05 — NEXT Securities / Lusion Study

## Integration

- Current route: `/concepts/lusion`
- Static runtime: `/legacy/lusion/index.html`
- Original workspace: `C:\Users\hwlee\Desktop\design-main\apps\lusion-recreation`
- Integration type: production Vite bundle in a same-origin full-viewport iframe

## Preserved implementation

- The existing TypeScript, Three.js and GSAP implementation was built with the `/legacy/lusion/` base path.
- The astronaut GLB is served locally from `/legacy/lusion/models/astronaut.glb`.
- Hero, intro, reel, services, pinned tunnel journey, CTA and footer remain part of the imported full landing page.
- The fixed canvas, scroll-driven WebGL scenes, split text motion, magnetic controls and overlay interactions are retained.
- A small fixed `CONCEPT INDEX` control is provided by the outer Next.js route.

## Verification

- LAN route, legacy document and astronaut model return HTTP 200.
- The embedded document reports one active canvas.
- The main Next.js production build succeeds with both new routes.

## Future calibration rule

Do not treat the hero as the whole reference. Verify every section at multiple scroll checkpoints, including sticky ownership, canvas scene hand-off, absolute overlays, clipping masks, transform origins, camera/model bounds, footer entry and mobile fallbacks.
