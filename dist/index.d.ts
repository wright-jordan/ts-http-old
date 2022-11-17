/// <reference types="node" />
/// <reference types="node" />
import http from "http";
export interface Context {
}
export interface Handler {
    (req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
export interface Middleware<UseOptions extends Record<string, unknown> = {}> {
    use(next: Handler, opts?: UseOptions): Handler;
}
export declare type Routes = Record<string, Handler>;
export declare function Router(routes: Routes, defaultRoute: Handler): Handler;
declare class PayloadTooLargeError extends Error {
    constructor();
}
/**
 * @throws {@link PayloadTooLargeError}
 * @throws `unknown`
 */
declare function read(req: http.IncomingMessage, options?: {
    maxBytes: number;
}): Promise<Buffer>;
export declare const errors: {
    PayloadTooLargeError: typeof PayloadTooLargeError;
};
export declare const util: {
    read: typeof read;
};
export {};
