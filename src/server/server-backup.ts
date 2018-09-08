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

  app.listen(8000, () => console.log("Server running on 8000!"));



});

