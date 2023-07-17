import cors from 'cors'
import express, { Request, Response } from "express"
import { connection } from './db/db'
import routers from './routers'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(routers())
// app.get('/', (req: Request, res: Response) => {
//     res.send("Hello world")
// })

app.listen(3030, () => {
    console.log("server listening on port 3030 http://localhost:3030");
    connection.connect((err) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('DB connected as id ' + connection.threadId);
    })
})