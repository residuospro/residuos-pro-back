import { Request, Response } from "express";
import UserService from "../services/user_service";
import { IUser } from "../utils/interfaces";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        name,
        idDepartment,
        idCompany,
        role,
        ramal,
        username,
        password,
        email,
      } = req.body;

      // Chame o método do service para criar o usuário
      const createUser = await UserService.createUser({
        name,
        idDepartment,
        idCompany,
        role,
        ramal,
        username,
        password,
        email,
      });

      return res.status(201).json(createUser);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
  async getUsersByRole(req: Request, res: Response) {
    try {
      const { page, itemsPerPage, role, idCompany, idDepartment } = req.body;
      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const users = await UserService.getUsers(
        role,
        skip,
        itemsPerPage,
        idCompany,
        idDepartment
      );

      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getUserByUsername(req: Request, res: Response) {
    try {
      const { username, idCompany, idDepartment } = req.query;

      const user = await UserService.getUsername({
        username,
        idCompany,
        idDepartment,
      });

      if (user) {
        return res.status(200).json(user);
      }

      return res.status(404).send({ message: "Usuário não encontrado" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async updateUsers(req: Request, res: Response) {
    try {
      const { name, username, password, ramal, email }: IUser = req.body;

      const { id } = req.params;

      const user = await UserService.updateUser(
        [{ name, username, password, ramal, email }],
        id
      );

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).send({ message: error.message });
    }
  }

  async deleteUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await UserService.deleteUser(id);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).send({ message: error.message });
    }
  }
}

export default UserController;
