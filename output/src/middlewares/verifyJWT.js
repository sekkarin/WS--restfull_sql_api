"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN, (error, decoded) => {
        // invalid token
        if (error) {
            return res.sendStatus(403);
        }
        if (typeof decoded !== "undefined" && typeof decoded !== "string") {
            req.user = decoded.info;
            req.roles = decoded.roles;
        }
        next();
    });
};
exports.default = verifyJWT;
