import type http from "http";

export interface Context {}

export interface Handler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export function Router(
  routes: Map<string, Handler>,
  defaultHandler: Handler
): Handler {
  return async function router(req, res, ctx) {
    await (routes.get(req.url!.split("?", 1)[0]!) || defaultHandler)(
      req,
      res,
      ctx
    );
  };
}

import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export const errors = { PayloadTooLargeError };

import { read } from "./lib/read/read.js";
export const util = { read };
