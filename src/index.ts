import http from "http";

export interface Context {}

export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export interface Middleware<UseOptions extends Record<string, unknown> = {}> {
  use(next: Handler, opts?: UseOptions): Handler;
}

export type Routes = Record<string, Handler>;

export function Router(routes: Routes, defaultRoute: Handler): Handler {
  return async function router(req, res, ctx) {
    await (routes[req.url!.split("?", 1)[0]!] || defaultRoute)(req, res, ctx);
  };
}

class PayloadTooLargeError extends Error {
  constructor() {
    super();
  }
}

/**
 * @throws {@link PayloadTooLargeError}
 * @throws `unknown`
 */
async function read(
  req: http.IncomingMessage,
  options: { maxBytes: number } = { maxBytes: 16384 }
) {
  const chunks: Buffer[] = [];
  let bytes = 0;
  for await (const chunk of req as AsyncIterable<Buffer>) {
    bytes += chunk.byteLength;
    if (bytes > options.maxBytes) {
      throw new PayloadTooLargeError();
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export const errors = { PayloadTooLargeError };
export const util = { read };
