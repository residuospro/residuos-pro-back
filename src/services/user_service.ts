import User from "../models/users";
import { IUser, UserDataService } from "../utils/interfaces";
import { Actions } from "../utils/enum";
import HandleError from "../utils/errors/handleError";
import PermissionMapper from "../utils/mapPermission";
import EmailService from "./email_service";
import mongoose from "mongoose";
import HashedPassword from "../utils/hashedPassword";

class UserService {
  static async createUser(userData: UserDataService) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const bcrypt = new HashedPassword();

      const { service, email, idCompany } = userData;

      userData.password = await bcrypt.hashedPassword(userData.password);

      userData.role = PermissionMapper.getCreatablePermission(userData.role[0]);

      const newUser = new User({
        ...userData,
      });

      const user = await newUser.save({ session });

      if (user) {
        await EmailService.sendEmailToRegisterOrChangePassword(
          email,
          service,
          user.id,
          Actions.CREATE,
          idCompany
        );
      }

      const itemsPerPage = 10;

      const totalPages = await UserService.userCountService(
        idCompany,
        null,
        userData.role[0],
        itemsPerPage,
        false
      );

      await session.commitTransaction();
      session.endSession();

      return { user, totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getUsers(
    role: string,
    itemsPerPage: number,
    idCompany: string,
    idDepartment: string,
    throwException: boolean
  ) {
    try {
      const userService = new UserService();

      const query = userService.createQuery(idCompany, idDepartment, role);

      const users = await User.find(query);

      if (users.length == 0 && throwException) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalPages = await this.userCountService(
        idCompany,
        idDepartment,
        role,
        itemsPerPage,
        throwException
      );

      return { users, totalPages };
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async userCountService(
    idCompany: string,
    idDepartment: string,
    role: string,
    itemsPerPage: number,
    throwException: boolean
  ) {
    try {
      const userService = new UserService();

      const query = userService.createQuery(idCompany, idDepartment, role);

      let totalUsers = await User.find(query).count();

      if (!throwException) totalUsers += 1;

      const totalPages = Math.ceil(totalUsers / itemsPerPage);

      return totalPages;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private createQuery(idCompany: string, idDepartment: string, role: string) {
    const query: any = { role: { $in: [role] }, deleted: false };

    if (idCompany) {
      query["idCompany"] = idCompany;
    }

    if (idDepartment) {
      query["idDepartment"] = idDepartment;
    }

    return query;
  }

  static async validateUsernameService(
    username: string,
    id: string
  ): Promise<null> {
    try {
      const user = await User.findById(id, { deleted: false });

      const idCompany = user.idCompany;

      const existingUsername = await User.findOne({
        username,
        idCompany,
        deleted: false,
      });

      if (existingUsername != null) {
        throw new HandleError("Nome de usuário já existe", 409);
      }

      return null;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getUsername(users: any) {
    try {
      const { username, idCompany, role } = users;

      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username);

      let query: any = {
        idCompany,
        role: { $in: [role] },
        deleted: false,
      };

      if (regex) {
        query = { ...query, email: username };
      } else {
        query = { ...query, username };
      }

      const user = await User.find(query);

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getAllUsernamesService(
    idCompany: string,
    role: string[],
    idDepartment: string
  ) {
    try {
      let query: any = {
        idCompany,
        role: { $in: [role] },
        deleted: false,
      };

      if (idDepartment) {
        query = { ...query, idDepartment };
      }

      const users = await User.find(query);

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async finalizeRegistrationService(updatedData: IUser[], id: string) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      let user: any;

      const bcrypt = new HashedPassword();

      if (id) {
        user = await User.findById(id, { deleted: false });
      } else {
        user = await User.findOne({
          username: updatedData[0].username,
          deleted: false,
        });
      }

      if (user == null) {
        throw new HandleError("Username não encontrado", 404);
      }

      user.password = await bcrypt.hashedPassword(updatedData[0].password);

      user.username = updatedData[0].username;

      await user!.save();

      await session.commitTransaction();
      session.endSession();

      return user;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async updatePasswordService(id: string, password: string) {
    try {
      const bcrypt = new HashedPassword();

      const hashedPassword = await bcrypt.hashedPassword(password);

      const user = await User.findById(id);

      user.password = hashedPassword;

      const updatedUser = await user.save();

      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUser(updatedData: IUser[], id: string) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      const { email, service, idCompany } = updatedData[0];

      let user = (await User.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUser];

        if (value) {
          user[key] = value;
        }
      }

      const updatedUser = await user!.save();

      if (!user.username && email) {
        await EmailService.sendEmailToRegisterOrChangePassword(
          email,
          service,
          id,
          Actions.CREATE,
          idCompany
        );
      }

      await session.commitTransaction();
      session.endSession();

      return updatedUser;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Usuário não encontrado");
    }
  }

  static async updateUserAfterUpdateDepartmentService(
    name: string,
    ramal: number,
    id: string
  ) {
    try {
      let user: any;

      if (name) {
        await User.updateMany(
          { idDepartment: id },
          {
            department: name,
          }
        );

        user = await User.find({
          idDepartment: id,
          department: name,
          deleted: false,
        });
      }

      if (ramal) {
        await User.updateMany(
          { idDepartment: id },
          {
            ramal,
          }
        );

        user = await User.find({
          idDepartment: id,
          ramal,
          deleted: false,
        });
      }

      return user;
    } catch (error) {
      return error;
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

  static async deleteUserAfterDepartmentService(idDepartment: string) {
    try {
      await User.updateMany(
        { idDepartment },
        { deleted: true, deletedAt: new Date() }
      );

      const user = await User.find({ idDepartment });

      return user;
    } catch (error) {
      return error;
    }
  }

  static async checkIfUserExists(idCompany: string, email: string) {
    const user = await User.findOne({ idCompany, email, deleted: false });

    return user ? true : false;
  }

  static async createNewPasswordService(userInfo: string) {
    try {
      let query: any = {
        deleted: false,
      };

      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo);

      if (regex) {
        query = { ...query, email: userInfo };
      } else {
        query = { ...query, username: userInfo };
      }

      const user = await User.findOne(query);

      if (!user) {
        throw new HandleError("Usuário não encontrado", 404);
      }

      return { id: user.id, email: user.email };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }
}

export default UserService;
