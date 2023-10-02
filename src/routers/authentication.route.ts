import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authentication.controller";

export default (router: Router) => {
  router.get("/auth/logout", logout);
  router.get("/auth/refreshToken", refreshToken);

  router.post("/auth/login", login);
  router.post("/auth/register", register);
};
