import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest, verifyPermission } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(
    Routes.GET_USER_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.getUserByUsername
  )
  .post(
    Routes.GET_USERS,
    getUserByRoleSchema,
    validRequest,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.getUsersByRole
  )
  .post(
    Routes.GET_ALL_USERNAMES,
    verifyPermission([
      Permissions.ADMIN,
      Permissions.MANAGER,
      Permissions.SUPPORT,
    ]),
    user_controller.getAllUsernames
  )
  .post(
    Routes.SAVE_USER,
    userCreateSchema,
    validRequest,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.createUser
  )
  .put(
    Routes.UPDATE_USER,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.updateUsers
  )
  .delete(
    Routes.DELETE_USER,
    verifyPermission([
      Permissions.SUPPORT,
      Permissions.ADMIN,
      Permissions.MANAGER,
    ]),
    user_controller.deleteUsers
  );

export default user_route;
