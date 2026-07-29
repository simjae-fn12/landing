const UPSTREAM = "https://www.shopify.com";

async function proxy(request) {
  const incoming = new URL(request.url);
  const targetPath = incoming.searchParams.get("path");
  if (!targetPath?.startsWith("/")) {
    return new Response("Invalid upstream path", {status:400});
  }

  const target = new URL(targetPath, UPSTREAM);
  if (target.origin !== UPSTREAM) {
    return new Response("Invalid upstream origin", {status:400});
  }

  const response = await fetch(target, {
    method: request.method,
    headers: {
      accept: request.headers.get("accept") || "*/*",
      "accept-language": request.headers.get("accept-language") || "ko-KR,ko;q=0.9,en;q=0.8",
      "user-agent": request.headers.get("user-agent") || "Mozilla/5.0"
    },
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
    redirect: "manual",
    cache: "no-store"
  });

  const headers = new Headers(response.headers);
  headers.delete("content-security-policy");
  headers.delete("content-security-policy-report-only");
  headers.delete("set-cookie");
  headers.delete("x-frame-options");
  return new Response(response.body, {status:response.status, headers});
}

export const GET = proxy;
export const POST = proxy;
