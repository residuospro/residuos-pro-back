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
const companies_1 = __importDefault(require("../models/companies"));
class CompaniesService {
    static createCompanyService(company) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cnpj } = company;
                const existingCompany = yield companies_1.default.findOne({ cnpj });
                if (existingCompany != null) {
                    throw new Error("Essa empresa já existe");
                }
                const companies = new companies_1.default(Object.assign({}, company));
                const savedCompany = yield companies.save();
                return savedCompany;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllCompaniesService(skip, itemsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield companies_1.default.find({ deleted: false })
                    .skip(skip)
                    .limit(itemsPerPage);
                const totalCompanies = yield companies_1.default.find({ deleted: false }).count();
                const totalPages = Math.ceil(totalCompanies / itemsPerPage);
                if (companies.length == 0) {
                    throw new Error("Não há empresas pra essa busca");
                }
                return { companies, totalPages };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCompanyByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield companies_1.default.findById(id);
                return company;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCompanyByCnpjService(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield companies_1.default.findOne({ cnpj, deleted: false });
                if (company)
                    return company;
                throw new Error("Empresa não encontrada");
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCompanyDeletedService(skip, itemsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield companies_1.default.find({ deleted: true })
                    .skip(skip)
                    .limit(itemsPerPage);
                const totalCompanies = yield companies_1.default.find({ deleted: true }).count();
                const totalPages = Math.ceil(totalCompanies / itemsPerPage);
                if (companies.length == 0) {
                    throw new Error("Não há empresas pra essa busca");
                }
                return { companies, totalPages };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateCompanyService(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let company = (yield companies_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        company[key] = value;
                    }
                }
                const updateCompany = yield company.save();
                return updateCompany;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static deleteCompanyService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const company = yield companies_1.default.findByIdAndUpdate(id, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return company;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
}
exports.default = CompaniesService;
//# sourceMappingURL=companies_service.js.map