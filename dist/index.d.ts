/// <reference types="node" />
import type http from "http";
export interface Context {
}
export interface InjectableHandler<T extends Record<string, unknown>> {
    (dependencies: T): Handler;
}
export interface Handler {
    (req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
export interface Middleware<UseOptions extends Record<string, unknown> = {}> {
    use(next: Handler, opts?: UseOptions): Handler;
}
export type Routes = Record<string, Handler>;
export declare function Router(routes: Routes, defaultRoute: Handler): Handler;
import { PayloadTooLargeError } from "./errors.js";
export declare const errors: {
    PayloadTooLargeError: typeof PayloadTooLargeError;
};
import { read } from "./util.js";
export declare const util: {
    read: typeof read;
};
