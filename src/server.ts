import * as bodyParser from "body-parser";
import * as express from 'express';
import { Request, Response } from "express";

// create and setup express app
const app = express();
app.use(bodyParser.json());

// register routes
app.get("/users", (req: Request, res: Response) => {
  // here we will have logic to return all users
});

app.get("/users/:id", (req: Request, res: Response) => {
  // here we will have logic to return user by id
});

app.post("/users", (req: Request, res: Response) => {
  // here we will have logic to save a user
});

app.put("/users/:id", (req: Request, res: Response) => {
  // here we will have logic to update a user by a given user id
});

app.delete("/users/:id", (req: Request, res: Response) => {
  // here we will have logic to delete a user by a given user id
});


app.get("/", (req: Request, res: Response) => {
  res.send("Awesome! We're live debugging this!");
});

app.listen(8000, () => console.log("Server running on 8000!"));



