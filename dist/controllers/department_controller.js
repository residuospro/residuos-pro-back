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
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
class DepartmentController {
    createDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = yield mongoose_1.default.startSession();
                session.startTransaction();
                let { name, responsible, email, ramal, idCompany, totalItems } = req.body;
                name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                const item = yield department_service_1.default.createDepartmentService({
                    name,
                    responsible,
                    email,
                    ramal,
                    idCompany,
                }, session);
                const itemsPerPage = 10;
                yield externalApi_service_1.default.createUserAfterDepartment({
                    responsible,
                    email,
                    ramal,
                    idCompany,
                    department: name,
                    idDepartment: item.id,
                });
                totalItems += 1;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                yield session.commitTransaction();
                session.endSession();
                return {
                    item,
                    totalPages,
                    res: res.status(201).json({
                        item,
                        totalPages,
                        message: {
                            title: enum_1.Messages.TITLE_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_REGISTER,
                        },
                    }),
                };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_ERROR_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_EXISTENT_DEPARTMENT,
                        },
                    });
                }
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    getDepartmentsByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { itemsPerPage, idCompany } = req.body;
                const departments = yield department_service_1.default.getDepartmentsByPageService(idCompany, itemsPerPage);
                return res.status(200).json(departments);
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_THERE_ARE_NO_RECORDS,
                            subTitle: enum_1.Messages.SUBTITLE_THERE_ARE_NO_RECORDS,
                        },
                    });
                }
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
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
                return res.status(500).json({ message: error.message });
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
                const item = yield department_service_1.default.updateDepartmentService([{ name, responsible, email, ramal, idCompany }], id);
                yield externalApi_service_1.default.updateUserAfterDepartment(name, ramal, id);
                return {
                    item,
                    res: res.status(201).json({
                        item,
                        message: {
                            title: enum_1.Messages.TITLE_UPDATE_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_UPDATE_REGISTER,
                        },
                    }),
                };
            }
            catch (error) {
                if (error instanceof handleError_1.default) {
                    return res.status(error.statusCode).json({
                        message: {
                            title: enum_1.Messages.TITLE_ERROR_UPDATE_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_ERROR_UPDATE_DEPARTMENT,
                        },
                    });
                }
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const item = yield department_service_1.default.deleteDepartmentService(id);
                yield externalApi_service_1.default.deleteUserAfterDepartment(id);
                return {
                    item,
                    res: res.status(201).json({
                        item,
                        message: {
                            title: enum_1.Messages.TITLE_DELETE_REGISTER,
                            subTitle: enum_1.Messages.SUBTITLE_DELETE_REGISTER,
                        },
                    }),
                };
            }
            catch (error) {
                return res.status(500).json({
                    message: {
                        title: enum_1.Messages.TITLE_ERROR,
                        subTitle: enum_1.Messages.SUBTITLE_ERROR,
                    },
                });
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department_controller.js.map