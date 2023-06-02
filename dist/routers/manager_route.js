"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const user_controllers_1 = __importDefault(require("../controllers/user_controllers"));
const middleware_1 = require("../middleware");
const userSchema_1 = require("../middleware/schemas/userSchema");
const manager_route = express_1.default.Router();
const manager_controller = new user_controllers_1.default();
manager_route
    .get(enum_1.Routes.GET_MANAGER_BY_USERNAME, userSchema_1.getUsernameSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), manager_controller.getUserByUsername)
    .get(enum_1.Routes.GET_MANAGER, userSchema_1.getUserByRoleSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), manager_controller.getUsersByRole)
    .post(enum_1.Routes.SAVE_MANAGER, userSchema_1.userCreateSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), manager_controller.createUser)
    .put(enum_1.Routes.UPDATE_MANAGER, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), manager_controller.updateUsers)
    .delete(enum_1.Routes.DELETE_MANAGER, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT, enum_1.Permissions.ADMIN]), manager_controller.deleteUsers);
exports.default = manager_route;
//# sourceMappingURL=manager_route.js.map