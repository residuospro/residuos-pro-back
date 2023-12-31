import express, { Request, Response, Express } from "express";
import {
  verifyToken,
  cacheControlMiddleware,
  verifyPermission,
} from "../middleware";
import { Socket } from "socket.io";
import { typePermissions, UserPermissions } from "../utils/permissions";
import login_route from "./login_route";
import companies_route from "./companies_route";
import payload_route from "./payload_route";
import finalize_registration_route from "./finalize_registration_route";
import support_route from "./supporte_route";
import user_exists_route from "./user_exists_route";
import department_route from "./department_route";
import user_route from "./users_route";
import cors from "cors";
import sediments_route from "./sediments_route";
import collection_route from "./collection_route";

declare module "express-serve-static-core" {
  interface Request {
    io: Socket;
    pusher: any;
  }
}

const router = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send("Pro Resíduos Ativo");
  });

  app.use(
    express.json(),
    cors(),
    cacheControlMiddleware,
    (req: Request, res, next) => {
      req.io = app.get("io");
      req.token = app.get("token");

      next();
    },
    login_route,
    support_route,
    user_exists_route,
    finalize_registration_route,
    verifyToken,
    sediments_route,
    verifyPermission(UserPermissions),
    user_route,
    companies_route,
    department_route,
    verifyPermission(typePermissions),
    payload_route,
    collection_route
  );
};

export default router;
