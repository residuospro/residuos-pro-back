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
    department_controller.createDepartment
  )
  .put(Routes.UPDATE_DEPARTMENT, department_controller.updateDepartment)

  .post(Routes.DELETE_DEPARTMENT, department_controller.deleteDepartment);

export default department_route;
