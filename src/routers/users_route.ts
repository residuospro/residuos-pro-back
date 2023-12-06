import express from "express";
import { Routes, Event } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { validRequest } from "../middleware";
import {
  userCreateSchema,
  getUserByRoleSchema,
  getUsernameSchema,
} from "../middleware/schemas/userSchema";
import { Request, Response } from "express";
import WebSocketService from "../services/webSocketService";

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
    async (req: Request, res: Response) => {
      const userResponse = await user_controller.createUser(req, res);

      WebSocketService.createEvent(req, userResponse, Event.USER_CREATED);
    }
  )

  .post(
    Routes.UPDATE_USER_AFTER_DEPARTMENT,

    async (req: Request, res: Response) => {
      const userResponse =
        await user_controller.updateUserAfterUpdateDepartment(req, res);

      WebSocketService.createEvent(req, userResponse, Event.UPDATED_USER);
    }
  )

  .put(Routes.UPDATE_USER, async (req: Request, res: Response) => {
    const userResponse = await user_controller.updateUsers(req, res);

    WebSocketService.createEvent(req, userResponse, Event.UPDATED_USER);
  })

  .put(
    Routes.DELETE_USER,

    async (req: Request, res: Response) => {
      const userResponse = await user_controller.deleteUsers(req, res);

      WebSocketService.createEvent(req, userResponse, Event.DELETED_USER);
    }
  )

  .delete(
    Routes.DELETE_USER_AFTER_DEPARTMENT,
    user_controller.deleteUserAfterDepartment
  );

export default user_route;
