import express, { Request, Response } from "express";
import { Routes, Event } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import WebSocketService from "../services/webSocketService";

const finalize_registration_route = express.Router();
const finalize_registration_controller = new UserController();

finalize_registration_route.put(
  Routes.CREATE_PASSWORD,
  finalize_registration_controller.finalizeRegistration
);

export default finalize_registration_route;
