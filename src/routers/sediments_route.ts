import express, { Request, Response } from "express";
import SedimentsController from "../controllers/sediments_controller";
import { Event, Permissions, Routes } from "../utils/enum";
import { verifyPermission } from "../middleware";
import WebSocketService from "../services/webSocketService";

const sediments_route = express.Router();
const sedments_controller = new SedimentsController();

sediments_route
  .post(
    Routes.SAVE_SEDIMENTS,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.createSediments
  )
  .post(
    Routes.GET_SEDIMENTS_BY_PAGE,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.getSedimentsByPage
  )
  .put(
    Routes.UPDATE_SEDIMENTS,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.updateSediments
  )
  .post(
    Routes.DELETE_SEDIMENT,
    verifyPermission([Permissions.MANAGER]),
    async (req: Request, res: Response) => {
      const sedimentResponse: any = await sedments_controller.deleteSediments(
        req,
        res
      );
    }
  );

export default sediments_route;
