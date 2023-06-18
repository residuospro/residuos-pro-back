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
const users_1 = __importDefault(require("../models/users"));
const department_1 = __importDefault(require("../models/department"));
class DepartmentService {
    static createDepartmentService(department) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idCompany } = department;
                const existingCompany = yield department_1.default.findOne({ name, idCompany });
                if (existingCompany != null) {
                    throw new Error("Esse departamento já existe");
                }
                const departments = new department_1.default(Object.assign({}, department));
                const savedDepartment = yield departments.save();
                return savedDepartment;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getDepartmentsByPageService(idCompany, skip, itemsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield department_1.default.find({
                    idCompany,
                    deleted: false,
                })
                    .skip(skip)
                    .limit(itemsPerPage);
                const totalDepartments = yield department_1.default.find({
                    deleted: false,
                }).count();
                const totalPages = Math.ceil(totalDepartments / itemsPerPage);
                return { departments, totalPages };
            }
            catch (error) {
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
                let department = (yield department_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        department[key] = value;
                    }
                }
                const updateCompany = yield department.save();
                if (updatedData[0].name) {
                    const user = yield users_1.default.updateMany({ idDepartment: id }, {
                        department: updatedData[0].name,
                    });
                    console.log(user);
                }
                return updateCompany;
            }
            catch (error) {
                throw new Error("Departamento não encontrado");
            }
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
                yield users_1.default.updateMany({ idDepartment: id }, {
                    deleted: true,
                    deletedAt: currentDate,
                });
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