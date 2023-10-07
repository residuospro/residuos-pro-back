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
const department_service_1 = __importDefault(require("../services/department_service"));
const handleError_1 = __importDefault(require("../utils/errors/handleError"));
const externalApi_service_1 = __importDefault(require("../services/externalApi_service"));
class DepartmentController {
    createDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, responsible, email, ramal, idCompany } = req.body;
                name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                const department = yield department_service_1.default.createDepartmentService({
                    name,
                    responsible,
                    email,
                    ramal,
                    idCompany,
                });
                const page = 1;
                const itemsPerPage = 10;
                const skip = (page - 1) * itemsPerPage;
                const { totalPages } = yield department_service_1.default.getDepartmentsByPageService(idCompany, skip, itemsPerPage);
                return res.status(201).json({ department, totalPages });
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getDepartmentsByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage, idCompany } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const departments = yield department_service_1.default.getDepartmentsByPageService(idCompany, skip, itemsPerPage);
                return res.status(200).json(departments);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getAllDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCompany } = req.body;
                const departments = yield department_service_1.default.getAllDepartmentsService(idCompany);
                return res.status(200).json(departments);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getDepartmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const department = yield department_service_1.default.getDepartmentByIdService(id);
                return res.status(200).json(department);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getDepartmentByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCompany, name } = req.body;
                const department = yield department_service_1.default.getDepartmentByNameService({
                    name,
                    idCompany,
                });
                return res.status(200).json(department);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    updateDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, responsible, email, ramal, idCompany } = req.body;
                if (name) {
                    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                }
                const { id } = req.params;
                const department = yield department_service_1.default.updateDepartmentService([{ name, responsible, email, ramal, idCompany }], id);
                yield externalApi_service_1.default.updateUserAfterDepartment(name, ramal, id);
                return res.status(201).json(department);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                return res.status(500).send({ message: error.message });
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield department_service_1.default.deleteDepartmentService(id);
                yield externalApi_service_1.default.deleteUserAfterDepartment(id);
                return res.status(204).json("Departamento excluido com sucesso");
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department_controller.js.map