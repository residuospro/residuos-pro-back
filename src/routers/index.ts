import express, { Request, Response, Express } from "express";
import users_route from "./users_route";
import companies_route from "./companies_route";
import login_route from "./login_route";
import payload_route from "./payload_route";
import { verifyToken, cacheControlMiddleware } from "../middleware";
import support_route from "./support_route";
import manager_route from "./manager_route";
import collaborator_route from "./collaborator_route";
import refresh_token_route from "./refreshToken_route";
import department_route from "./department_route";
import cors from "cors";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Pro Resíduos Ativo");
  });

  app.use(
    express.json(),
    cors(),
    cacheControlMiddleware,
    login_route,
    support_route,
    verifyToken,
    users_route,
    companies_route,
    manager_route,
    collaborator_route,
    department_route,
    payload_route,
    refresh_token_route
  );
};

export default router;
