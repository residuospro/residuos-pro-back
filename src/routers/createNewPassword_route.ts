import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";

const newPassword_route = express.Router();
const user_controller = new UserController();

newPassword_route.post(
  Routes.RESET_PASSWORD,
  user_controller.createNewPassword
);

export default newPassword_route;
