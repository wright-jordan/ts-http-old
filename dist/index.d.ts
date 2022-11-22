/// <reference types="node" />
import type http from "http";
export interface Context {
}
export interface Handler {
    handle(req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
export interface Middleware {
    use(next: Handler, opts?: unknown): Handler;
}
export interface Routes {
    [path: string]: Handler;
}
export declare class Router implements Handler {
    #private;
    constructor();
    add(path: string | null, handler: Handler): void;
    handle(req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export declare const errors: {
    PayloadTooLargeError: typeof PayloadTooLargeError;
};
import { read } from "./lib/read/read.js";
export declare const util: {
    read: typeof read;
};
