import {readFile} from "node:fs/promises";
import path from "node:path";

export async function GET(_request, {params}) {
  const segments = (await params).path || [];
  const requested = segments.join("/");
  if (!requested.startsWith("vendor/shopify-s26/remote/")) {
    return new Response("Invalid pointcloud path", {status:400});
  }
  const publicRoot = path.resolve(process.cwd(), "public");
  const candidates = [
    requested,
    requested.replace(/\.(?:mdpc|bin)$/, "")
  ];
  for (const relative of [...new Set(candidates)]) {
    const filename = path.resolve(publicRoot, ...relative.split("/"));
    if (!filename.startsWith(`${publicRoot}${path.sep}`)) {
      return new Response("Invalid pointcloud path", {status:400});
    }
    try {
      return new Response(await readFile(filename), {
        headers:{
          "content-type":"application/octet-stream",
          "cache-control":"public, max-age=31536000, immutable"
        }
      });
    } catch {
      // Try the append-style URL used by older pointcloud loaders.
    }
  }
  return new Response("Pointcloud not found", {status:404});
}
