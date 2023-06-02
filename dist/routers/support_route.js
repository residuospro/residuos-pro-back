"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enum_1 = require("../utils/enum");
const user_controllers_1 = __importDefault(require("../controllers/user_controllers"));
const support_route = express_1.default.Router();
const support_controller = new user_controllers_1.default();
support_route.post(enum_1.Routes.SAVE_SUPPORT, support_controller.createUser);
exports.default = support_route;
//# sourceMappingURL=support_route.js.map