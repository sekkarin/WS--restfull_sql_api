"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_router_1 = __importDefault(require("./restaurant.router"));
const authentication_route_1 = __importDefault(require("./authentication.route"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, restaurant_router_1.default)(router);
    (0, authentication_route_1.default)(router);
    return router;
};
