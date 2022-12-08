import type http from "http";

export interface Context {}

export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export function Router(
  routes: Map<string, Handler>,
  defaultHandler: Handler
): Handler {
  return async function router(req, res, ctx) {
    await (routes.get(req.url!.split("?", 1)[0]!) || defaultHandler)(
      req,
      res,
      ctx
    );
  };
}

/** Read request body into a utf8 string. */
export async function readString(
  req: AsyncIterable<Buffer>
): Promise<[str: string, err: unknown]> {
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    return [Buffer.concat(chunks).toString("utf8"), null];
  } catch (error) {
    return ["", error];
  }
}
