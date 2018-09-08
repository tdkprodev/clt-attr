import * as Api from '@api/index';
import * as UserEndPoint from '@api/user/user-server';

import { Router, Request, Response } from 'express';
import { Logger } from '@shared/logger';

export {
  UserEndPoint,
};

/** Instantiate and initailize Logger` */
const log = new Logger('server/rest');
log.info('Logger initialized');

/** Export the router to handle the rest api to be imported by server.ts */
export const router = Router();
router.use(Api.router);

/** 404 handler */
router.all('*', (request: Request, response: Response) => {
  const message = `The requested endpoint "${request.method}: ${request.path}" does not exist`;

  log.info(message);
  response.send({
    error: message,
    success: false,
  });

});


