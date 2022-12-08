/// <reference types="node" />
/// <reference types="node" />
import type http from "http";
/** Object that can be used to persist data throughout a request. */
export interface Context {
}
/** Function that handles a request.*/
export interface Handler {
    (req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
/** Returns a function that can be called within a {@link http.RequestListener} to lookup handlers. */
export declare function Router(routes: Map<string, Handler>, fallback: Handler): Handler;
/** Read request body into a utf8 string. */
export declare function readString(req: AsyncIterable<Buffer>): Promise<[str: string, err: unknown]>;
