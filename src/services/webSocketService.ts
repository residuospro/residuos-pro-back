import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { Request, Response } from "express";

class WebSocketService {
  static configureWebSocket(server: httpServer): any {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:8081",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    let token: string;

    io.on("connection", (socket) => {
      token = socket.handshake.headers.authorization;

      console.log("a user connected");
    });

    return { io, token };
  }

  static emitEvent(req: Request, res: Response, event: string) {
    const io = req.io as any;
    const { idCompany } = req.body;

    io.emit(event, { idCompany });
  }
}

export default WebSocketService;
