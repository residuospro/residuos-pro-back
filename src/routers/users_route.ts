import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(
    Routes.GET_USERS,
    getUserByRoleSchema,
    validRequest,
    user_controller.getUsersByRole
  )
  .post(
    Routes.GET_USER_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    user_controller.getUserByUsername
  )
  .post(Routes.GET_ALL_USERNAMES, user_controller.getAllUsernames)

  .post(
    Routes.SAVE_USER,
    userCreateSchema,
    validRequest,
    user_controller.createUser
  )

  .post(
    Routes.UPDATE_USER_AFTER_DEPARTMENT,
    user_controller.updateUserAfterUpdateDepartment
  )

  .put(Routes.UPDATE_USER, user_controller.updateUsers)

  .put(Routes.DELETE_USER, user_controller.deleteUsers)

  .delete(
    Routes.DELETE_USER_AFTER_DEPARTMENT,
    user_controller.deleteUserAfterDepartment
  );

export default user_route;
