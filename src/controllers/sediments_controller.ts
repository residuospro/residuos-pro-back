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

      let { totalPages } = await SedimentsService.getSedimentsByPageService(
        sediment.idCompany,
        sediment.idDepartment,
        skip,
        itemsPerPage,
        false
      );

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
        itemsPerPage,
        true
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

  async getSedimentByName(req: Request, res: Response) {
    try {
      const { name, idCompany, idDepartment } = req.body;

      const sediment = await SedimentsService.getSedimentByNameService(
        name,
        idCompany,
        idDepartment
      );

      return res.status(200).json(sediment);
    } catch (error) {
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

      const updateSediment = await SedimentsService.updateSedimentService(
        [sediment],
        id
      );

      return res.status(201).json({
        updateSediment,
        message: {
          title: Messages.TITLE_UPDATE_REGISTER,
          subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
        },
      });
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

      await SedimentsService.deleteSedimentService(id);

      return res.status(201).json({
        message: {
          title: Messages.TITLE_DELETE_REGISTER,
          subTitle: Messages.SUBTITLE_DELETE_REGISTER,
        },
      });
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
