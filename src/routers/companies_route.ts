import express from "express";
import { Permissions, Routes } from "../utils/enum";
import { verifyPermission, validRequest } from "../middleware";
import { createCompanySchema } from "../middleware/schemas/companiesSchema";
import CompaniesController from "../controllers/companies_controller";

const companies_route = express.Router();
const companies_controller = new CompaniesController();

companies_route
  .get(
    Routes.GET_COMPANIES_DELETED,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.getCompanyDeleted
  )
  .get(
    Routes.GET_COMPANIES_BY_CNPJ,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.getCompanyByCnpj
  )
  .get(
    Routes.GET_COMPANIES,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.getAllCompanies
  )
  .get(
    Routes.GET_COMPANIES_BY_ID,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.getCompanyById
  )
  .post(
    Routes.SAVE_COMPANIES,
    createCompanySchema,
    validRequest,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.createCompany
  )
  .put(
    Routes.UPDATE_COMPANIES,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.updateCompany
  )
  .delete(
    Routes.DELETE_COMPANIES,
    verifyPermission([Permissions.SUPPORT]),
    companies_controller.deleteCompany
  );

export default companies_route;
