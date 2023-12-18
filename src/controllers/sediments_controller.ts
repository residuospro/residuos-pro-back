import { Request, Response } from "express";
import { ISedimentsService } from "../utils/interfaces";
import SedimentsService from "../services/sediments_service";
import HandleError from "../utils/errors/handleError";
import { Messages, Event } from "../utils/enum";
import WebSocketService from "../services/webSocketService";

class SedimentsController {
  async createSediments(req: Request, res: Response) {
    try {
      const sedimentInfo: ISedimentsService = req.body;

      sedimentInfo.name =
        sedimentInfo.name.charAt(0).toUpperCase() +
        sedimentInfo.name.slice(1).toLowerCase();

      const sediment = await SedimentsService.createSedimentsService(
        sedimentInfo
      );

      const itemsPerPage = 10;

      sedimentInfo.totalItems = Number(sedimentInfo.totalItems) + 1;

      const totalPages = Math.ceil(sedimentInfo.totalItems / itemsPerPage);

      const message = {
        title: Messages.TITLE_REGISTER,
        subTitle: Messages.SUBTITLE_REGISTER,
      };

      const response = res.status(201).json({
        sediment,
        totalPages,
        message,
      });

      WebSocketService.createEvent(
        req,
        { sediment, totalPages },
        Event.SEDIMENT_CREATED
      );

      return response;
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_ERROR_REGISTER,
            subTitle: Messages.SUBTITLE_EXISTENT_SEDIMENT,
          },
        });
      }

      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getSedimentsByPage(req: Request, res: Response) {
    try {
      const { itemsPerPage, idCompany, idDepartment } = req.body;

      const sediments = await SedimentsService.getSedimentsByPageService(
        idCompany,
        idDepartment,
        itemsPerPage
      );

      return res.status(200).json(sediments);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async updateSediments(req: Request, res: Response) {
    try {
      const sedimentInfo: ISedimentsService = req.body;

      if (sedimentInfo.name) {
        sedimentInfo.name =
          sedimentInfo.name.charAt(0).toUpperCase() +
          sedimentInfo.name.slice(1).toLowerCase();
      }

      const { id } = req.params;

      const sediment = await SedimentsService.updateSedimentService(
        [sedimentInfo],
        id
      );

      const message = {
        title: Messages.TITLE_UPDATE_REGISTER,
        subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
      };

      const response = res.status(201).json({
        sediment,
        message,
      });

      WebSocketService.createEvent(req, { sediment }, Event.UPDATED_SEDIMENT);

      return response;
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_ERROR_UPDATE_REGISTER,
            subTitle: Messages.SUBTITLE_ERROR_UPDATE_SEDIMENTS,
          },
        });
      }

      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async deleteSediments(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const sediment = await SedimentsService.deleteSedimentService(id);

      const message = {
        title: Messages.TITLE_DELETE_REGISTER,
        subTitle: Messages.SUBTITLE_DELETE_REGISTER,
      };

      const response = res.status(201).json({ message });

      WebSocketService.createEvent(req, { sediment }, Event.DELETED_SEDIMENT);

      return response;
    } catch (error: any) {
      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }
}

export default SedimentsController;
