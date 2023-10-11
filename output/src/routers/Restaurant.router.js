"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const verifyRoles_1 = require("../middlewares/verifyRoles");
const roles_1 = require("../enum/roles");
exports.default = (router) => {
    router.get("/restaurants", verifyJWT_1.default, (0, verifyRoles_1.verifyRoles)(roles_1.Roles.EDITOR, roles_1.Roles.USER, roles_1.Roles.ADMIN), restaurant_controller_1.getRestaurants);
    router.get("/restaurants/:id", restaurant_controller_1.getRestaurantById);
    router.put("/restaurants/:id", restaurant_controller_1.updateRestaurantById);
    router.post("/restaurants", restaurant_controller_1.insertRestaurants);
    router.delete("/restaurants/:id", restaurant_controller_1.deleteRestaurantById);
};
