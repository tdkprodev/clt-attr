import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';

import { Request, Response } from "express";
// import { createConnection } from "typeorm";
import { resolve } from 'path';

// import { User } from "@server/model";
import { Logger } from '@shared/logger';
import { router } from '@server/rest';
import { config } from '@shared/config';


/** Instantiate and initialize Logger
 * 
 * Set the namespace prefix to 'clt-attr'
 */
Logger.setNamespacePrefix('clt-attr:');

const log = new Logger('server/index');
log.info('Logger initialized');

/** Instantiate an express app */
const app = express();

/** View engine setup
 * app.set('views', path.join(__dirname, 'views'));
 * app.set('view engine', 'jade');
 */

/** Specify middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve('build')));

app.use('/rest', router);

/* NICE CONVENTION TO ADAPT 

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
*/

app.get(
  [
    '/login',
    '/forgot-password',
    '/instructions-sent',
    '/reset-password/:token',
    '/signup',
  ],
  (request: Request, response: Response) => {
    response.sendFile(resolve('build/login.html'));
  },
);

app.all('*', (request: Request, response: Response) => {
  response.sendFile(resolve('build/index.html'));
});

/** Listen for request on specified port from config.PORT
 * 
 * Close the server if --test-only flag was specified.
 */
const server = app.listen(config.PORT, () => {
  log.info(`Listening on port ${config.PORT}`);
  console.log(`Listening on port ${config.PORT}`);

  if (process.argv.indexOf('--test-only') !== -1) {
    console.log('Found flag --test-only, so closing the server');
    log.info('Found flag --test-only, so closing the server');
    server.close();
    console.log('Server is closed');
  }
});
