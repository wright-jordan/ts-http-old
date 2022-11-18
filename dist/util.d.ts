/// <reference types="node" />
/// <reference types="node" />
import http from "http";
/**
 * @throws {@link PayloadTooLargeError}
 * @throws `unknown`
 */
export declare function read(req: http.IncomingMessage, options?: {
    maxBytes: number;
}): Promise<Buffer>;
