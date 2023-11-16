import express, { Request, Response } from "express";
import { Event, Permissions, Routes } from "../utils/enum";
import { verifyPermission, validRequest } from "../middleware";
import { departmentCreateSchema } from "../middleware/schemas/departmentSchema";
import DepartmentController from "../controllers/department_controller";
import WebSocketService from "../services/webSocketService";

const department_route = express.Router();
const department_controller = new DepartmentController();

department_route
  .post(
    Routes.GET_DEPARTMENT_BY_NAME,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.getDepartmentByName
  )
  .post(
    Routes.GET_DEPARTMENT_BY_PAGE,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.getDepartmentsByPage
  )
  .post(
    Routes.GET_ALL_DEPARTMENT,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    department_controller.getAllDepartment
  )
  .get(
    Routes.GET_DEPARTMENT_BY_ID,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.getDepartmentById
  )
  .post(
    Routes.SAVE_DEPARTMENT,
    departmentCreateSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    async (req: Request, res: Response) => {
      await department_controller.createDepartment(req, res);
      WebSocketService.emitEvent(req, res, Event.DEPARTMENT);
    }
  )
  .put(
    Routes.UPDATE_DEPARTMENT,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    async (req: Request, res: Response) => {
      await department_controller.updateDepartment(req, res);
      WebSocketService.emitEvent(req, res, Event.DEPARTMENT);
    }
  )
  .delete(
    Routes.DELETE_DEPARTMENT,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    async (req: Request, res: Response) => {
      await department_controller.deleteDepartment(req, res);
      WebSocketService.emitEvent(req, res, Event.DEPARTMENT);
    }
  );

export default department_route;
