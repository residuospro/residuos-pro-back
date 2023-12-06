import express, { Request, Response } from "express";
import { Event, Routes } from "../utils/enum";
import { validRequest } from "../middleware";
import { departmentCreateSchema } from "../middleware/schemas/departmentSchema";
import DepartmentController from "../controllers/department_controller";
import WebSocketService from "../services/webSocketService";

const department_route = express.Router();
const department_controller = new DepartmentController();

interface IRes {
  departments: any[];
  department: any[];
  totalPages: number;
}

department_route
  .post(
    Routes.GET_DEPARTMENT_BY_PAGE,
    department_controller.getDepartmentsByPage
  )
  .post(Routes.GET_ALL_DEPARTMENT, department_controller.getAllDepartment)
  .post(
    Routes.SAVE_DEPARTMENT,
    departmentCreateSchema,
    validRequest,
    async (req: Request, res: Response) => {
      const departmentResponse: any =
        await department_controller.createDepartment(req, res);

      WebSocketService.createEvent(
        req,
        departmentResponse,
        Event.DEPARTMENT_CREATED
      );
    }
  )
  .put(Routes.UPDATE_DEPARTMENT, async (req: Request, res: Response) => {
    let departmentResponse: any = await department_controller.updateDepartment(
      req,
      res
    );

    WebSocketService.createEvent(
      req,
      departmentResponse,
      Event.UPDATED_DEPARTMENT
    );

    departmentResponse.item = departmentResponse.user;

    WebSocketService.createEvent(
      req,
      departmentResponse,
      Event.UPDATED_USER_AFTER_DEPARTMENT
    );
  })
  .post(Routes.DELETE_DEPARTMENT, async (req: Request, res: Response) => {
    const departmentResponse: any =
      await department_controller.deleteDepartment(req, res);

    WebSocketService.createEvent(
      req,
      departmentResponse,
      Event.DELETED_DEPARTMENT
    );
  });

export default department_route;
