import express from "express";

import { Routes } from "../utils/enum";
import LoginController from "../controllers/login_controllers";

const login_route = express.Router();
const loginController = new LoginController();

login_route.get(Routes.LOGIN, loginController.login);

export default login_route;
