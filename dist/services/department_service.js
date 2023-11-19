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
const department_1 = __importDefault(require("../models/department"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
class DepartmentService {
    static createDepartmentService(department, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCompany } = department;
                const existingDepartment = yield this.validatesIfTheDepartmentExists(idCompany, name);
                if (existingDepartment) {
                    throw new handleError_1.default("Esse departamento já existe", 409);
                }
                const departments = new department_1.default(Object.assign({}, department));
                const savedDepartment = yield departments.save({ session });
                return savedDepartment;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getDepartmentsByPageService(idCompany, itemsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield department_1.default.find({
                    idCompany,
                    deleted: false,
                });
                if (departments.length == 0) {
                    throw new handleError_1.default("Não há registros para essa busca", 404);
                }
                let totalDepartments = yield department_1.default.find({
                    deleted: false,
                    idCompany,
                }).count();
                const totalPages = Math.ceil(totalDepartments / itemsPerPage);
                return { departments, totalPages };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error(error.message);
            }
        });
    }
    static getAllDepartmentsService(idCompany) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield department_1.default.find({
                    idCompany,
                    deleted: false,
                });
                return departments;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getDepartmentByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield department_1.default.findById(id);
                return department;
            }
            catch (error) {
                throw new Error("Não há departamento pra essa busca");
            }
        });
    }
    static getDepartmentByNameService(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCompany } = info;
                const department = yield department_1.default.findOne({
                    name,
                    idCompany,
                    deleted: false,
                });
                return department;
            }
            catch (error) {
                throw new Error("Não há departamento pra essa busca");
            }
        });
    }
    static updateDepartmentService(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (updatedData[0].name) {
                    const existingDepartment = yield this.validatesIfTheDepartmentExists(updatedData[0].idCompany, updatedData[0].name);
                    if (existingDepartment) {
                        throw new handleError_1.default("Esse departamento já existe", 409);
                    }
                }
                let department = (yield department_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        department[key] = value;
                    }
                }
                const updateCompany = yield department.save();
                return updateCompany;
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    throw error;
                }
                throw new Error("Departamento não encontrado");
            }
        });
    }
    static validatesIfTheDepartmentExists(idCompany, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const validate = yield department_1.default.find({
                idCompany,
                deleted: false,
            });
            const existingDepartment = validate.filter((e) => e._doc.name == name);
            if (existingDepartment.length > 0)
                return true;
            return false;
        });
    }
    static deleteDepartmentService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const department = yield department_1.default.findByIdAndUpdate(id, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return department;
            }
            catch (error) {
                throw new Error("Departamento não encontrado");
            }
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department_service.js.map