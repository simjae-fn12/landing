import {createHash} from "node:crypto";
import {access, readFile, readdir, stat} from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/vendor/shopify-s26");
const assets = path.join(root, "assets");
const html = await readFile(path.join(root, "index.html"), "utf8");
const failures = [];
const runtimeAssetExtensions = new Set([
  ".avif", ".bin", ".css", ".drc", ".exr", ".gif", ".glb", ".gltf", ".hdr",
  ".jpeg", ".jpg", ".js", ".json", ".ktx2", ".mdpc", ".mjs", ".mp3", ".mp4",
  ".ogg", ".otf", ".png", ".riv", ".svg", ".ttf", ".txt", ".wasm", ".webm",
  ".webp", ".woff", ".woff2"
]);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".mjs", ".svg", ".txt"]);

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(filename));
    else output.push(filename);
  }
  return output;
}

function externalRuntimeUrls(text) {
  const output = new Set();
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>\\)]+/g)) {
    try {
      const url = new URL(match[0].replaceAll("&amp;", "&").replace(/[),.;]+$/g, ""));
      if (runtimeAssetExtensions.has(path.extname(url.pathname).toLowerCase())) output.add(url.href);
    } catch {}
  }
  return output;
}

function localVendorReferences(text) {
  return [...text.matchAll(/\/vendor\/shopify-s26\/([^"'`?#& <,\\]+)/g)]
    .map(match => decodeURIComponent(match[1])
      .replace(/\)format\($/, "")
      .replace(/[\])}]+$/, ""));
}

if (/<base\s+href=["']https?:\/\//i.test(html)) failures.push("External <base> found");
if (/cdn\.shopify\.com\/oxygen-v2/i.test(html)) failures.push("External Oxygen runtime URL found");
if (/shopify-upstream/i.test(html)) failures.push("Upstream proxy reference found in HTML");

const allFiles = await walk(root);
const textFiles = allFiles.filter(filename =>
  textExtensions.has(path.extname(filename).toLowerCase()) &&
  path.basename(filename) !== "remote-manifest.json"
);
const localReferences = new Set();
const remoteRuntimeReferences = new Set();

for (const filename of textFiles) {
  const source = await readFile(filename, "utf8");
  for (const reference of localVendorReferences(source)) localReferences.add(reference);
  for (const reference of externalRuntimeUrls(source)) remoteRuntimeReferences.add(reference);
  if (/shopify-upstream/i.test(source)) {
    failures.push(`Upstream proxy reference found: ${path.relative(root, filename)}`);
  }
  if (/cdn\.shopify\.com\/oxygen-v2/i.test(source)) {
    failures.push(`External Oxygen reference found: ${path.relative(root, filename)}`);
  }
}

for (const reference of localReferences) {
  try {
    await access(path.join(root, ...reference.split("/")));
  } catch {
    failures.push(`Missing local vendor reference: ${reference}`);
  }
}

const assetFiles = new Set(await readdir(assets));
for (const filename of [...assetFiles].filter(name => name.endsWith(".js"))) {
  const source = await readFile(path.join(assets, filename), "utf8");
  for (const match of source.matchAll(/(?:from\s*|import\s*\()\s*["']\.\/([^"']+)["']/g)) {
    const dependency = match[1].split(/[?#]/)[0];
    if (!assetFiles.has(dependency)) failures.push(`Missing JS dependency: ${filename} -> ${dependency}`);
  }
}

const manifestPath = path.join(root, "remote-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
for (const asset of manifest.assets) {
  const filename = path.join(root, ...asset.local.replace(/^\/vendor\/shopify-s26\//, "").split("/"));
  try {
    const fileStat = await stat(filename);
    if (fileStat.size !== asset.size) failures.push(`Size mismatch: ${asset.local}`);
    const bytes = await readFile(filename);
    const digest = createHash("sha256").update(bytes).digest("hex");
    if (digest !== asset.sha256) failures.push(`Hash mismatch: ${asset.local}`);
  } catch {
    failures.push(`Missing manifest asset: ${asset.local}`);
  }
}

for (const reference of remoteRuntimeReferences) failures.push(`External runtime asset: ${reference}`);
if (manifest.missing.length) failures.push(`Remote placeholders remain: ${manifest.missing.length}`);

const uniqueFailures = [...new Set(failures)];
console.log(JSON.stringify({
  stageTarget:"R6",
  files:allFiles.length,
  oxygenAssets:assetFiles.size,
  mirroredRemoteAssets:manifest.assets.length,
  localVendorReferences:localReferences.size,
  externalRuntimeReferences:remoteRuntimeReferences.size,
  proxyReferences:textFiles.filter(filename => filename.includes("shopify-upstream")).length,
  failures:uniqueFailures
}, null, 2));

if (uniqueFailures.length) process.exitCode = 1;
