import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';

import { resolve } from 'path';
import { Request, Response } from "express";

import { Logger } from '@shared/logger';
import { router } from '@server/rest';
import { config } from '@shared/config';

// import { createConnection } from "typeorm"; // Currently implementing differently...No need to use this here. Keeping for legacy.
import './database-connection'; // NEED TO LOOK INTO. DOESN'T WORK YET.

/** 
 * Instantiate and initialize Logger
 * 
 * Set the namespace prefix to 'clt-attr'
 */
Logger.setNamespacePrefix('clt-attr:');

const log = new Logger('server/index');
log.info('Logger initialized');

/** Instantiate an express app */
const app = express();

/** 
 * View engine setup
 * 
 * app.set('views', path.join(__dirname, 'views'));
 * app.set('view engine', 'jade');
 */

/** Specify middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve('build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/rest', router);

/* NICE CONVENTION TO ADAPT 

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
*/

app.get('/saythankyou', (request: Request, response: Response, next) => {
  const a = 'apple';
  const b = 'bat';
  const c = 'cat';
  const d = 'dog';
  const e = 'elephant';
  const f = 'foo';
  const g = 'ganster';
  const h = 'hot';
  const i = 'igloo';
  const j = 'jack';
  const k = 'kelly';
  const l = 'love';
  const m = 'money';
  const n = 'new';
  const o = 'operation';
  const p = 'ping';
  const q = 'quarter';
  const r = 'rat';
  const s = 'singer';
  const t = 'thomas';
  const u = 'umbrella';
  const v = 'vector';
  const w = 'world';
  const x = 'x-ray';
  const y = 'you';
  const z = 'zoo';

  response.send({ value: 'Thank you for peace, thank you for mercy' });
});

app.get(
  [
    '/login',
    '/forgot-password',
    '/instructions-sent',
    '/reset-password/:token',
    '/signup',
  ],
  (request: Request, response: Response, next) => {
    response.sendFile(resolve('build/login.html'));
  },
);

/** Catch all cases */
app.all('*', (request: Request, response: Response, next) => {
  response.sendFile(resolve('build/index.html'));
});

/** 
 * Listen for request on specified port from config.PORT
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
