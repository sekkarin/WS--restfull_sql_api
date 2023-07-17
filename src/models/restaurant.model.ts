import { connection as sql } from '../db/db'
import { RestauantInterface } from '../types/Restauant'


export const create = (newRestaurant: RestauantInterface) => sql.query(
    `INSERT INTO restaurant (id, name, type, imgUrl) VALUES (NULL,'${newRestaurant.name}','${newRestaurant.type}','${newRestaurant.imgUrl}')`,
    (error, results, fields) => {
        if (error) throw error;
        return true;
    })
export const getAll = () => sql.query(
    "SELECT * FROM `restaurant` WHERE 1",
    (error, results, fields) => {
        if (error) throw error;
    
        // console.log(stringify(results) );
        return results
    })