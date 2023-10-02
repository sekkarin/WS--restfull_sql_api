import jwt from "jsonwebtoken";
require("dotenv").config();
import { Response, Request, NextFunction } from "express";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);
  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY_ACCESS_TOKEN as string,
    (error, decoded) => {
      // invalid token
      if (error) {
        return res.sendStatus(403);
      }
      if (typeof decoded !== "undefined" && typeof decoded !== "string") {
        req.user = decoded.info;
        req.roles = decoded.roles;
      }
      next();
    }
  );
};

export default verifyJWT;
