import express, { Request, Response, Express } from "express";
import admin_route from "./admin_route";
import companies_route from "./companies_route";
import login_route from "./login_route";
import payload_route from "./payload_route";
import { verifyToken } from "../middleware";
import support_route from "./support_route";
import manager_route from "./manager_route";
import collaborator_route from "./collaborator_route";
import department_route from "./department_route";
import cors from "cors";

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Pro Resíduos Ativo");
  });

  app.use(
    express.json(),
    cors(),
    login_route,
    support_route,
    verifyToken,
    admin_route,
    companies_route,
    manager_route,
    collaborator_route,
    department_route,
    payload_route
  );
};

export default router;
