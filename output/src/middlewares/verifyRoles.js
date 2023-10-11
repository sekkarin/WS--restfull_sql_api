"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoles = void 0;
require("dotenv").config();
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles)
            return res.sendStatus(403);
        const result = req.roles
            .map((role) => allowedRoles.includes(role))
            .find((value) => value == true);
        if (!result)
            return res.sendStatus(401);
        return next();
    };
};
exports.verifyRoles = verifyRoles;
