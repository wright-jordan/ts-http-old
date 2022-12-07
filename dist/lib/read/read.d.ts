/// <reference types="node" />
/// <reference types="node" />
import type http from "http";
import { PayloadTooLargeError } from "./read.errors.js";
export declare function read(req: http.IncomingMessage, options?: {
    maxBytes: number;
}): Promise<[buf: Buffer | null, err: PayloadTooLargeError | unknown | null]>;
