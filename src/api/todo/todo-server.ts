import * as joi from 'joi';
import { path } from 'ramda';

import { handleEndpoint, router } from '@api/index';
// import { TodoRepository } from '@server/repository';
import { Todo } from "@server/model";
import { config } from '@shared/config';
import { Logger } from '@shared/logger';
import {
  create,
  remove,
  list,
  save,
} from '@api/todo/todo-client';

/** Instantiate and initialize Logger for Todo API */
const log = new Logger('api/todo');
log.info('Logger initialized');

export const createUserEndPoint = handleEndpoint(
  create,
  async (body, request) => {

    const validation = joi.validate(
      body.todo,
      joi.object().keys({
        todo: joi.string(),
        priority: joi.number(),
      }),
    );

    /**
     * If joi validation fails, return a success false with failure code.
     * 
     * path is a Ramda method. It retrieve the value at a given path.
     * 
     * First parameter is an array of paths.
     * Second parameter is an object to retrieve the value using the path from.
     * 
     * R.path(['a', 'b'], {a: {b: 2}}); //=> 2
     * R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
     */
    if (validation.error) {
      return {
        success: false,
        code: path(['error', 'details', 0, 'message'], validation),
      }
    }

    /**
     * If joi validation passes, create a new todo with the Todo model.
     * 
     * Todo.merge is native to TypeORM. 
     * 
     * The syntax is for merge is:
     * 
     * Model.merge(modelInstance, validationValueOfSupposedlyObjectFollowingModelInterface)
     */
    const todo = new Todo();
    Todo.merge(todo, validation.value);

    const newTodo = await todo.save();

    log.info({
      action: 'created',
      entity: newTodo,
      type: 'user',
      user: {}, // Should be from Request.user if authis setup
    })

    return {
      success: true,
      todo,
    };
  }
);


