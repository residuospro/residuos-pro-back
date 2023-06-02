import bcrypt from "bcrypt";
import User from "../models/users";
import { IUser, UserDataService } from "../utils/interfaces";

class UserService {
  static async createUser(userData: UserDataService) {
    try {
      const { username, idCompany } = userData;

      // Verifique se o username já existe no banco de dados
      const existingUser = await User.findOne({ username, idCompany });

      if (existingUser != null) {
        throw new Error("Nome de usuário já existe");
      }

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      userData.password = hashedPassword;

      const newUser = new User({
        ...userData,
      });

      const savedUser = await newUser.save();

      return savedUser;
    } catch (error: any) {
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

      const totalUsers = await User.find({ Roles: { $in: [role] } }).count();

      const totalPages = Math.ceil(totalUsers / itemsPerPage);

      if (users.length == 0) {
        throw new Error("Não há usuários pra essa busca");
      }

      return { users, totalPages };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getUsername(users: any) {
    try {
      const { username, idCompany, idDepartment } = users;

      const query: any = { username, idCompany, deleted: false };

      if (idDepartment) {
        query["idDepartment"] = idDepartment;
      }

      const user = await User.findOne(query);

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateUser(updatedData: IUser[], id: string) {
    try {
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
      throw new Error("Usuário não encontrado");
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
