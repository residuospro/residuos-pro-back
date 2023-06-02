import { Request, Response } from "express";
import DepartmentService from "../services/department_service";

class DepartmentController {
  async createDepartment(req: Request, res: Response) {
    try {
      const { name, responsible, email, ramal, idCompany } = req.body;

      const department = await DepartmentService.createDepartmentService({
        name,
        responsible,
        email,
        ramal,
        idCompany,
      });

      return res.status(201).json(department);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
  async getAllDepartmentsByCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { page, itemsPerPage } = req.body;
      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const departments =
        await DepartmentService.getAllDepartmentByCompanyService(
          id,
          skip,
          itemsPerPage
        );

      return res.status(201).json(departments);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getDepartmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const department = await DepartmentService.getDepartmentByIdService(id);

      return res.status(201).json(department);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getDepartmentByName(req: Request, res: Response) {
    try {
      const { idCompany, name } = req.query;

      const department = await DepartmentService.getDepartmentByNameService({
        name,
        idCompany,
      });

      return res.status(201).json(department);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async updateDepartment(req: Request, res: Response) {
    try {
      const { name, responsible, email, ramal } = req.body;

      const { id } = req.params;

      const department = await DepartmentService.updateDepartmentService(
        [{ name, responsible, email, ramal }],
        id
      );

      return res.status(201).json(department);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async deleteDepartment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const company = await DepartmentService.deleteDepartmentService(id);

      return res.status(200).json(company);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default DepartmentController;
