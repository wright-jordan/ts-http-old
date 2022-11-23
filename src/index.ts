import type http from "http";

export interface Context {}

export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export interface Injectable<T> {
  (deps?: unknown): T;
}

export interface Middleware {
  use(next: Handler, opts?: unknown): Handler;
}

export interface Routes {
  [path: string]: Handler;
}

export function Router(routes: Routes, defaultHandler: Handler): Handler {
  return async function router(req, res, ctx) {
    await (routes[req.url!.split("?", 1)[0]!] || defaultHandler)(req, res, ctx);
  };
}

import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export const errors = { PayloadTooLargeError };

import { read } from "./lib/read/read.js";
export const util = { read };
