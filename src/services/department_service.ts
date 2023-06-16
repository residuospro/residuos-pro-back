import Department from "../models/department";
import {
  IDepartment,
  IDepartmentService,
  IUpdateDepartment,
} from "../utils/interfaces";

class DepartmentService {
  static async createDepartmentService(department: IDepartmentService) {
    try {
      const { name, idCompany } = department;

      const existingCompany = await Department.findOne({ name, idCompany });

      if (existingCompany != null) {
        throw new Error("Esse departamento já existe");
      }

      const departments = new Department({
        ...department,
      });

      const savedDepartment = await departments.save();

      return savedDepartment;
    } catch (error: any) {
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

      if (departments.length == 0) {
        throw new Error("Não há departamentos pra essa busca");
      }

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

      if (departments.length == 0) {
        throw new Error("Não há departamentos pra essa busca");
      }

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
      let department = (await Department.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof IUpdateDepartment];

        if (value) {
          department[key] = value;
        }
      }

      const updateCompany = await department!.save();

      return updateCompany;
    } catch (error: any) {
      throw new Error("Departamento não encontrado");
    }
  }

  static async deleteDepartmentService(id: string) {
    try {
      const currentDate = new Date();

      const company = await Department.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return company;
    } catch (error: any) {
      throw new Error("Departamento não encontrado");
    }
  }
}

export default DepartmentService;
