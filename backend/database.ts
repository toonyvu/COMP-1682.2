import { Pool } from "pg";

//The Pool is a class that takes an OBJECT, with user, host, database name and password, with the port name (usually 5432)
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "goodrecipes",
  password: "vutuannghia422005",
  port: 5432,
});
