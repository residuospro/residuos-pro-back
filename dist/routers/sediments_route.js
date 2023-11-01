"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sediments_controller_1 = __importDefault(require("../controllers/sediments_controller"));
const enum_1 = require("../utils/enum");
const middleware_1 = require("../middleware");
const sediments_route = express_1.default.Router();
const sedments_controller = new sediments_controller_1.default();
sediments_route
    .post(enum_1.Routes.SAVE_SEDIMENTS, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), sedments_controller.createSediments)
    .post(enum_1.Routes.GET_SEDIMENTS_BY_PAGE, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), sedments_controller.getSedimentsByPage)
    .post(enum_1.Routes.GET_NAME_OF_SEDIMENTS, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), sedments_controller.getNameOfSediments);
exports.default = sediments_route;
//# sourceMappingURL=sediments_route.js.map