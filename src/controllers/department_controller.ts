import { Request, Response } from "express";
import DepartmentService from "../services/department_service";
import HandleError from "../utils/errors/handleError";
import ExternalApiService from "../services/externalApi_service";

class DepartmentController {
  async createDepartment(req: Request, res: Response) {
    try {
      let { name, responsible, email, ramal, idCompany } = req.body;

      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      const department = await DepartmentService.createDepartmentService({
        name,
        responsible,
        email,
        ramal,
        idCompany,
      });

      const page = 1;
      const itemsPerPage = 10;

      const skip = (page - 1) * itemsPerPage;

      const { totalPages } =
        await DepartmentService.getDepartmentsByPageService(
          idCompany,
          skip,
          itemsPerPage
        );

      return res.status(201).json({ department, totalPages });
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async getDepartmentsByPage(req: Request, res: Response) {
    try {
      const { page, itemsPerPage, idCompany } = req.body;
      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const departments = await DepartmentService.getDepartmentsByPageService(
        idCompany,
        skip,
        itemsPerPage
      );

      return res.status(200).json(departments);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
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
      return res.status(500).send({ message: error.message });
    }
  }

  async getDepartmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const department = await DepartmentService.getDepartmentByIdService(id);

      return res.status(200).json(department);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getDepartmentByName(req: Request, res: Response) {
    try {
      const { idCompany, name } = req.body;

      const department = await DepartmentService.getDepartmentByNameService({
        name,
        idCompany,
      });

      return res.status(200).json(department);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
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

      return res.status(201).json(department);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async deleteDepartment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await DepartmentService.deleteDepartmentService(id);

      await ExternalApiService.deleteUserAfterDepartment(id);

      return res.status(204).json("Departamento excluido com sucesso");
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default DepartmentController;
