import cors from 'cors'
import express, { Request, Response } from "express"
import routers from './routers'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routers())
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/views/404.html'))
})

app.listen(3030, async () => {
    console.log("server listening on port 3030 http://localhost:3030");
    // await prisma.$disconnect()
})