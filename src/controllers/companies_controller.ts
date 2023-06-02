import { Request, Response } from "express";
import CompaniesService from "../services/companies_service";

class CompaniesController {
  async createCompany(req: Request, res: Response) {
    try {
      const {
        name,
        address,
        cnpj,
        fantasyName,
        street,
        state,
        cep,
        city,
        country,
        phone,
        email,
      } = req.body;

      const company = await CompaniesService.createCompanyService({
        name,
        address,
        cnpj,
        fantasyName,
        street,
        state,
        cep,
        city,
        country,
        phone,
        email,
      });

      return res.status(201).json(company);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
  async getAllCompanies(req: Request, res: Response) {
    try {
      const { page, itemsPerPage } = req.body;
      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const companies = await CompaniesService.getAllCompaniesService(
        skip,
        itemsPerPage
      );

      return res.status(201).json(companies);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getCompanyById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const company = await CompaniesService.getCompanyByIdService(id);

      return res.status(201).json(company);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getCompanyByCnpj(req: Request, res: Response) {
    try {
      const { cnpj } = req.query;

      const company = await CompaniesService.getCompanyByCnpjService(
        Number(cnpj)
      );

      return res.status(201).json(company);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async getCompanyDeleted(req: Request, res: Response) {
    try {
      const { page, itemsPerPage } = req.body;
      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const companies = await CompaniesService.getCompanyDeletedService(
        skip,
        itemsPerPage
      );

      return res.status(201).json(companies);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const {
        name,
        address,
        cnpj,
        fantasyName,
        street,
        state,
        cep,
        city,
        country,
        phone,
        email,
      } = req.body;

      const { id } = req.params;

      const company = await CompaniesService.updateCompanyService(
        [
          {
            name,
            address,
            cnpj,
            fantasyName,
            street,
            state,
            cep,
            city,
            country,
            phone,
            email,
          },
        ],
        id
      );

      return res.status(200).json(company);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async deleteCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const company = await CompaniesService.deleteCompanyService(id);

      return res.status(200).json(company);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default CompaniesController;
