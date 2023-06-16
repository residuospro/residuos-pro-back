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
class DepartmentController {
    createDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, responsible, email, ramal, idCompany } = req.body;
                const department = yield department_service_1.default.createDepartmentService({
                    name,
                    responsible,
                    email,
                    ramal,
                    idCompany,
                });
                return res.status(201).json(department);
            }
            catch (error) {
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
                const { name, responsible, email, ramal } = req.body;
                const { id } = req.params;
                const department = yield department_service_1.default.updateDepartmentService([{ name, responsible, email, ramal }], id);
                return res.status(201).json(department);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const company = yield department_service_1.default.deleteDepartmentService(id);
                return res.status(200).json(company);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department_controller.js.map