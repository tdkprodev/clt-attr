/*
  THIS CONFIGURATION IS CURRENTLY NOT BEING USED. 

  TypeORM is beging connected in /src/shared/connections/database.ts
*/
import "reflect-metadata";
import { ConnectionOptions } from "typeorm";

export let dbOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "clt",
  entities: [
    "./src/server/model/*.ts"
  ],
  synchronize: true,
  logging: true
}