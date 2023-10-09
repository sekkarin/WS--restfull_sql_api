import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { NextFunction } from "express-serve-static-core";

const prisma = new PrismaClient();

export const insertRestaurants = async (req: Request, res: Response) => {
  const { name, imageUrl, type } = req.body;
  try {
    if (!name && !imageUrl && !type) {
      res.status(400).json({ message: "not data" });
    }
    await prisma.restaurant
      .create({
        data: {
          name: name,
          imageUrl: imageUrl,
          type: type,
        },
      })
      .then((result) => {
        res.status(201).json(result);
      });
  } catch (error) {
    console.log(error);
  }
};
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    await prisma.restaurant.findMany().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};
export const getRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(404).json({ message: "Invalid request" });
    }
    await prisma.restaurant
      .findFirst({
        where: {
          id: parseInt(id),
        },
      })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    console.log(error);
  }
};
export const updateRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(404).json({ message: "Invalid request" });
    }
    await prisma.restaurant
      .update({
        where: {
          id: parseInt(id),
        },
        data: req.body,
      })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const deleteRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.sendStatus(404);
    }
    await prisma.restaurant
      .delete({
        where: {
          id: parseInt(id),
        },
      })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    console.log(error);
  }
};
