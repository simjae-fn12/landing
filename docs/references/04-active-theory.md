# 04 — Digital Weather Systems / Active Theory Study

## Integration

- Current route: `/concepts/active-theory`
- Static runtime: `/legacy/active-theory/index.html`
- Original workspace: `C:\Users\hwlee\Desktop\design-main\apps\activetheory-recreation`
- Integration type: same-origin full-viewport iframe

## Preserved implementation

- Original single-page HTML, styling, interaction code and scene timing are retained.
- Ten locally authored GLB assets are served from `/legacy/active-theory/assets/`.
- The WebGL canvas, pointer response, scroll-driven scene changes and page typography run inside the original document without React lifecycle interference.
- A small fixed `CONCEPT INDEX` control is provided by the outer Next.js route.

## Verification

- LAN route and legacy document return HTTP 200.
- The embedded document reports one active canvas.
- Model assets are served locally rather than fetched from the source workspace.

## Future calibration rule

When this concept is refined, compare the original and local render at the same viewport and exact scroll position. Record canvas bounds, camera framing, model scale, typography bounds, sticky duration and z-index transitions before changing values.
