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
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const middleware_1 = require("../middleware");
const departmentSchema_1 = require("../middleware/schemas/departmentSchema");
const department_controller_1 = __importDefault(require("../controllers/department_controller"));
const webSocketService_1 = __importDefault(require("../services/webSocketService"));
const department_route = express_1.default.Router();
const department_controller = new department_controller_1.default();
department_route
    .post(enum_1.Routes.GET_DEPARTMENT_BY_NAME, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.getDepartmentByName)
    .post(enum_1.Routes.GET_DEPARTMENT_BY_PAGE, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.getDepartmentsByPage)
    .post(enum_1.Routes.GET_ALL_DEPARTMENT, (0, middleware_1.verifyPermission)([
    enum_1.Permissions.SUPPORT,
    enum_1.Permissions.ADMIN,
    enum_1.Permissions.MANAGER,
]), department_controller.getAllDepartment)
    .get(enum_1.Routes.GET_DEPARTMENT_BY_ID, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.getDepartmentById)
    .post(enum_1.Routes.SAVE_DEPARTMENT, departmentSchema_1.departmentCreateSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentResponse = yield department_controller.createDepartment(req, res);
    const departments = departmentResponse.departments;
    const department = departmentResponse.department;
    const totalPages = departmentResponse.totalPages;
    departments.push(department);
    webSocketService_1.default.departmentEvent(req, departments, totalPages);
}))
    .put(enum_1.Routes.UPDATE_DEPARTMENT, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield department_controller.updateDepartment(req, res);
    // WebSocketService.departmentEvent(req, departments, totalPages);
}))
    .delete(enum_1.Routes.DELETE_DEPARTMENT, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield department_controller.deleteDepartment(req, res);
    // WebSocketService.departmentEvent(req, res, Event.DEPARTMENT);
}));
exports.default = department_route;
//# sourceMappingURL=department_route.js.map