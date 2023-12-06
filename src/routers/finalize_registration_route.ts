import express from "express";
import { Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";

const finalize_registration_route = express.Router();
const finalize_registration_controller = new UserController();

finalize_registration_route.put(
  Routes.CREATE_PASSWORD,
  finalize_registration_controller.finalizeRegistration
);

export default finalize_registration_route;
