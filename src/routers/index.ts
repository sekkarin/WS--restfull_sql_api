import { Router } from "express";
import RestaurantRouter from "./Restaurant.router";
const router = Router()
export default ():Router =>{
    RestaurantRouter(router)
    return router;
}