/** Create an endpoint using the options passed in
 * 
 * Expose a createEndpoint function that returns a function that takes
 * an options object as parameter and return a new endpoint instance 
 * of the Endpoint class that uses the options to make a request by calling 
 * fetch to the the response and returns it.
 */

import { stringify } from 'querystring';
import { values } from 'ramda';
import { IApiResponse } from './index';

/** Get token from localStorage or return an empty string */
export function getCurrentToken() {
  if (typeof localStorage === 'undefined') return '';
  return localStorage.getItem('token') || '';
}

export interface ICallbackOptions {
  body?: any;
  options?: { [key in 'param' | 'query']?: { [key: string]: any } },
  result?: any;
}

export type MethodType = 'post' | 'get' | 'put' | 'delete';
export type TokenMap = { [key: string]: any };
export type ParamsType<T> = { [key in keyof T]: any };

export type EndpointConstructorKeys =
  | 'method'
  | 'formData'
  | 'path'
  | 'permissions'
  | 'query'
  | 'tokens';

/** Endpoint class that takes an options object, make a request and return a response
 * 
 * @param options The options object containing permission, method
 */
export class Endpoint<TBody, TResponse, TTokens extends TokenMap> {
  path: string;
  method: MethodType;
  formData?: boolean;
  permissions: string;
  tokens?: TTokens;
  query?: any;

  /** Parses and returns a token string or empty string */
  get tokenString() {
    if (!this.tokens) return '';
    const tokens = Object.entries(this.tokens).reduce((result, [key, value]) => `:${key}`, {});
    return `/${tokens}`;
  }

  /** constructor */
  constructor(options: Pick<Endpoint<TBody, TResponse, TTokens>, EndpointConstructorKeys>) {
    this.method = options.method;
    this.path = options.path;
    this.permissions = options.permissions;
    this.formData = options.formData;
    this.tokens = options.tokens;
    this.query = options.query;
  }

  async apiCall(
    options?: {} | null,
    body?: TBody,
  ): Promise<IApiResponse<TResponse>> {
    let requestBody;
    const token = getCurrentToken ? getCurrentToken() : '';

  }
}





















