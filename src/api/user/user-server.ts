import * as joi from 'joi';
import { path } from 'ramda';

import { handleEndpoint, router } from '@api/index';
import { UserRepository } from '@server/repository'; // for user query
import { config } from '@shared/config';
import { Logger } from '@shared/logger';
import {
  create,
  remove,
  list,
  save,
} from '@api/user/user-client';

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





