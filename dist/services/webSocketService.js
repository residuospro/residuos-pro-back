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
const enum_1 = require("../utils/enum");
const pusher_1 = __importDefault(require("pusher"));
class WebSocketService {
    static configurePusherChannel() {
        const pusher = new pusher_1.default({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            useTLS: Boolean(process.env.PUSHER_USE_TLS),
        });
        return pusher;
    }
    static departmentEvent(req, departmentResponse, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const pusher = req.pusher;
            const { idCompany } = req.body;
            const department = departmentResponse.department;
            const totalPages = departmentResponse.totalPages;
            pusher.trigger(enum_1.Event.CHANNEL, event, {
                department,
                totalPages,
                idCompany,
            });
        });
    }
}
exports.default = WebSocketService;
//# sourceMappingURL=webSocketService.js.map