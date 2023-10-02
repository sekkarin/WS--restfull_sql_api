import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { Roles } from "../enum/roles";
import "dotenv/config";

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(403);
  }
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        userName: username,
      },
    });
    if (!findUser) return res.sendStatus(403);
    const userRoles = await prisma.userRoles.findMany({
      where: {
        userId: findUser.id,
      },
      select: {
        roleId: true,
      },
    });
    console.log(userRoles);

    const pwdCompare = await bcrypt.compare(password, findUser.password);

    if (!pwdCompare) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        info: {
          userName: findUser.userName,
          id: findUser.id,
        },
        roles: userRoles.map((item) => item.roleId),
      },
      process.env.SECRET_KEY_ACCESS_TOKEN as string,
      {
        expiresIn: "1day",
      }
    );
    const refreshToken = jwt.sign(
      {
        sub: {
          userName: findUser.userName,
          id: findUser.id,
        },
      },
      process.env.SECRET_KEY_REFRESH_TOKEN as string,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        refreshToken,
      },
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* The code is extracting the `username`, `password`, and `email` from the `req.body` object. It then
checks if any of these values are falsy (empty or undefined). If any of these values are falsy, it
sends a 403 Forbidden status code as a response. This is likely used to ensure that all required
fields are provided in the request body before proceeding with the registration process. */
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.sendStatus(403);
  }
  try {
    /* The code is checking if there is already a user with the same username in the database. It uses
  the Prisma client to query the `user` table and find all users where the `userName` column matches
  the provided `username`. If there are any matching users, it means that the username is already
  taken, so it sends a 403 Forbidden status code as a response. */
    const duplicateUser = await prisma.user.findMany({
      where: {
        userName: username,
      },
    });

    if (duplicateUser.length > 0) {
      res.sendStatus(403);
    }
    /* `const pwdHash = await bcrypt.hash(password, 12);` is using the `bcrypt` library to hash the
    `password` using a salt factor of 12. */
    const pwdHash = await bcrypt.hash(password, 12);
    /* The code is creating a new user in the database using the Prisma client. It is calling the
  `create` method on the `user` model and passing an object as the argument. This object contains
  the data for the new user, including the `email`, `userName`, and `password` properties. */
    const newUser = await prisma.user.create({
      data: {
        email: email,
        userName: username,
        password: pwdHash,
        UserRoles: {
          create: [
            {
              roleId: Roles.USER,
            },
          ],
        },
      },
      select: {
        email: true,
        id: true,
        userName: true,
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const refreshToken = (req: Request, res: Response) => {
  res.status(200);
};
export const logout = (req: Request, res: Response) => {
  res.status(200);
};
