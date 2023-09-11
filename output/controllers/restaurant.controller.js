"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRetuarantById = exports.updateRetuarantById = exports.getRetuarantById = exports.getRetuarants = exports.inserRetuarants = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const db_1 = require("../db/db");
const inserRetuarants = (req, res) => {
    const newRestaurants = (0, restaurant_model_1.create)({
        type: req.body.type,
        imgUrl: req.body.imgUrl,
        name: req.body.name,
    });
    if (newRestaurants) {
        res.status(200).json({ message: "insert Successfully" });
    }
};
exports.inserRetuarants = inserRetuarants;
// INSERT INTO se_database.Restaurant
// (id, name, `type`, imageUrl, createdAt)
// VALUES(0, '', '', '', CURRENT_TIMESTAMP(3));
const getRetuarants = (req, res) => {
    db_1.connection.query("SELECT * FROM `se_database.Restaurant` WHERE 1", (error, results, fields) => {
        if (error) {
            res.status(200).json({ error: error.stack });
            throw error;
        }
        res.status(200).json({ message: "insert Successfully", "restuants": results });
    });
};
exports.getRetuarants = getRetuarants;
const getRetuarantById = (req, res) => {
    const { id } = req.params;
    db_1.connection.query("SELECT * FROM `se_database.Restaurant` WHERE id = ?", [id], (error, results, fields) => {
        if (error) {
            res.status(200).json({ error: error.stack });
            throw error;
        }
        res.status(200).json({ message: "insert Successfully", "restuants": results });
    });
};
exports.getRetuarantById = getRetuarantById;
const updateRetuarantById = (req, res) => {
    const { id } = req.params;
    const { name, type, imgUrl } = req.body;
    // UPDATE `restaurant` SET `name` = 'ken', `type` = '123', `imgUrl` = '123' WHERE `restaurant`.`id` = 4;
    db_1.connection.query("UPDATE `se_database.Restaurant` SET `name` = ?, `type` = ?, `imageUrl` = ? WHERE `restaurant`.`id` = ?", [name, type, imgUrl, id], (error, results, fields) => {
        if (error) {
            res.status(200).json({ error: error.stack });
            throw error;
        }
        if (results.affectedRows == 0) {
            throw new Error("not_found");
        }
        res.status(200).json({ message: results.message });
    });
};
exports.updateRetuarantById = updateRetuarantById;
const deleteRetuarantById = (req, res) => {
    const { id } = req.params;
    db_1.connection.query("DELETE FROM `se_database.Restaurant` WHERE `restaurant`.`id` = ?", [id], (error, results, fields) => {
        if (error) {
            res.status(403).json({ error: error.stack });
        }
        if (results.affectedRows == 0) {
            res.status(400).json({ error: "can't delete id " + id });
        }
        res.status(200).json({ message: "deleted successfully" });
    });
};
exports.deleteRetuarantById = deleteRetuarantById;
