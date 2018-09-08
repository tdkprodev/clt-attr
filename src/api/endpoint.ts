/** Create an endpoint using the options passed in
 * 
 * Expose a createEndpoint function that returns a function that takes
 * an options object as parameter and return a new endpoint instance 
 * of the Endpoint class that uses the options to make a request by calling 
 * fetch to the the response and returns it.
 */

import { stringify } from 'querystring';
import { values } from 'ramda';
import { IApiResponse } from './index'; // import the IApiResponse interface
import { TableBody } from 'material-ui';

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

  /** Function that makes the request to the server api and returns a response
   * 
   * @param options? The options object optionally containing the:  method, path, permissions, formData, tokens, query 
   * @param body? The body passed in -- usually an object or formData
   */
  async apiCall(
    options?: {} | null,
    body?: TBody,
  ): Promise<IApiResponse<TResponse>> {
    let requestBody;
    const token = getCurrentToken ? getCurrentToken() : '';
    if (this.formData) {
      requestBody = body;
    } else if (this.method !== 'get') {
      requestBody = typeof body === 'string' ? body : JSON.stringify(body);
    }

    /** Build parameters and queryString from options passed in if applicable */
    let parameters = '';
    let queryString = '';

    if (options) {
      if ('params' in options) {
        parameters = `/${values((options as any).params || {}).join('/')}`
      }

      if ('query' in options) {
        queryString = `?${stringify((options as any).query)}`;
      }
    }

    /** Configure the headerConfig based on whether a formData was passed in */
    const headerConfig: { [key: string]: string } = {
      Accept: 'application/json',
      Authorization: `${token}`,
    };

    if (!this.formData) {
      headerConfig['Content-Type'] = 'application/json';
    }

    /** Make a request to the server api endpoint based on data passed in  */
    const response = await fetch(
      `/rest/${this.path}${parameters}${queryString}`,
      {
        body: requestBody as any,
        headers: new Headers(headerConfig),
        method: this.method,
      },
    );

    /** Return the response as a json */
    return (await response.json()) as IApiResponse<TResponse>;
  }
}

/** Function that returns a function that takes a parameter options object and returning an
 * instance of an Endpoint class passing in the options object
 * 
 * () => (options) => new Endpoint(options)
 */
export const createEndpoint = <TBody, TResponse>() => <TTokens>(
  options: Pick<Endpoint<TableBody, TResponse, TTokens>, EndpointConstructorKeys>,
) => new Endpoint<TBody, TResponse, TTokens>(options);
