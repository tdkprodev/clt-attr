// import * as express from 'express';
// import * as bodyParser from "body-parser";

// import { Request, Response } from "express";
// // import { createConnection } from "typeorm";
// import { join, resolve } from 'path';
// // import { User } from "@server/model";
// import { Logger } from '@shared/logger';
// import { router } from '@server/rest';
// import { config } from '@shared/config';


// /** Instantiate and initialize Logger
//  * 
//  * Set the namespace prefix to 'clt-attr'
//  */
// Logger.setNamespacePrefix('clt-attr:');

// const log = new Logger('server/index');
// log.info('Logger initialized');

// /** Instantiate an express app
//  * 
//  */
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/rest', router);
// app.use(express.static(resolve('build')));

// app.get(
//   [
//     '/login',
//     '/forgot-password',
//     '/instructions-sent',
//     '/reset-password/:token',
//     '/signup',
//   ],
//   (request: Request, response: Response) => {
//     response.sendFile(resolve('build/login.html'));
//   },
// );

// app.all('*', (request: Request, response: Response) => {
//   response.sendFile(resolve('build/index.html'));
// });

// /** Listen for request on specified port from config.PORT
//  * 
//  * Close the server if --test-only flag was specified.
//  */
// const server = app.listen(config.PORT, () => {
//   log.info(`Listening on port ${config.PORT}`);
//   console.log(`Listening on port ${config.PORT}`);

//   if (process.argv.indexOf('--test-only') !== -1) {
//     console.log('Found flag --test-only, so closing the server');
//     log.info('Found flag --test-only, so closing the server');
//     server.close();
//     console.log('Server is closed');
//   }
// });





import * as bodyParser from "body-parser";
import * as express from 'express';
import { Request, Response } from "express";

import { createConnection } from "typeorm";
import { User } from "@server/model/User";
import { Logger } from '@shared/logger';

import { dbOptions } from './../../ormconfig';

createConnection(dbOptions).then((connection: any) => {

  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  // register routes
  app.get("/users", async (req: Request, res: Response) => {
    // here we will have logic to return all users

    const users = userRepository.find();
    // res.send(users);
    res.send("app.get('/users')");
    return;
  });

  app.get("/users/:id", (req: Request, res: Response) => {
    // here we will have logic to return user by id
    const user = userRepository.findOne(req.params.id);
    res.send("app.get('/users/:id')");
    return;
  });

  app.post("/users", (req: Request, res: Response) => {


    const a = 'apple';

    console.log('what is a ? ', a);

    // here we will have logic to save a user
    const user = userRepository.create(req.body);
    res.send(user);
    return userRepository.save(user);
  });

  // app.put("/users/:id", (req: Request, res: Response) => {
  //   // here we will have logic to update a user by a given user id
  // });

  app.delete("/users/:id", (req: Request, res: Response) => {
    // here we will have logic to delete a user by a given user id
    return userRepository.remove(req.params.id);
  });


  app.get("/", (req: Request, res: Response) => {
    res.send("Awesome! We're live debugging this!");
  });

  app.listen(9001, () => console.log("Server running on 9001!"));



});

