---
name: clone-reference-runtime
description: Mirror complex reference landing pages into editable local runtimes while preserving SSR DOM, CSS, JavaScript module graphs, WebGL scenes, scroll timelines, models, media, fonts, Workers, and WASM. Use when the user asks to clone, reproduce, copy, localize, or closely match an interactive reference website, especially sites with Three.js, Canvas, shaders, point clouds, sticky sections, or frame-sensitive scroll effects.
---

# Clone Reference Runtime

Read `docs/reference-clone-playbook.md` and create the site record from `docs/reference-site-template.md` before implementation.

## Required workflow

1. Establish the original page as a visual baseline. Treat iframe output as R1 only.
2. Inspect the entire page, not only the hero. Record sections, stacking contexts, sticky ranges, scene keys, and interactions.
3. Prefer runtime mirroring when the original exposes SSR HTML and versioned JS/CSS chunks. Do not invent similar scenes before checking this path.
4. Recursively mirror scripts, styles, imports, dynamic imports, Workers, WASM, fonts, models, textures, videos, and scene data.
5. Preserve URL structure or rewrite every dependency deterministically. Do not add an external `<base>` to a local mirror.
6. Replace remote data loaders with local fixtures. Use a restricted upstream proxy only as an intermediate R4 state.
7. Change content only after the original local runtime works. Preserve scene IDs, scroll registries, and model keys.
8. Patch split-text, SDF, canvas texture, or shader-generated text at its actual generation source.
9. Run the project mirror and verification commands. Build success alone is insufficient.
10. Continue until R6 offline execution and R7 frame/interaction comparison pass, unless the user explicitly requests an earlier stage.

## Mandatory reporting

- State the current R0–R7 stage.
- Report remaining external runtime, media, font, API, and proxy dependencies.
- Never describe an iframe or remote proxy as a completed local clone.
- Never claim fidelity without same-viewport visual comparison.
- Record each failure and prevention rule in the site reference MD.

## Project commands

- Shopify Spring ’26 mirror: `npm run mirror:shopify`
- Shopify mirror verification: `npm run verify:shopify`
- Production build: `npm run build`

Read `references/runtime-mirroring-gates.md` when selecting completion status or diagnosing a mirror that loads only a black screen, 500 page, or partial canvas.
