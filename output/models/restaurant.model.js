"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.create = void 0;
const db_1 = require("../db/db");
const create = (newRestaurant) => db_1.connection.query(`INSERT INTO Restaurant (id, name, type, imageUrl) VALUES (NULL,'${newRestaurant.name}','${newRestaurant.type}','${newRestaurant.imgUrl}')`, (error, results, fields) => {
    if (error)
        throw error;
    return true;
});
exports.create = create;
const getAll = () => db_1.connection.query("SELECT * FROM `Restaurant` WHERE 1", (error, results, fields) => {
    if (error)
        throw error;
    // console.log(stringify(results) );
    return results;
});
exports.getAll = getAll;
