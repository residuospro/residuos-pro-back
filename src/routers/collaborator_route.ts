import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest, verifyPermission } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";

const collaborator_route = express.Router();
const collaborator_controller = new UserController();

collaborator_route
  .get(
    Routes.GET_COLLABORATOR_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.MANAGER]),
    collaborator_controller.getUserByUsername
  )
  .get(
    Routes.GET_COLLABORATOR,
    getUserByRoleSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.MANAGER]),
    collaborator_controller.getUsersByRole
  )
  .post(
    Routes.SAVE_COLLABORATOR,
    userCreateSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT, Permissions.MANAGER]),
    collaborator_controller.createUser
  )
  .put(
    Routes.UPDATE_COLLABORATOR,
    verifyPermission([Permissions.SUPPORT, Permissions.MANAGER]),
    collaborator_controller.updateUsers
  )
  .delete(
    Routes.DELETE_COLLABORATOR,
    verifyPermission([Permissions.SUPPORT, Permissions.MANAGER]),
    collaborator_controller.deleteUsers
  );

export default collaborator_route;
