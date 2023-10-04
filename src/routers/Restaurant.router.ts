import express, { Router } from 'express';
import {
    deleteRestaurantById,
    getRestaurantById,
    getRestaurants,
    insertRestaurants,
    updateRestaurantById
} from '../controllers/restaurant.controller';
import verifyJWT from '../middlewares/verifyJWT';
import { verifyRoles } from '../middlewares/verifyRoles';
import { Roles } from '../enum/roles';


export default (router: Router) => {
    router.get('/restaurants',verifyJWT,verifyRoles(Roles.EDITOR,Roles.USER,Roles.ADMIN), getRestaurants)
    router.get('/restaurants/:id', getRestaurantById)
    router.put('/restaurants/:id', updateRestaurantById)
    router.post('/restaurants', insertRestaurants)
    router.delete('/restaurants/:id', deleteRestaurantById)
}