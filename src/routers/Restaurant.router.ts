import express, { Router } from 'express';
import {
    deleteRetuarantById,
    getRetuarantById,
    getRetuarants,
    inserRetuarants,
    updateRetuarantById
} from '../controllers/restaurant.controller';


export default (router: Router) => {
    router.get('/restaurants', getRetuarants)
    router.get('/restaurants/:id', getRetuarantById)
    router.put('/restaurants/:id', updateRetuarantById)
    router.post('/restaurants', inserRetuarants)
    router.delete('/restaurants/:id', deleteRetuarantById)
}