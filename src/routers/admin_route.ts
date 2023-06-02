import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest, verifyPermission } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";

const admin_route = express.Router();
const admin_controller = new UserController();

admin_route
  .get(
    Routes.GET_ADMIN_BY_USERNAME,
    getUsernameSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT]),
    admin_controller.getUserByUsername
  )
  .get(
    Routes.GET_ADMIN,
    getUserByRoleSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT]),
    admin_controller.getUsersByRole
  )
  .post(
    Routes.SAVE_ADMIN,
    userCreateSchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT]),
    admin_controller.createUser
  )
  .put(
    Routes.UPDATE_ADMIN,

    verifyPermission([Permissions.SUPPORT]),
    admin_controller.updateUsers
  )
  .delete(
    Routes.DELETE_ADMIN,
    verifyPermission([Permissions.SUPPORT]),
    admin_controller.deleteUsers
  );

export default admin_route;
