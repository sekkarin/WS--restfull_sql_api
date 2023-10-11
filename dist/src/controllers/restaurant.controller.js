"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantById = exports.updateRestaurantById = exports.getRestaurantById = exports.getRestaurants = exports.insertRestaurants = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageUrl, type } = req.body;
    try {
        if (!name && !imageUrl && !type) {
            res.status(400).json({ message: "not data" });
        }
        yield prisma.restaurant
            .create({
            data: {
                name: name,
                imageUrl: imageUrl,
                type: type,
            },
        })
            .then((result) => {
            res.status(201).json(result);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.insertRestaurants = insertRestaurants;
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.restaurant.findMany().then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRestaurants = getRestaurants;
const getRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(404).json({ message: "Invalid request" });
        }
        yield prisma.restaurant
            .findFirst({
            where: {
                id: parseInt(id),
            },
        })
            .then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRestaurantById = getRestaurantById;
const updateRestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(404).json({ message: "Invalid request" });
        }
        yield prisma.restaurant
            .update({
            where: {
                id: parseInt(id),
            },
            data: req.body,
        })
            .then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateRestaurantById = updateRestaurantById;
const deleteRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.sendStatus(404);
        }
        yield prisma.restaurant
            .delete({
            where: {
                id: parseInt(id),
            },
        })
            .then((result) => {
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteRestaurantById = deleteRestaurantById;
