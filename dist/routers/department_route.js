"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const middleware_1 = require("../middleware");
const departmentSchema_1 = require("../middleware/schemas/departmentSchema");
const department_controller_1 = __importDefault(require("../controllers/department_controller"));
const department_route = express_1.default.Router();
const department_controller = new department_controller_1.default();
department_route
    .get(enum_1.Routes.GET_DEPARTMENT_BY_NAME, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.getDepartmentByName)
    .post(enum_1.Routes.GET_ALL_DEPARTMENT, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.getAllDepartmentsByCompany)
    .get(enum_1.Routes.GET_DEPARTMENT_BY_ID, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.getDepartmentById)
    .post(enum_1.Routes.SAVE_DEPARTMENT, departmentSchema_1.departmentCreateSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.createDepartment)
    .put(enum_1.Routes.UPDATE_DEPARTMENT, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.updateDepartment)
    .delete(enum_1.Routes.DELETE_DEPARTMENT, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), department_controller.deleteDepartment);
exports.default = department_route;
//# sourceMappingURL=department_route.js.map