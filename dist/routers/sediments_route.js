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
const sediments_controller_1 = __importDefault(require("../controllers/sediments_controller"));
const enum_1 = require("../utils/enum");
const middleware_1 = require("../middleware");
const webSocketService_1 = __importDefault(require("../services/webSocketService"));
const sediments_route = express_1.default.Router();
const sedments_controller = new sediments_controller_1.default();
sediments_route
    .post(enum_1.Routes.SAVE_SEDIMENTS, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sedimentResponse = yield sedments_controller.createSediments(req, res);
    webSocketService_1.default.createEvent(req, sedimentResponse, enum_1.Event.SEDIMENT_CREATED);
}))
    .post(enum_1.Routes.GET_SEDIMENTS_BY_PAGE, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), sedments_controller.getSedimentsByPage)
    .put(enum_1.Routes.UPDATE_SEDIMENTS, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sedimentResponse = yield sedments_controller.updateSediments(req, res);
    webSocketService_1.default.createEvent(req, sedimentResponse, enum_1.Event.UPDATED_SEDIMENT);
}))
    .post(enum_1.Routes.DELETE_SEDIMENT, (0, middleware_1.verifyPermission)([enum_1.Permissions.MANAGER]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sedimentResponse = yield sedments_controller.deleteSediments(req, res);
    webSocketService_1.default.createEvent(req, sedimentResponse, enum_1.Event.DELETED_SEDIMENT);
}));
exports.default = sediments_route;
//# sourceMappingURL=sediments_route.js.map