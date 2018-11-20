// Type definitions from express-jwt, modified for aad-jwt

import express = require("express");
import unless = require("express-unless");

export = aadJwt;

declare function aadJwt(options: aadJwt.Options): aadJwt.RequestHandler;
declare namespace aadJwt {
  export type secretType = string | Buffer;
  export type ErrorCode =
    | "revoked_token"
    | "invalid_token"
    | "credentials_bad_scheme"
    | "credentials_bad_format"
    | "credentials_required";
  export interface IsRevokedCallback {
    (
      req: express.Request,
      payload: any,
      done: (err: any, revoked?: boolean) => void
    ): void;
  }
  export interface GetTokenCallback {
    (req: express.Request): any;
  }
  export interface Options {
    userProperty?: string;
    skip?: string[];
    credentialsRequired?: boolean;
    isRevoked?: IsRevokedCallback;
    requestProperty?: string;
    getToken?: GetTokenCallback;
    [property: string]: any;
  }
  export interface RequestHandler extends express.RequestHandler {
    unless: typeof unless;
  }

  export class UnauthorizedError extends Error {
    status: number;
    message: string;
    name: "UnauthorizedError";
    code: ErrorCode;
    inner: { message: string };

    constructor(code: ErrorCode, error: { message: string });
  }
}
declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
