import { Request, Response } from "express";
import { ISedimentsService } from "../utils/interfaces";
import SedimentsService from "../services/sediments_service";
import HandleError from "../utils/errors/handleError";
import { Messages } from "../utils/enum";

class SedimentsController {
  async createSediments(req: Request, res: Response) {
    try {
      const sediment: ISedimentsService = req.body;

      sediment.name =
        sediment.name.charAt(0).toUpperCase() +
        sediment.name.slice(1).toLowerCase();

      const sediments = await SedimentsService.createSedimentsService(sediment);

      const itemsPerPage = 10;

      sediment.totalItems = Number(sediment.totalItems) + 1;

      const totalPages = Math.ceil(sediment.totalItems / itemsPerPage);

      const message = {
        title: Messages.TITLE_REGISTER,
        subTitle: Messages.SUBTITLE_REGISTER,
      };

      const response = res.status(201).json({
        sediments,
        totalPages,
        message,
      });

      return {
        sediments,
        totalPages,
        response,
      };
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
      const sediment: ISedimentsService = req.body;

      if (sediment.name) {
        sediment.name =
          sediment.name.charAt(0).toUpperCase() +
          sediment.name.slice(1).toLowerCase();
      }

      const { id } = req.params;

      const sediments = await SedimentsService.updateSedimentService(
        [sediment],
        id
      );

      const message = {
        title: Messages.TITLE_UPDATE_REGISTER,
        subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
      };

      const response = res.status(201).json({
        sediments,
        message,
      });

      return { sediments, response };
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

      const sediments = await SedimentsService.deleteSedimentService(id);

      const message = {
        title: Messages.TITLE_DELETE_REGISTER,
        subTitle: Messages.SUBTITLE_DELETE_REGISTER,
      };

      const response = res.status(201).json({ message });

      return { sediments, response };
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
