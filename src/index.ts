// import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import routers from "./routers";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const port = process.env.PORT || 3000;

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.use(
//   cors({
//     credentials: true,
//     origin: ["*"],
//     optionsSuccessStatus: 200,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers());

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/views/404.html"));
});

app.listen(port, async () => {
  console.log("server listening on port 3030 http://localhost:3030");
  // await prisma.$disconnect()
});
