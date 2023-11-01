import express, { Request, Response, Express } from "express";
import companies_route from "./companies_route";
import { verifyToken, cacheControlMiddleware } from "../middleware";
import department_route from "./department_route";
import cors from "cors";
import sediments_route from "./sediments_route";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Pro Resíduos Ativo");
  });

  app.use(
    express.json(),
    cors(),
    cacheControlMiddleware,
    verifyToken,
    companies_route,
    department_route,
    sediments_route
  );
};

export default router;
