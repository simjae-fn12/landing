function response() {
  return Response.json({ok:true}, {
    headers:{"cache-control":"no-store"}
  });
}

export const GET = response;
export const POST = response;
