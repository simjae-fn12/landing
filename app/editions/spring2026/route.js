import {readFile} from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const filename = path.join(process.cwd(), "public", "vendor", "shopify-s26", "index.html");
  const html = await readFile(filename, "utf8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-frame-options": "SAMEORIGIN"
    }
  });
}
