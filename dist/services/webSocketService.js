"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class WebSocketService {
    static configureWebSocket(server) {
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: "http://localhost:8081",
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
    static emitEvent(req, res, event) {
        const io = req.io;
        const { idCompany } = req.body;
        io.emit(event, { idCompany });
    }
}
exports.default = WebSocketService;
//# sourceMappingURL=webSocketService.js.map