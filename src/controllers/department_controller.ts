import { Request, Response } from "express";
import DepartmentService from "../services/department_service";
import HandleError from "../utils/errors/handleError";
import ExternalApiService from "../services/externalApi_service";
import mongoose from "mongoose";
import { Messages } from "../utils/enum";
import { Server as SocketIoServer } from "socket.io";

class DepartmentController {
  async createDepartment(req: Request, res: Response) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      let { name, responsible, email, ramal, idCompany } = req.body;

      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      const department = await DepartmentService.createDepartmentService(
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

      let { totalPages } = await DepartmentService.getDepartmentsByPageService(
        idCompany,
        itemsPerPage,
        false
      );

      await ExternalApiService.createUserAfterDepartment({
        responsible,
        email,
        ramal,
        idCompany,
        department: name,
        idDepartment: department.id,
      });

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        department,
        totalPages,
        message: {
          title: Messages.TITLE_REGISTER,
          subTitle: Messages.SUBTITLE_REGISTER,
        },
      });
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
        itemsPerPage,
        true
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

  async getDepartmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const department = await DepartmentService.getDepartmentByIdService(id);

      return res.status(200).json(department);
    } catch (error: any) {
      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getDepartmentByName(req: Request, res: Response) {
    try {
      let { idCompany, name } = req.body;

      const department = await DepartmentService.getDepartmentByNameService({
        name,
        idCompany,
      });

      return res.status(200).json(department);
    } catch (error: any) {
      return res.status(500).json({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async updateDepartment(req: Request, res: Response) {
    try {
      let { name, responsible, email, ramal, idCompany } = req.body;

      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }

      const { id } = req.params;

      const department = await DepartmentService.updateDepartmentService(
        [{ name, responsible, email, ramal, idCompany }],
        id
      );

      await ExternalApiService.updateUserAfterDepartment(name, ramal, id);

      return res.status(201).json({
        department,
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

      await DepartmentService.deleteDepartmentService(id);

      await ExternalApiService.deleteUserAfterDepartment(id);

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

export default DepartmentController;
