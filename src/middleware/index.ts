import { validationResult } from "express-validator";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { UserPayload } from "../utils/jwtUtils";
import ExternalApiService from "../services/externalApi_service";

export const validRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        location: error.location,
        msg: error.msg,
        param: error.param,
        nestedErrors: error.nestedErrors,
      };
    },
  });

  const errors = myValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

declare module "express" {
  interface Request {
    token?: string;
    user?: UserPayload;
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const validToken = await ExternalApiService.validateToken(token);

  if (validToken.status == 200) {
    req.token = token as string;
    req.user = validToken.data as UserPayload;

    next();
  } else {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};

export const verifyPermission = (permission: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserPayload;

    if (permission.includes(user.role[0])) {
      next();
    } else {
      return res.status(401).send({
        message:
          "Você não possui permissão para cadastrar esse tipo de usuário",
      });
    }
  };
};

export const cacheControlMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
};
