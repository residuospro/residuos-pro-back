import { ICollectionSchema } from "../utils/interfaces";
import CollectionService from "../services/collection_service";
import { Request, Response } from "express";
import WebSocketService from "../services/webSocketService";
import { SocketEvent, Messages } from "../utils/enum";
import mongoose from "mongoose";
import HandleError from "../utils/errors/handleError";

class CollectionController {
  async createCollection(req: Request, res: Response) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const collectionData: Partial<ICollectionSchema> = req.body;

      const collection = await CollectionService.createCollectionService(
        collectionData,
        session
      );

      await session.commitTransaction();
      session.endSession();

      WebSocketService.createEvent(req, {}, SocketEvent.COLLECTION_CREATED);

      const itemsPerPage = 10;

      let totalItems = collectionData.totalItems;

      totalItems += 1;

      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const message = {
        title: Messages.TITLE_COLLECTION_CREATED,
        subTitle: Messages.SUBTITLE_COLLECTION_CREATED,
      };

      const response = res.status(201).json({
        collection,
        totalPages,
        message,
      });

      return response;
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getCollectionByPage(req: Request, res: Response) {
    try {
      const { page, itemsPerPage, idCompany, idDepartment } = req.body;

      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const collections = await CollectionService.getCollectionByPageService(
        idCompany,
        idDepartment,
        itemsPerPage,
        skip
      );

      return res.status(200).json(collections);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async getCollectionById(req: Request, res: Response) {
    try {
      const { idCompany, idDepartment } = req.body;

      const { id } = req.params;

      const collection = await CollectionService.getCollectionByIdService(
        idCompany,
        idDepartment,
        id
      );

      return res.status(200).json(collection);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default CollectionController;
