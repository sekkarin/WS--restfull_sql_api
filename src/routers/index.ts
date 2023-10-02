import { Router } from "express";
import restaurantRouter from "./restaurant.router";
import authenticationRouter from "./authentication.route";
const router = Router();
export default (): Router => {
  restaurantRouter(router);
  authenticationRouter(router);
  return router;
};
