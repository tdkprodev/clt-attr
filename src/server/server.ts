import * as express from 'express';
import * as bodyParser from "body-parser";

import { Request, Response } from "express";
// import { createConnection } from "typeorm";
import { resolve } from 'path';

// import { User } from "@server/model";
import { Logger } from '@shared/logger';
import { router } from '@server/rest';
import { config } from '@shared/config';

import * as debug from 'debug';


const bug = debug('server');
/** Instantiate and initialize Logger
 * 
 * Set the namespace prefix to 'clt-attr'
 */
Logger.setNamespacePrefix('clt-attr:');

const log = new Logger('server/index');
log.info('Logger initialized');

/** Instantiate an express app
 * 
 */
const app = express();
app.use(express.static('/public'));
app.use(express.static('src/public'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/rest', router);

app.get(
  [
    '/login',
    '/forgot-password',
    '/instructions-sent',
    '/reset-password/:token',
    '/signup',
  ],
  (request: Request, response: Response) => {
    response.sendFile(resolve('public/login.html'));
  },
);

app.all('*', (request: Request, response: Response) => {
  response.sendFile(resolve('public/index.html'));
});

/** Listen for request on specified port from config.PORT
 * 
 * Close the server if --test-only flag was specified.
 */
const server = app.listen(config.PORT, () => {
  log.info(`Listening on port ${config.PORT}`);

  bug('adsfasdfasdfasdf');

  if (process.argv.indexOf('--test-only') !== -1) {
    console.log('fooobar');
    log.info('Found flag --test-only, so closing the server');
    server.close();
  }

  console.log(`Listening on port ${config.PORT}`);
});
