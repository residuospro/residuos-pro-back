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
    async (req: Request, res: Response) => {
      const sedimentResponse: any = await sedments_controller.createSediments(
        req,
        res
      );

      WebSocketService.createEvent(
        req,
        sedimentResponse,
        Event.SEDIMENT_CREATED
      );
    }
  )
  .post(
    Routes.GET_SEDIMENTS_BY_PAGE,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.getSedimentsByPage
  )
  .put(
    Routes.UPDATE_SEDIMENTS,
    verifyPermission([Permissions.MANAGER]),

    async (req: Request, res: Response) => {
      const sedimentResponse: any = await sedments_controller.updateSediments(
        req,
        res
      );

      WebSocketService.createEvent(
        req,
        sedimentResponse,
        Event.UPDATED_SEDIMENT
      );
    }
  )
  .post(
    Routes.DELETE_SEDIMENT,
    verifyPermission([Permissions.MANAGER]),
    async (req: Request, res: Response) => {
      const sedimentResponse: any = await sedments_controller.deleteSediments(
        req,
        res
      );

      WebSocketService.createEvent(
        req,
        sedimentResponse,
        Event.DELETED_SEDIMENT
      );
    }
  );

export default sediments_route;
