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


export default (router: Router) => {
    
    
    router.get('/restaurants',verifyJWT,verifyRoles, getRestaurants)
    router.get('/restaurants/:id', getRestaurantById)
    router.put('/restaurants/:id', updateRestaurantById)
    router.post('/restaurants', insertRestaurants)
    router.delete('/restaurants/:id', deleteRestaurantById)
}