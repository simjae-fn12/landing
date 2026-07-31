import {readFile} from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const filename = path.join(
      process.cwd(),
      "public",
      "vendor",
      "shopify-s26",
      "fixtures",
      "merch.data"
    );
    return new Response(await readFile(filename), {
      headers:{
        "content-type":"text/x-script; charset=utf-8",
        "cache-control":"public, max-age=31536000, immutable"
      }
    });
  } catch {
    return new Response("Merch fixture not found", {status:404});
  }
}
