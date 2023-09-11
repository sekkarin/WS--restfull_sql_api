"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_controller_1 = require("../controllers/restaurant.controller");
exports.default = (router) => {
    router.get('/restaurants', restaurant_controller_1.getRetuarants);
    router.get('/restaurants/:id', restaurant_controller_1.getRetuarantById);
    router.put('/restaurants/:id', restaurant_controller_1.updateRetuarantById);
    router.post('/restaurants', restaurant_controller_1.inserRetuarants);
    router.delete('/restaurants/:id', restaurant_controller_1.deleteRetuarantById);
};
