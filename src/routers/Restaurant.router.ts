import express, { Router } from 'express';
import {
    deleteRestaurantById,
    getRestaurantById,
    getRestaurants,
    insertRestaurants,
    updateRestaurantById
} from '../controllers/restaurant.controller';


export default (router: Router) => {
    router.get('/restaurants', getRestaurants)
    router.get('/restaurants/:id', getRestaurantById)
    router.put('/restaurants/:id', updateRestaurantById)
    router.post('/restaurants', insertRestaurants)
    router.delete('/restaurants/:id', deleteRestaurantById)
}