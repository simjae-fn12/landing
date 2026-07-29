# Runtime Mirroring Gates

## Completion gates

- R1: Original iframe or screenshots only.
- R2: SSR HTML and JS/CSS module graph local.
- R3: All models, textures, videos, fonts, Workers, and WASM local.
- R4: Original API/CMS dependencies replaced or isolated.
- R5: Content and scene configuration editable locally.
- R6: Works with internet access disabled.
- R7: Desktop/mobile frame comparison and all interactions verified.

Only R6+R7 is a completed local clone.

## Diagnostic routing

- External `/vendor/` URL or module CORS: remove external `<base>` and inspect rewritten module paths.
- Black canvas with initial particles: inspect failed module, Worker, WASM, texture, and loading-store requests.
- Original 500 scene: runtime route or data loader is resolving against the wrong origin.
- Text unchanged: find split-character arrays, SDF glyph data, canvas textures, shader uniforms, or image-based copy.
- Hero correct but later sections wrong: enumerate scene registry and asset mapping for every section.
- localhost works but LAN fails: remove host-bound URLs and verify Workers/assets through the LAN origin.
