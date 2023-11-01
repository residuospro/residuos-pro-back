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

      const createSediment = await SedimentsService.createSedimentsService(
        sediment
      );

      const page = 1;
      const itemsPerPage = 10;

      const skip = (page - 1) * itemsPerPage;

      let { sediments, totalPages } =
        await SedimentsService.getSedimentsByPageService(
          sediment.idCompany,
          sediment.idDepartment,
          skip,
          itemsPerPage
        );

      if (sediments.length == 10) totalPages += 1;

      return res.status(201).json({
        createSediment,
        totalPages,
        message: {
          title: Messages.TITLE_REGISTER,
          subTitle: Messages.SUBTITLE_REGISTER,
        },
      });
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
      const { page, itemsPerPage, idCompany, idDepartment } = req.body;

      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const sediments = await SedimentsService.getSedimentsByPageService(
        idCompany,
        idDepartment,
        skip,
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

  async getNameOfSediments(req: Request, res: Response) {
    try {
      const { idCompany, idDepartment } = req.body;

      const sediments = await SedimentsService.getNameOfSedimentsService(
        idCompany,
        idDepartment
      );

      const nameOfSediments = sediments.map((s) => s.name);

      return res.status(200).json({ nameOfSediments });
    } catch (error) {
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
