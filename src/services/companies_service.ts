import Companies from "../models/companies";
import { ICompany } from "../utils/interfaces";

class CompaniesService {
  static async createCompanyService(company: any) {
    try {
      const { cnpj } = company;

      const existingCompany = await Companies.findOne({ cnpj });

      if (existingCompany != null) {
        throw new Error("Essa empresa já existe");
      }

      const companies = new Companies({
        ...company,
      });

      const savedCompany = await companies.save();

      return savedCompany;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getAllCompaniesService(skip: number, itemsPerPage: number) {
    try {
      const companies = await Companies.find({ deleted: false })
        .skip(skip)
        .limit(itemsPerPage);

      const totalCompanies = await Companies.find({ deleted: false }).count();

      const totalPages = Math.ceil(totalCompanies / itemsPerPage);

      if (companies.length == 0) {
        throw new Error("Não há empresas pra essa busca");
      }

      return { companies, totalPages };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCompanyByIdService(id: string) {
    try {
      const company = await Companies.findById(id);

      return company;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCompanyByCnpjService(cnpj: number) {
    try {
      const company = await Companies.findOne({ cnpj, deleted: false });

      if (company) return company;

      throw new Error("Empresa não encontrada");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCompanyDeletedService(skip: number, itemsPerPage: number) {
    try {
      const companies = await Companies.find({ deleted: true })
        .skip(skip)
        .limit(itemsPerPage);

      const totalCompanies = await Companies.find({ deleted: true }).count();

      const totalPages = Math.ceil(totalCompanies / itemsPerPage);

      if (companies.length == 0) {
        throw new Error("Não há empresas pra essa busca");
      }

      return { companies, totalPages };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateCompanyService(updatedData: ICompany[], id: string) {
    try {
      let company = (await Companies.findById(id)) as any;

      for (const key in updatedData[0]) {
        const value = updatedData[0][key as keyof ICompany];

        if (value) {
          company[key] = value;
        }
      }

      const updateCompany = await company!.save();

      return updateCompany;
    } catch (error: any) {
      throw new Error("Usuário não encontrado");
    }
  }

  static async deleteCompanyService(id: string) {
    try {
      const currentDate = new Date();

      const company = await Companies.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return company;
    } catch (error: any) {
      throw new Error("Usuário não encontrado");
    }
  }
}

export default CompaniesService;
