import type http from "http";

export interface Context {}

export interface Handler {
  handle(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void>;
}

export interface Middleware {
  use(next: Handler, opts?: unknown): Handler;
}

export interface Routes {
  [path: string]: Handler;
}

export class Router implements Handler {
  #routes: Routes = {};
  #defaultHandler: Handler;
  constructor() {
    this.#defaultHandler = new (class DefaultHandler implements Handler {
      async handle(
        _req: http.IncomingMessage,
        res: http.ServerResponse,
        _ctx: Context
      ): Promise<void> {
        res.statusCode = 404;
        res.end();
      }
    })();
  }
  add(path: string | null, handler: Handler): void {
    if (!path) {
      this.#defaultHandler = handler;
      return;
    }

    this.#routes = {
      ...this.#routes,
      [path]: handler,
    };
  }
  async handle(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context
  ): Promise<void> {
    await (
      this.#routes[req.url!.split("?", 1)[0]!] || this.#defaultHandler
    ).handle(req, res, ctx);
  }
}

import { PayloadTooLargeError } from "./lib/read/read.errors.js";
export const errors = { PayloadTooLargeError };

import { read } from "./lib/read/read.js";
export const util = { read };
