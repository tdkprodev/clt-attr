import { Endpoint, ParamsType, TokenMap } from 'api/endpoint';
import { Request, RequestHandler, Response, Router } from 'express';

import { Logger } from 'shared/logger';
import { GROUPS } from 'shared/permissions';

import { User } from 'server/model/User';


/** Instantiate Logger and initialize it with log.info to avoid errors if nothing calls the logger */
const log = new Logger('api/index');
log.info('Logger initialized');

export type ISuccessResponse<T> = { success: true } & T;
export type IFailureResponse = { code: string; success: false };
export type IApiResponse<T> = ISuccessResponse<T> | IFailureResponse;

export const router = Router();

/** Function that handles the endpoint 
 * 
 * @param endpoint
 * @param callback
 * @param middleware? The optional array of middlewares to handle the request
 * 
 * type TokenMap = { [key: string]: any }
 * type ParamsType<T> = { [key in keyof T]: any }
 */
export function handleEndpoint<TBody, TResult, TTokens extends TokenMap>(
  endpoint: Endpoint<TBody, TResult, TTokens>,
  callback: (
    body: TBody,
    request: Request & { user?: User } & { params?: ParamsType<TTokens> },
  ) => Promise<IApiResponse<TResult>>,
  middleware?: RequestHandler[],
) {
  /** Get metadata passed in from endpoint */
  const { method, path, permissions } = endpoint;
  const url = `${path}${endpoint.tokenString}`;

  /** Log the request method and url */
  log.info('Installing method', `[${method.toUpperCase()}] ${url}`);

  /** Declare the path to listen for and the request handler`
   * 
   * router[method](
   *  @param path The url path to listen for
   *  @param middleware? The middlewares to handle the request before passing it to the request handler
   *  @param requestHandler The request handler that will return either a successful response or an error
   * )
   * 
   * Uses the express Router instance to listen for a url path and trigger a request handler that will
   * check for permissions if the permissions was passed in. If the permission is valid, execute the
   * handleEndpoint callback, which will return a response and send that response to the client.
   */
  router[method](
    `/${path}${endpoint.tokenString}`,
    middleware || [],
    async (request: Request, response: Response) => {
      try {
        let user: User | undefined;
        const body: TBody = request.body;
        const [scope, ...stubs] = path.split('/', 2);

        /** Logs the paths and method */
        log.info(`${scope}.${stubs.join('/')} [${method.toUpperCase()}]`);

        /** If a permission path is set we need to check permissions */
        if (permissions) {
          const fromToken = request.header('authorization');
          if (!fromToken) {
            response.send({
              success: false,
              code: 'MISSING_AUTHORIZATION',
            });
            return;
          }

          const tokenUser = await User.fromToken(fromToken);
          if (
            !tokenUser ||
            (tokenUser.groupId !== GROUPS.DEV &&
              (!tokenUser.site || tokenUser.site.deletedAt))
          ) {
            response.send({
              success: false,
              code: 'MISSING_AUTHORIZATION',
            });
            return;
          }

          user = tokenUser;

          /** IMPLEMENT PERMISSIONS LATER
           * 
           * const valid = await Permissions.checkPermissions(
           *  user.groupId,
           *  permissions,
           * );
           */

          const valid = true; // TEMPORARY UNTIL IMPLEMENT PERMISSIONS

          if (!valid) {
            response.send({ success: false, code: 'MISSING_PERMISSION' });
            return;
          }
        } // end of permission check

        /** If the permission paths were set and the code makes it here, await the async callback 
         * passing in the body and merged request with the user info, await for the response
         * and send the response to the client.
         */
        response.send(
          await callback(body, Object.assign(request, { user: user })),
        );
      } catch (error) {
        log.error(error);
        response.send({
          success: false,
          code: `${error}`,
        });
      }
    },
  ); // end express request routing
}
