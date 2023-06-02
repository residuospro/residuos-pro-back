"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const companies_service_1 = __importDefault(require("../services/companies_service"));
class CompaniesController {
    createCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, address, cnpj, fantasyName, street, state, cep, city, country, phone, email, } = req.body;
                const company = yield companies_service_1.default.createCompanyService({
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
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getAllCompanies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const companies = yield companies_service_1.default.getAllCompaniesService(skip, itemsPerPage);
                return res.status(201).json(companies);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getCompanyById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const company = yield companies_service_1.default.getCompanyByIdService(id);
                return res.status(201).json(company);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getCompanyByCnpj(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cnpj } = req.query;
                const company = yield companies_service_1.default.getCompanyByCnpjService(Number(cnpj));
                return res.status(201).json(company);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getCompanyDeleted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const companies = yield companies_service_1.default.getCompanyDeletedService(skip, itemsPerPage);
                return res.status(201).json(companies);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    updateCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, address, cnpj, fantasyName, street, state, cep, city, country, phone, email, } = req.body;
                const { id } = req.params;
                const company = yield companies_service_1.default.updateCompanyService([
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
                ], id);
                return res.status(200).json(company);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    deleteCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const company = yield companies_service_1.default.deleteCompanyService(id);
                return res.status(200).json(company);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.default = CompaniesController;
//# sourceMappingURL=companies_controller.js.map