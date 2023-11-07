import express from "express";
import SedimentsController from "../controllers/sediments_controller";
import { Permissions, Routes } from "../utils/enum";
import { verifyPermission } from "../middleware";

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
  .post(
    Routes.GET_NAME_OF_SEDIMENTS,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.getNameOfSediments
  )
  .post(
    Routes.GET_SEDIMENTS_BY_NAME,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.getSedimentByName
  )
  .put(
    Routes.UPDATE_SEDIMENTS,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.updateSediments
  )
  .delete(
    Routes.DELETE_SEDIMENT,
    verifyPermission([Permissions.MANAGER]),
    sedments_controller.deleteSediments
  );

export default sediments_route;
