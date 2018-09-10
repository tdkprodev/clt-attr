import * as joi from 'joi';
import { path } from 'ramda';

import { handleEndpoint, router } from '@api/index';
import { UserRepository } from '@server/repository'; // for querying user(s)
import { User } from "@server/model";
import { config } from '@shared/config';
import { Logger } from '@shared/logger';
import {
  create,
  remove,
  list,
  save,
} from '@api/user/user-client';
import { TableBody } from 'material-ui';

/** Instantiate and initialize Logger */
const log = new Logger('api/user');
log.info('Logger initialized');

/* AUTH -- IMPLEMENT LATER */

/** CRUD 
 * 
 * createUserEndpoint
 * removeUserEndpoint
 * listUserEndpoint
 * saveUserEndpoint
 */

/**
 * create is the create endpoint that will be used to get data from to fabricate 
 * the enpoint for express routing to listen for.
 * 
 * The async function is the callback that will be invoked if/when permisions and 
 * joi validation have passed validity. This function is where you want to CRUD.
 */
export const createUserEndPoint = handleEndpoint(
  create,
  async (body, request) => {
    console.log('inside createUserEndpoint');
    console.log('body is ', body);

    const validation = joi.validate(
      body.user,
      joi.object().keys({
        firstName: joi.string(),
        lastName: joi.string(),
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
    console.log('validation.value is ', validation.value);
    console.log('validation is ', validation);
    if (validation.error) {
      return {
        success: false,
        code: path(['error', 'details', 0, 'message'], validation),
      }
    }

    /**
     * If joi validation passes, create a new user with the User model.
     * 
     * User.merge is native to TypeORM. 
     * 
     * The syntax is for merge is:
     * 
     * Model.merge(modelInstance, validationValueOfSupposedlyObjectFollowingModelInterface)
     */
    const user = new User();
    User.merge(user, validation.value);

    const newUser = user.save();
    console.log('newUser is ', newUser);

    log.info({
      action: 'created',
      entity: newUser,
      type: 'user',
      user,
    })

    return {
      success: true,
      user,
    };
  }
);



