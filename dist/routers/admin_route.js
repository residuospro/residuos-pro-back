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
const admin_route = express_1.default.Router();
const admin_controller = new user_controllers_1.default();
admin_route
    .get(enum_1.Routes.GET_ADMIN_BY_USERNAME, userSchema_1.getUsernameSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), admin_controller.getUserByUsername)
    .get(enum_1.Routes.GET_ADMIN, userSchema_1.getUserByRoleSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), admin_controller.getUsersByRole)
    .post(enum_1.Routes.SAVE_ADMIN, userSchema_1.userCreateSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), admin_controller.createUser)
    .put(enum_1.Routes.UPDATE_ADMIN, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), admin_controller.updateUsers)
    .delete(enum_1.Routes.DELETE_ADMIN, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), admin_controller.deleteUsers);
exports.default = admin_route;
//# sourceMappingURL=admin_route.js.map