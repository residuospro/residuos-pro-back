import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest, verifyPermission } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";

const manager_route = express.Router();
const manager_controller = new UserController();

manager_route
  .get(
    Routes.GET_MANAGER_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    manager_controller.getUserByUsername
  )
  .get(
    Routes.GET_MANAGER,
    getUserByRoleSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    manager_controller.getUsersByRole
  )
  .post(
    Routes.SAVE_MANAGER,
    userCreateSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    manager_controller.createUser
  )
  .put(
    Routes.UPDATE_MANAGER,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    manager_controller.updateUsers
  )
  .delete(
    Routes.DELETE_MANAGER,
    verifyPermission([Permissions.SUPPORT, Permissions.ADMIN]),
    manager_controller.deleteUsers
  );

export default manager_route;
