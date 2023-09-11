import { connection as sql } from '../db/db'
import { RestauantInterface } from '../types/Restauant'


export const create = (newRestaurant: RestauantInterface) => sql.query(
    `INSERT INTO se_database.Restaurant (id, name, type, imageUrl) VALUES (NULL,'${newRestaurant.name}','${newRestaurant.type}','${newRestaurant.imgUrl}')`,
    (error, results, fields) => {
        if (error) throw error;
        return true;
    })
export const getAll = () => sql.query(
    "SELECT * FROM `se_database.Restaurant` WHERE 1",
    (error, results, fields) => {
        if (error) throw error;
    
        // console.log(stringify(results) );
        return results
    })