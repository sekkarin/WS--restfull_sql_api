"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_controller_1 = require("../controllers/authentication.controller");
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
exports.default = (router) => {
    router.get("/auth/logout", verifyJWT_1.default, authentication_controller_1.logout);
    router.get("/auth/refreshToken", authentication_controller_1.refreshToken);
    router.post("/auth/login", authentication_controller_1.login);
    router.post("/auth/register", authentication_controller_1.register);
};
