import * as bodyParser from "body-parser";
import * as express from 'express';
import { Request, Response } from "express";

import { createConnection } from "net";
import { User } from "./entities/User";

import { dbOptions } from '../app-config';

createConnection(dbOptions).then((connection: any) => {
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  // register routes
  app.get("/users", async (req: Request, res: Response) => {
    // here we will have logic to return all users
    return userRepository.find();
  });

  app.get("/users/:id", (req: Request, res: Response) => {
    // here we will have logic to return user by id
    return userRepository.findOne(req.params.id);
  });

  app.post("/users", (req: Request, res: Response) => {
    // here we will have logic to save a user
    const user = userRepository.create(req.body);
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

