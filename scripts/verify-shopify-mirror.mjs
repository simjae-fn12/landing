import {access, readFile, readdir} from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/vendor/shopify-s26");
const assets = path.join(root, "assets");
const html = await readFile(path.join(root, "index.html"), "utf8");
const files = new Set(await readdir(assets));
const failures = [];

if (/<base\s+href=["']https?:\/\//i.test(html)) {
  failures.push("External <base> found");
}
if (/cdn\.shopify\.com\/oxygen-v2/i.test(html)) {
  failures.push("External Oxygen runtime URL found");
}

const localRefs = [...html.matchAll(/\/vendor\/shopify-s26\/assets\/([^"'?# <]+)/g)]
  .map(match => decodeURIComponent(match[1]));
for (const filename of localRefs) {
  if (!files.has(filename)) failures.push(`Missing HTML asset: ${filename}`);
}

for (const filename of [...files].filter(name => name.endsWith(".js"))) {
  const source = await readFile(path.join(assets, filename), "utf8");
  for (const match of source.matchAll(/(?:from\s*|import\s*\()\s*["']\.\/([^"']+)["']/g)) {
    const dependency = match[1].split(/[?#]/)[0];
    try {
      await access(path.join(assets, dependency));
    } catch {
      failures.push(`Missing JS dependency: ${filename} -> ${dependency}`);
    }
  }
}

const uniqueFailures = [...new Set(failures)];
console.log(JSON.stringify({
  assets: files.size,
  localHtmlReferences: localRefs.length,
  externalOxygenReferences: (html.match(/cdn\.shopify\.com\/oxygen-v2/g) || []).length,
  failures: uniqueFailures
}, null, 2));

if (uniqueFailures.length) process.exitCode = 1;
