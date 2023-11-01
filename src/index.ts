import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import routers from "./routers";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["*","http://127.0.0.1:5173"],
    optionsSuccessStatus: 200,
  })
);
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
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
  console.log("server listening  http://localhost:" + port);
  // await prisma.$disconnect()
});
