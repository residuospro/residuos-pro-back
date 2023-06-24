import { validationResult } from "express-validator";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { UserPayload } from "../utils/jwtUtils";
import TokenService from "../services/token_service";

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

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }

    const validToken = TokenService.verifyToken(token);

    if (validToken) {
      req.token = token as string;
      req.user = validToken as UserPayload;

      next();
    }
  } catch (error: any) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export const verifyPermission = (permission: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserPayload;

    if (permission.includes(user.permission[0])) {
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
