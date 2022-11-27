/// <reference types="node" />
import type http from "http";
export interface Context {
}
export interface Handler {
    (req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
export declare function Router(routes: Map<string, Handler>, defaultHandler: Handler): Handler;
import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export declare const errors: {
    PayloadTooLargeError: typeof PayloadTooLargeError;
};
import { read } from "./lib/read/read.js";
export declare const util: {
    read: typeof read;
};
