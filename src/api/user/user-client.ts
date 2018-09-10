import { createEndpoint } from '@api/endpoint';
import { PERMISSIONS } from 'shared/permissions';
import { IUser } from '@shared/user';

/* AUTH -- IMPLEMENT LATER */

/** CRUD 
 * 
 * create
 * remove
 * list
 * save
 * 
 * export const action = createEndpoint<
 *  TBody,
 *  TResponse
 * >()(options);
 */
export const create = createEndpoint<
  { user: Partial<IUser> },
  { user: Partial<IUser> } | any
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'post',
    path: 'user/create',
  });

export const remove = createEndpoint<
  never,
  {}
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'delete',
    path: 'user/delete',
  });

export const list = createEndpoint<
  never,
  { users: IUser[] }
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'get',
    path: 'user/list',
  });

export const save = createEndpoint<
  { user: Partial<IUser> },
  { user: Partial<IUser> }
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'put',
    path: 'user/save',
  });