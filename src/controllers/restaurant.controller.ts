import { Response, Request } from 'express'
import { create, getAll } from '../models/restaurant.model'
import { connection as sql } from '../db/db'

export const inserRetuarants = (req: Request, res: Response) => {
    const newRestaurants = create({
        type: req.body.type,
        imgUrl: req.body.imgUrl,
        name: req.body.name,
    })
    if (newRestaurants) {

        res.status(200).json({ message: "insert Successfully" })
    }
}
// INSERT INTO se_database.Restaurant
// (id, name, `type`, imageUrl, createdAt)
// VALUES(0, '', '', '', CURRENT_TIMESTAMP(3));
export const getRetuarants = (req: Request, res: Response) => {
    sql.query(
        "SELECT * FROM `se_database.Restaurant` WHERE 1",
        (error, results, fields) => {
            if (error) {
                res.status(200).json({ error: error.stack })
                throw error
            }
            res.status(200).json({ message: "insert Successfully", "restuants": results })
        })
}
export const getRetuarantById = (req: Request, res: Response) => {
    const { id } = req.params
    sql.query(
        "SELECT * FROM `se_database.Restaurant` WHERE id = ?", [id],
        (error, results, fields) => {
            if (error) {
                res.status(200).json({ error: error.stack })
                throw error
            }
            res.status(200).json({ message: "insert Successfully", "restuants": results })
        })
}
export const updateRetuarantById = (req: Request, res: Response) => {
    const { id } = req.params
    const { name, type, imgUrl } = req.body
    // UPDATE `restaurant` SET `name` = 'ken', `type` = '123', `imgUrl` = '123' WHERE `restaurant`.`id` = 4;
    sql.query(
        "UPDATE `se_database.Restaurant` SET `name` = ?, `type` = ?, `imageUrl` = ? WHERE `restaurant`.`id` = ?",
        [name, type, imgUrl, id],
        (error, results, fields) => {
            if (error) {
                res.status(200).json({ error: error.stack })
                throw error
            }
            if (results.affectedRows == 0) {
                throw new Error("not_found")
            }
            res.status(200).json({ message: results.message })
        })
}
export const deleteRetuarantById = (req: Request, res: Response) => {
    const { id } = req.params

    sql.query(
        "DELETE FROM `se_database.Restaurant` WHERE `restaurant`.`id` = ?", [id],
        (error, results, fields) => {
            if (error) {
                res.status(403).json({ error: error.stack })
            }
            if (results.affectedRows == 0) {
                res.status(400).json({ error: "can't delete id " + id })
            }
            res.status(200).json({ message: "deleted successfully" })
        })
}