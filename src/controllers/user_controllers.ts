import { Request, Response } from "express";
import UserService from "../services/user_service";
import { IUser } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";
import PasswordGenerator from "../utils/passwordGenerator";
import { Messages, Permissions, Service } from "../utils/enum";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        name,
        idDepartment,
        department,
        idCompany,
        role,
        ramal,
        email,
        service,
      } = req.body;

      const generator = new PasswordGenerator();

      const password = generator.generateRandomPassword();

      const { item, totalPages } = await UserService.createUser({
        name,
        idDepartment,
        department,
        idCompany,
        role,
        ramal,
        password,
        email,
        service,
      });

      const message = {
        title: Messages.TITLE_REGISTER,
        subTitle: Messages.SUBTITLE_REGISTER,
      };

      const response = res.status(201).json({
        item,
        totalPages,
        message,
      });

      return { item, totalPages, response };
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({
          message: {
            title: Messages.TITLE_EXISTING_USER,
            subTitle: Messages.SUBTITLE_EXISTING_USER,
          },
        });
      }

      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getUsersByRole(req: Request, res: Response) {
    try {
      const { itemsPerPage, role, idCompany, idDepartment } = req.body;

      const users = await UserService.getUsers(
        role,
        itemsPerPage,
        idCompany,
        idDepartment,
        true
      );

      return res.status(200).json(users);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({
          message: {
            title: Messages.TITLE_THERE_ARE_NO_RECORDS,
            subTitle: Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
          },
        });
      }

      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getAllUsernames(req: Request, res: Response) {
    try {
      const { idCompany, role, idDepartment } = req.body;

      const users = await UserService.getAllUsernamesService(
        idCompany,
        role,
        idDepartment
      );

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async getUserByUsername(req: Request, res: Response) {
    try {
      const { username, idCompany, role } = req.body;

      const user = await UserService.getUsername({
        username,
        idCompany,
        role,
      });

      if (user) {
        return res.status(200).json(user);
      }

      return res.status(404).send({ message: "Usuário não encontrado" });
    } catch (error: any) {
      return res.status(500).send({
        message: {
          title: Messages.TITLE_ERROR,
          subTitle: Messages.SUBTITLE_ERROR,
        },
      });
    }
  }

  async validateUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;

      const { id } = req.params;

      const existingUsername = await UserService.validateUsernameService(
        username,
        id
      );

      return res.status(200).json(existingUsername);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async finalizeRegistration(req: Request, res: Response) {
    try {
      const { username, password, service }: IUser = req.body;

      const { id } = req.params;

      const item = await UserService.finalizeRegistrationService(
        [{ username, password }],
        id
      );

      if (service == Service.RESIDUOSPRO) {
        let url = process.env.FRONT_REDISUOS_PRO;

        const response = res.status(200).send(url);

        return { item, response };
      }

      return res.status(204).send("Senha redefinida com sucesso");
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async updateUsers(req: Request, res: Response) {
    try {
      const {
        name,
        username,
        password,
        ramal,
        email,
        department,
        idDepartment,
        idCompany,
        service,
      }: IUser = req.body;

      const { id } = req.params;

      const item = await UserService.updateUser(
        [
          {
            name,
            username,
            password,
            ramal,
            email,
            department,
            idDepartment,
            idCompany,
            service,
          },
        ],
        id
      );

      const message = {
        title: Messages.TITLE_UPDATE_REGISTER,
        subTitle: Messages.SUBTITLE_UPDATE_REGISTER,
      };

      const response = res.status(200).json({
        item,
        message,
      });

      return { item, response };
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({
          message: {
            title: Messages.TITLE_EXISTING_USER,
            subTitle: Messages.SUBTITLE_EXISTING_USER,
          },
        });
      }

      return res.status(404).send({
        message: {
          title: Messages.TITLE_ERROR_UPDATE_REGISTER,
          subTitle: Messages.SUBTITLE_ERROR_UPDATE_REGISTER,
        },
      });
    }
  }

  async updateUserAfterUpdateDepartment(req: Request, res: Response) {
    const { name, ramal, idDepartment } = req.body;

    const item = await UserService.updateUserAfterUpdateDepartmentService(
      name,
      ramal,
      idDepartment
    );

    const response = res
      .status(204)
      .json("Todos os usuários desse departamento foram atualizados");

    return response;
  }

  async deleteUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const item = await UserService.deleteUser(id);

      const message = {
        title: Messages.TITLE_DELETE_REGISTER,
        subTitle: Messages.SUBTITLE_DELETE_REGISTER,
      };

      const response = res.status(200).json({
        message,
      });

      return { item, response };
    } catch (error: any) {
      return res.status(404).send({
        message: {
          title: Messages.TITLE_ERROR_DELETE_REGISTER,
          subTitle: Messages.SUBTITLE_ERROR_DELETE_REGISTER,
        },
      });
    }
  }

  async deleteUserAfterDepartment(req: Request, res: Response) {
    const { id } = req.params;

    await UserService.deleteUserAfterDepartmentService(id);

    return res.status(204).json("Todos os usuário foram deletados");
  }
}

export default UserController;
