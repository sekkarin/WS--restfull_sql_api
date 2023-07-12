import mysql from 'mysql';
import { config } from '../config/db';
export const connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });