"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const middleware_1 = require("../middleware");
const companiesSchema_1 = require("../middleware/schemas/companiesSchema");
const companies_controller_1 = __importDefault(require("../controllers/companies_controller"));
const companies_route = express_1.default.Router();
const companies_controller = new companies_controller_1.default();
companies_route
    .get(enum_1.Routes.GET_COMPANIES_DELETED, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.getCompanyDeleted)
    .get(enum_1.Routes.GET_COMPANIES_BY_CNPJ, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.getCompanyByCnpj)
    .get(enum_1.Routes.GET_COMPANIES, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.getAllCompanies)
    .get(enum_1.Routes.GET_COMPANIES_BY_ID, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.getCompanyById)
    .post(enum_1.Routes.SAVE_COMPANIES, companiesSchema_1.createCompanySchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.createCompany)
    .put(enum_1.Routes.UPDATE_COMPANIES, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.updateCompany)
    .delete(enum_1.Routes.DELETE_COMPANIES, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), companies_controller.deleteCompany);
exports.default = companies_route;
//# sourceMappingURL=companies_route.js.map