import { createEndpoint } from '@api/endpoint';
import { PERMISSIONS } from 'shared/permissions';
import { IUser, ISanitizedUser } from '@shared/user';

/* AUTH -- IMPLEMENT LATER */

/** CRUD 
 * 
 * login 
 * signup
 * remove
 * save
 * 
 * export const action = createEndpoint<
 *  TBody,
 *  TResponse
 * >()(options);
 */
export const login = createEndpoint<
  { email: string; password: string },
  { token: string; user: Partial<IUser>}
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'post',
    path: 'user/login',
  });

export const signup = createEndpoint<
  Partial<IUser>,
  { user: Partial<IUser>; token: string }
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'delete',
    path: 'user/delete',
  });