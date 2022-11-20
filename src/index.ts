import type http from "http";

export interface Context {}

export interface Injectable<D, E> {
  (deps: D): E;
}

export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export interface Middleware {
  use(next: Handler, opts?: any): Handler;
}

export type Routes = Record<string, Handler>;

export function Router(routes: Routes, defaultRoute: Handler): Handler {
  return async function router(req, res, ctx) {
    await (routes[req.url!.split("?", 1)[0]!] || defaultRoute)(req, res, ctx);
  };
}

import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export const errors = { PayloadTooLargeError };

import { read } from "./lib/read/read.js";
export const util = { read };
