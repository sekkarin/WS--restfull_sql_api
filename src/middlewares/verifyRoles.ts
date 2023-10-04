require("dotenv").config();
import { Response, Request, NextFunction } from "express";

export const verifyRoles = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.roles) return res.sendStatus(403);

    const result = req.roles
      .map((role) => allowedRoles.includes(role))
      .find((value) => value == true);
    if (!result) return res.sendStatus(401);

    return next();
  };
};
