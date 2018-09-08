import "reflect-metadata";
import { ConnectionOptions } from "typeorm";

export let dbOptions: ConnectionOptions = {
  database: "clt",
  entities: [
    "./src/server/entities/*.ts"
  ],
  host: "localhost",
  password: "root",
  port: 3306,
  synchronize: true,
  type: "mysql",
  username: "root",
}