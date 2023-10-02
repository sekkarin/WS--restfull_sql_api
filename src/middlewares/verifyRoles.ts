import jwt from "jsonwebtoken";
require("dotenv").config();
import { Response, Request, NextFunction } from "express";
export const verifyRoles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log();
  const user = req.user;
  const roles = req.roles;
  console.log(user, roles);

  //   const authMiddleware = (roles) => {
  //     return (req,res,next) => {
  //        roles.forEach(role => {
  //          if(["admin", "superadmin"].includes(role)) return next();
  //        })
  //        return res.status(403).json({
  //          message: "Forbidden"
  //        })
  //     }
  //  }
  next();
};
