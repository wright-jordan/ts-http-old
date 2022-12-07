import { PayloadTooLargeError } from "./read.errors.js";
export async function read(req, options = { maxBytes: 16384 }) {
    try {
        if (req.headers["content-length"] &&
            Number(req.headers["content-length"]) > options.maxBytes) {
            req.destroy();
            return [null, new PayloadTooLargeError()];
        }
        const chunks = [];
        let bytes = 0;
        for await (const chunk of req) {
            bytes += chunk.byteLength;
            if (bytes > options.maxBytes) {
                req.destroy();
                return [null, new PayloadTooLargeError()];
            }
            chunks.push(chunk);
        }
        return [Buffer.concat(chunks), null];
    }
    catch (error) {
        return [null, error];
    }
}
