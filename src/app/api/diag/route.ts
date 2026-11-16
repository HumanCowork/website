import { appendFile } from "node:fs/promises";

// Temporary diagnostic sink: receives capability reports from real browsers.
export async function POST(request: Request) {
  try {
    const body = await request.text();
    await appendFile("/tmp/hc-diag.log", `${new Date().toISOString()} ${body}\n`, "utf8");
  } catch {
    // Never break the page because the sink failed.
  }
  return Response.json({ ok: true });
}
