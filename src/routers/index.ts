import express, { Request, Response, Express } from "express";
import companies_route from "./companies_route";
import { verifyToken, cacheControlMiddleware } from "../middleware";
import department_route from "./department_route";
import cors from "cors";
import sediments_route from "./sediments_route";
import { Socket } from "socket.io";

declare module "express-serve-static-core" {
  interface Request {
    io: Socket;
  }
}

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Pro Resíduos Ativo");
  });

  app.use(
    express.json(),
    cors({
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      origin: "http://localhost:8080",
    }),
    cacheControlMiddleware,
    (req: Request, res, next) => {
      req.io = app.get("io");
      req.token = app.get("token");
      next();
    },
    verifyToken,
    companies_route,
    department_route,
    sediments_route
  );
};

export default router;
