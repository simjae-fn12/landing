import {readFile} from "node:fs/promises";
import path from "node:path";

export async function GET(_request, {params}) {
  const {slug} = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) return new Response("Invalid Rive fixture", {status:400});
  try {
    const filename = path.join(
      process.cwd(),
      "public",
      "vendor",
      "shopify-s26",
      "fixtures",
      "rive",
      `${slug}.json`
    );
    return new Response(await readFile(filename), {
      headers:{
        "content-type":"application/json; charset=utf-8",
        "cache-control":"public, max-age=31536000, immutable"
      }
    });
  } catch {
    return new Response("Rive fixture not found", {status:404});
  }
}
