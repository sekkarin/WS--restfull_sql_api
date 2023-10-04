import cors from "cors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import routers from "./routers";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5173"],
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers());

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/views/404.html"));
});

app.listen(3030, async () => {
  console.log("server listening on port 3030 http://localhost:3030");
  // await prisma.$disconnect()
});
