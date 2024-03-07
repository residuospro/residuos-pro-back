import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";

const user_registration_route = express.Router();
const user_registration_controller = new UserController();

user_registration_route
  .put(
    Routes.CREATE_REGISTER,
    user_registration_controller.finalizeRegistration
  )
  .put(Routes.UPDATE_PASSWORD, user_registration_controller.updatePassword);

export default user_registration_route;
