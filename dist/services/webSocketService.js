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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class WebSocketService {
    static configureWebSocket(server) {
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: "http://localhost:8080",
                credentials: true,
                methods: ["GET", "POST", "PUT", "DELETE"],
            },
        });
        let token;
        io.on("connection", (socket) => {
            token = socket.handshake.headers.authorization;
            console.log("a user connected");
        });
        return { io, token };
    }
    static createEvent(req, response, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const socket = req.io;
            const { idCompany, idDepartment } = req.body;
            const item = response.item;
            const totalPages = response.totalPages;
            socket.emit(event, {
                item,
                totalPages,
                idCompany,
                idDepartment,
            });
        });
    }
}
exports.default = WebSocketService;
//# sourceMappingURL=webSocketService.js.map