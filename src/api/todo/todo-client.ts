import { createEndpoint } from '@api/endpoint';
import { PERMISSIONS } from 'shared/permissions';
import { ITodo } from '@shared/todo';

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
  { todo: Partial<ITodo> },
  { todo: Partial<ITodo> } | any
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'post',
    path: 'todo/create',
  });

export const remove = createEndpoint<
  never,
  {}
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'delete',
    path: 'todo/delete',
  });

export const list = createEndpoint<
  never,
  { users: ITodo[] }
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'get',
    path: 'todo/list',
  });

export const save = createEndpoint<
  { user: Partial<ITodo> },
  { user: Partial<ITodo> }
  >()({
    permissions: PERMISSIONS.NONE,
    method: 'put',
    path: 'todo/save',
  });