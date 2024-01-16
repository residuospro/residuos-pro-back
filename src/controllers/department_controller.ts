import { Request, Response } from "express";
import DepartmentService from "../services/department_service";
import HandleError from "../utils/errors/handleError";
import mongoose from "mongoose";
import { Messages, SocketEvent } from "../utils/enum";
import UserService from "../services/user_service";
import WebSocketService from "../services/webSocketService";

class DepartmentController {
  async createDepartment(req: Request, res: Response) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      let { name, ramal, idCompany, totalItems } = req.body;

      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      const department = await DepartmentService.createDepartmentService(
        {
          name,
          ramal,
          idCompany,
        },
        session
      );

      const itemsPerPage = 10;

      totalItems += 1;

      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const departmentResponse = {
        department,
        totalPages,
      };

      WebSocketService.createEvent(
        req,
        departmentResponse,
        SocketEvent.DEPARTMENT_CREATED
      );

      await session.commitTransaction();
      session.endSession();

      const message = {
        title: Messages.TITLE_REGISTER,
        subTitle: Messages.SUBTITLE_REGISTER,
      };

      const response = res.status(201).json({
        department,
        totalPages,
        message,
      });

      return response;
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

  async getDepartmentNames(req: Request, res: Response) {
    try {
      const { idCompany } = req.body;

      const departments = await DepartmentService.getAllDepartmentsService(
        idCompany
      );

      const departmentNames = departments.map((d) => d.name);

      return res.status(200).json(departmentNames);
    } catch (error) {
      return res.status(500).json({ message: error.message });
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

      const department = await DepartmentService.updateDepartmentService(
        [{ name, responsible, email, ramal, idCompany }],
        id
      );

      WebSocketService.createEvent(
        req,
        { department },
        SocketEvent.UPDATED_DEPARTMENT
      );

      const user = await UserService.updateUserAfterUpdateDepartmentService(
        name,
        ramal,
        id
      );

      WebSocketService.createEvent(
        req,
        { user },
        SocketEvent.UPDATED_USER_AFTER_DEPARTMENT
      );

      const message = {
        title: Messages.TITLE_UPDATE_REGISTER,
        subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
      };

      const response = res.status(201).json({
        department,
        message,
      });

      return response;
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

      const department = (await DepartmentService.deleteDepartmentService(
        id
      )) as any;

      WebSocketService.createEvent(
        req,
        { department },
        SocketEvent.DELETED_DEPARTMENT
      );

      const user = await UserService.deleteUserAfterDepartmentService(id);

      WebSocketService.createEvent(
        req,
        { user },
        SocketEvent.DELETED_USER_AFTER_DEPARTMENT
      );

      const message = {
        title: Messages.TITLE_DELETE_REGISTER,
        subTitle: Messages.SUBTITLE_DELETE_REGISTER,
      };

      const response = res.status(201).json({
        department,
        message,
      });

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

export default DepartmentController;
