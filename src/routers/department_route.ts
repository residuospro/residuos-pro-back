import express from "express";
import { Permissions, Routes } from "../utils/enum";
import { verifyPermission, validRequest } from "../middleware";
import { departmentCreateSchema } from "../middleware/schemas/departmentSchema";
import DepartmentController from "../controllers/department_controller";

const department_route = express.Router();
const department_controller = new DepartmentController();

department_route
  .get(
    Routes.GET_DEPARTMENT_BY_NAME,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.getDepartmentByName
  )
  .get(
    Routes.GET_ALL_DEPARTMENT,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.getAllDepartmentsByCompany
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
    department_controller.createDepartment
  )
  .put(
    Routes.UPDATE_DEPARTMENT,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.updateDepartment
  )
  .delete(
    Routes.DELETE_DEPARTMENT,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    department_controller.deleteDepartment
  );

export default department_route;
