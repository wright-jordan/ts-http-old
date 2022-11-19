import { PayloadTooLargeError } from "./read.errors.js";
/**
 * @throws {@link PayloadTooLargeError}
 * @throws `unknown`
 */
export async function read(req, options = { maxBytes: 16384 }) {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of req) {
        bytes += chunk.byteLength;
        if (bytes > options.maxBytes) {
            throw new PayloadTooLargeError();
        }
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}
