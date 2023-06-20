import User from "../models/users";
import Department from "../models/department";
import { IDepartmentService, IUpdateDepartment } from "../utils/interfaces";
import HandleError from "../utils/errors/handleError";

class DepartmentService {
  static async createDepartmentService(department: IDepartmentService) {
    try {
      const { name, idCompany } = department;

      const existingDepartment = await Department.findOne({
        name,
        idCompany,
        delete: false,
      });

      if (existingDepartment != null) {
        throw new HandleError("Esse departamento já existe", 409);
      }

      const departments = new Department({
        ...department,
      });

      const savedDepartment = await departments.save();

      return savedDepartment;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getDepartmentsByPageService(
    idCompany: string,
    skip: number,
    itemsPerPage: number
  ) {
    try {
      const departments = await Department.find({
        idCompany,
        deleted: false,
      })
        .skip(skip)
        .limit(itemsPerPage);

      const totalDepartments = await Department.find({
        deleted: false,
      }).count();

      const totalPages = Math.ceil(totalDepartments / itemsPerPage);

      return { departments, totalPages };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getAllDepartmentsService(idCompany: string) {
    try {
      const departments = await Department.find({
        idCompany,
        deleted: false,
      });

      return departments;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getDepartmentByIdService(id: string) {
    try {
      const department = await Department.findById(id);

      return department;
    } catch (error: any) {
      throw new Error("Não há departamento pra essa busca");
    }
  }

  static async getDepartmentByNameService(info: any) {
    try {
      const { name, idCompany } = info;

      const department = await Department.findOne({
        name,
        idCompany,
        deleted: false,
      });

      return department;
    } catch (error: any) {
      throw new Error("Não há departamento pra essa busca");
    }
  }

  static async updateDepartmentService(
    updatedData: IUpdateDepartment[],
    id: string
  ) {
    try {
      const existingDepartment = await Department.findOne({
        name: updatedData[0].name,
        idCompany: updatedData[0].idCompany,
        delete: false,
      });

      if (existingDepartment != null) {
        throw new HandleError("Esse departamento já existe", 409);
      }

      let department = (await Department.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUpdateDepartment];

        if (value) {
          department[key] = value;
        }
      }

      const updateCompany = await department!.save();

      if (updatedData[0].name) {
        const user = await User.updateMany(
          { idDepartment: id },
          {
            department: updatedData[0].name,
          }
        );
      }

      return updateCompany;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error("Departamento não encontrado");
    }
  }

  static async deleteDepartmentService(id: string) {
    try {
      const currentDate = new Date();

      const department = await Department.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      await User.updateMany(
        { idDepartment: id },
        {
          deleted: true,
          deletedAt: currentDate,
        }
      );

      return department;
    } catch (error: any) {
      throw new Error("Departamento não encontrado");
    }
  }
}

export default DepartmentService;
