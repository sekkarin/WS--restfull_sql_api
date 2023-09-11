import mysql from "mysql";
import { config } from "../config/db";
require("dotenv").config();
export const connection = mysql.createConnection(
  process.env.DATABASE_URL as string
);
