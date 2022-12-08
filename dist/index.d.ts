/// <reference types="node" />
/// <reference types="node" />
import type http from "http";
export interface Context {
}
export interface Handler {
    (req: http.IncomingMessage, res: http.ServerResponse, ctx: Context): Promise<void>;
}
export declare function Router(routes: Map<string, Handler>, defaultHandler: Handler): Handler;
/** Read request body into a utf8 string. */
export declare function readString(req: AsyncIterable<Buffer>): Promise<[str: string, err: unknown]>;
