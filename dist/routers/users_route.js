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
const user_route = express_1.default.Router();
const user_controller = new user_controllers_1.default();
user_route
    .get(enum_1.Routes.GET_USER_BY_USERNAME, userSchema_1.getUsernameSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), user_controller.getUserByUsername)
    .post(enum_1.Routes.GET_USERS, userSchema_1.getUserByRoleSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([
    enum_1.Permissions.SUPPORT,
    enum_1.Permissions.ADMIN,
    enum_1.Permissions.MANAGER,
]), user_controller.getUsersByRole)
    .post(enum_1.Routes.GET_ALL_USERNAMES, (0, middleware_1.verifyPermission)([
    enum_1.Permissions.ADMIN,
    enum_1.Permissions.MANAGER,
    enum_1.Permissions.SUPPORT,
]), user_controller.getAllUsernames)
    .post(enum_1.Routes.SAVE_USER, userSchema_1.userCreateSchema, middleware_1.validRequest, (0, middleware_1.verifyPermission)([
    enum_1.Permissions.SUPPORT,
    enum_1.Permissions.ADMIN,
    enum_1.Permissions.MANAGER,
]), user_controller.createUser)
    .put(enum_1.Routes.UPDATE_USER, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), user_controller.updateUsers)
    .delete(enum_1.Routes.DELETE_USER, (0, middleware_1.verifyPermission)([enum_1.Permissions.SUPPORT]), user_controller.deleteUsers);
exports.default = user_route;
//# sourceMappingURL=users_route.js.map