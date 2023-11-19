import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { Request, Response } from "express";
import DepartmentService from "./department_service";
import { Event } from "../utils/enum";

class WebSocketService {
  static configureWebSocket(server: httpServer): any {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:8080",
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

  static async departmentEvent(
    req: Request,
    departmentResponse: any,
    event: string
  ) {
    const io = req.io as any;

    const { idCompany } = req.body;

    const department = departmentResponse.department;
    const totalPages = departmentResponse.totalPages;

    io.emit(event, { department, totalPages, idCompany });
  }
}

export default WebSocketService;
