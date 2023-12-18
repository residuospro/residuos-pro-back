import { Request } from "express";
import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { IDepartment, ISediments, IUserSchema } from "../utils/interfaces";

interface IResponse {
  department?: IDepartment;
  user?: IUserSchema;
  sediment?: ISediments;
  totalPages?: number;
}

class WebSocketService {
  static configureWebSocket(server: httpServer): any {
    const io = new Server(server, {
      cors: {
        origin: process.env.FRONT_REDISUOS_PRO,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    let token: string;

    io.on("connect", (socket) => {
      token = socket.handshake.headers.authorization;

      console.log("a user connected");
    });

    return { io, token };
  }

  static async createEvent(req: Request, response: IResponse, event: string) {
    const socket = req.io;

    const { idCompany, idDepartment } = req.body;

    const data: any = { idCompany, idDepartment };

    for (const key in response) {
      if (response[key as keyof IResponse]) {
        data[key as keyof IResponse] = response[key as keyof IResponse];
      }
    }

    socket.emit(event, { data });
  }
}

export default WebSocketService;
