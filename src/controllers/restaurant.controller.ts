import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const inserRetuarants = async (req: Request, res: Response) => {
    const { name, imageUrl, type } = req.body
    try {
        if (!name && !imageUrl && !type) {
            res.status(400).json({ message: "not data" })
        }
        await prisma.restaurant.create({
            data: {
                name: name,
                imageUrl: imageUrl,
                type: type
            },
        }).then(result => {
            res.status(201).json(result)
        })
    } catch (error) {
        console.log(error);
    }
}
export const getRetuarants = async (req: Request, res: Response) => {
    try {
        await prisma.restaurant.findMany()
            .then(result => {
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error);
    }
}
export const getRetuarantById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        if (!id) {
            res.status(404).json({ message: "Invalid request" })
        }
        await prisma.restaurant.findFirst({
            where: {
                id: parseInt(id),
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error);
    }
}
export const updateRetuarantById = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, type, imageUrl } = req.body
    console.log(req.body);
    
    try {
        if (!id) {
            res.status(404).json({ message: "Invalid request" })
        }
        // if (!name && !imageUrl && !type) {
        //     res.status(400).json({ message: "not data" })
        // }
        await prisma.restaurant.update({
            where: {
                id: parseInt(id),
            },
            data: req.body
        })
            .then(result => {
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error);
    }
}
export const deleteRetuarantById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        if (!id) {
            res.sendStatus(404)
        }
        await prisma.restaurant.delete({
            where: {
                id: parseInt(id),
            },
        })
            .then(result => {
                res.status(200).json(result)
            })
    } catch (error) {
        console.log(error);
    }
}