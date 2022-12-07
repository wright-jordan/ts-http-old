import type http from "http";
import { PayloadTooLargeError } from "./read.errors.js";

export async function read(
  req: http.IncomingMessage,
  options: { maxBytes: number } = { maxBytes: 16384 }
): Promise<[buf: Buffer | null, err: PayloadTooLargeError | unknown | null]> {
  try {
    if (
      req.headers["content-length"] &&
      Number(req.headers["content-length"]) > options.maxBytes
    ) {
      req.destroy();
      return [null, new PayloadTooLargeError()];
    }
    const chunks: Buffer[] = [];
    let bytes = 0;
    for await (const chunk of req as AsyncIterable<Buffer>) {
      bytes += chunk.byteLength;
      if (bytes > options.maxBytes) {
        req.destroy();
        return [null, new PayloadTooLargeError()];
      }
      chunks.push(chunk);
    }
    return [Buffer.concat(chunks), null];
  } catch (error) {
    return [null, error];
  }
}
