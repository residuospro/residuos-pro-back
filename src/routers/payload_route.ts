import express from "express";
import PayloadController from "../controllers/payload_controller";
import { verifyToken } from "../middleware";
import { Routes } from "../utils/enum";

const payload_route = express.Router();
const payloadController = new PayloadController();

payload_route.get(Routes.PAYLOAD, payloadController.payload);

export default payload_route;
