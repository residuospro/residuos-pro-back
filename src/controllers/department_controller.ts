import { Request, Response } from "express";
import DepartmentService from "../services/department_service";
import HandleError from "../utils/errors/handleError";
import ExternalApiService from "../services/externalApi_service";
import mongoose from "mongoose";
import { Messages } from "../utils/enum";

class DepartmentController {
  async createDepartment(req: Request, res: Response) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      let { name, responsible, email, ramal, idCompany, totalItems } = req.body;

      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      const item = await DepartmentService.createDepartmentService(
        {
          name,
          responsible,
          email,
          ramal,
          idCompany,
        },
        session
      );

      const itemsPerPage = 10;

      await ExternalApiService.createUserAfterDepartment({
        responsible,
        email,
        ramal,
        idCompany,
        department: name,
        idDepartment: item.id,
      });

      totalItems += 1;

      const totalPages = Math.ceil(totalItems / itemsPerPage);

      await session.commitTransaction();
      session.endSession();

      return {
        item,
        totalPages,
        res: res.status(201).json({
          item,
          totalPages,
          message: {
            title: Messages.TITLE_REGISTER,
            subTitle: Messages.SUBTITLE_REGISTER,
          },
        }),
      };
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_ERROR_REGISTER,
            subTitle: Messages.SUBTITLE_EXISTENT_DEPARTMENT,
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

  async getDepartmentsByPage(req: Request, res: Response) {
    try {
      const { itemsPerPage, idCompany } = req.body;

      const departments = await DepartmentService.getDepartmentsByPageService(
        idCompany,
        itemsPerPage
      );

      return res.status(200).json(departments);
    } catch (error: any) {
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

  async getAllDepartment(req: Request, res: Response) {
    try {
      const { idCompany } = req.body;

      const departments = await DepartmentService.getAllDepartmentsService(
        idCompany
      );
      return res.status(200).json(departments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateDepartment(req: Request, res: Response) {
    try {
      let { name, responsible, email, ramal, idCompany } = req.body;

      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }

      const { id } = req.params;

      const item = await DepartmentService.updateDepartmentService(
        [{ name, responsible, email, ramal, idCompany }],
        id
      );

      await ExternalApiService.updateUserAfterDepartment(name, ramal, id);

      return {
        item,
        res: res.status(201).json({
          item,
          message: {
            title: Messages.TITLE_UPDATE_REGISTER,
            subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
          },
        }),
      };
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).json({
          message: {
            title: Messages.TITLE_ERROR_UPDATE_REGISTER,
            subTitle: Messages.SUBTITLE_ERROR_UPDATE_DEPARTMENT,
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

  async deleteDepartment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const item = await DepartmentService.deleteDepartmentService(id);

      await ExternalApiService.deleteUserAfterDepartment(id);

      return {
        item,
        res: res.status(201).json({
          item,
          message: {
            title: Messages.TITLE_DELETE_REGISTER,
            subTitle: Messages.SUBTITLE_DELETE_REGISTER,
          },
        }),
      };
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

export default DepartmentController;
