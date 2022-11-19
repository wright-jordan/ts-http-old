import type http from "http";

export interface Context {}

export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export interface Middleware<UseOptions extends Record<string, unknown> = {}> {
  use(next: Handler, opts?: UseOptions): Handler;
}

export type Routes = Record<string, Handler>;

export function Router(routes: Routes, defaultRoute: Handler): Handler {
  return async function router(req, res, ctx) {
    await (routes[req.url!.split("?", 1)[0]!] || defaultRoute)(req, res, ctx);
  };
}

import { PayloadTooLargeError } from "./errors.js";
export const errors = { PayloadTooLargeError };

import { read } from "./util.js";
export const util = { read };
