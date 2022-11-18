import http from "http";
import { PayloadTooLargeError } from "./errors.js";

/**
 * @throws {@link PayloadTooLargeError}
 * @throws `unknown`
 */
export async function read(
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
