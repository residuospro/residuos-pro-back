import bcrypt from "bcrypt";
import User from "../models/users";
import { IUser, UserDataService } from "../utils/interfaces";
import { Permissions } from "../utils/enum";
import HandleError from "../utils/errors/handleError";

class UserService {
  static async createUser(userData: UserDataService) {
    try {
      const { username, idCompany } = userData;

      // Verifique se o username já existe no banco de dados
      const existingUser = await User.findOne({
        username,
        idCompany,
        deleted: false,
      });

      if (existingUser != null) {
        throw new HandleError("Nome de usuário já existe", 409);
      }

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      if (userData.role[0] == Permissions.ADMIN) {
        userData.role = [Permissions.MANAGER];
      } else if (userData.role[0] == Permissions.MANAGER) {
        userData.role = [Permissions.COLLABORATOR];
      } else {
        throw new Error("Você não possui permissão para criar usuários");
      }

      const newUser = new User({
        ...userData,
      });

      const savedUser = await newUser.save();

      return savedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getUsers(
    role: string,
    skip: number,
    itemsPerPage: number,
    idCompany: string,
    idDepartment: string
  ) {
    try {
      const query: any = { role: { $in: [role] }, deleted: false };

      if (idCompany) {
        query["idCompany"] = idCompany;
      }

      if (idDepartment) {
        query["idDepartment"] = idDepartment;
      }

      const users = await User.find(query).skip(skip).limit(itemsPerPage);

      if (users.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalUsers = await User.find(query).count();

      const totalPages = Math.ceil(totalUsers / itemsPerPage);

      return { users, totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getUsername(users: any) {
    try {
      const { username, idCompany, role } = users;

      const query: any = {
        username,
        idCompany,
        role: { $in: [role] },
        deleted: false,
      };

      const user = await User.findOne(query);

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getAllUsernamesService(idCompany: string, role: string[]) {
    try {
      const users = await User.find({
        idCompany,
        role: { $in: [role] },
        deleted: false,
      });

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUser(updatedData: IUser[], id: string) {
    try {
      let existingUser: any;

      if (updatedData[0].username) {
        existingUser = await User.findOne({
          username: updatedData[0].username,
          deleted: false,
        });
      }

      if (existingUser != null) {
        throw new HandleError("Nome de usuário já existe", 409);
      }

      let user = (await User.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUser];

        if (value) {
          user[key] = value;
        }
      }

      const updatedUser = await user!.save();

      return updatedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async updateUserAfterUpdateDepartment(
    name: string,
    ramal: number,
    id: string
  ) {
    if (name) {
      const user = await User.updateMany(
        { idDepartment: id },
        {
          department: name,
        }
      );
    }

    if (ramal) {
      const user = await User.updateMany(
        { idDepartment: id },
        {
          ramal,
        }
      );
    }
  }

  static async deleteUser(userId: string) {
    try {
      const currentDate = new Date();

      const user = await User.findByIdAndUpdate(
        userId,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return user;
    } catch (error: any) {
      throw new Error("Usuário não encontrado");
    }
  }
}

export default UserService;
