import express from "express";
import { Routes } from "../utils/enum";
import CollectionController from "../controllers/collection_controller";

const collection_route = express.Router();
const collection_controller = new CollectionController();

collection_route
  .post(Routes.SAVE_COLLECTION, collection_controller.createCollection)
  .post(
    Routes.GET_COLLECTION_BY_PAGE,
    collection_controller.getCollectionByPage
  )
  .post(Routes.GET_COLLECTION_BY_ID, collection_controller.getCollectionById)
  .post(
    Routes.GET_COLLECTION_BY_FILTER,
    collection_controller.getCollectionByFilter
  )
  .post(
    Routes.UPDATE_COLLECTION_STATUS,
    collection_controller.updateCollectionStatus
  )
  .post(Routes.DELETE_COLLECTION, collection_controller.deleteCollection)
  .post(Routes.UPDATE_COLLECTION, collection_controller.updateCollection)
  .post(Routes.GET_ALL_COLLECTIONS, collection_controller.getAllCollections);

export default collection_route;
