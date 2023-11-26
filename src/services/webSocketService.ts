import { Event } from "../utils/enum";
import { Request } from "express";
import Pusher from "pusher";

class WebSocketService {
  static configurePusherChannel() {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: Boolean(process.env.PUSHER_USE_TLS),
    });

    return pusher;
  }

  static async departmentEvent(
    req: Request,
    departmentResponse: any,
    event: string
  ) {
    const pusher = req.pusher as any;

    const { idCompany } = req.body;

    const department = departmentResponse.department;
    const totalPages = departmentResponse.totalPages;

    pusher.trigger(Event.CHANNEL, event, {
      department,
      totalPages,
      idCompany,
    });
  }

  static async sedimentEvent(
    req: Request,
    sedimentResponse: any,
    event: string
  ) {
    const pusher = req.pusher as any;

    const { idCompany, idDepartment } = req.body;

    const sediment = sedimentResponse.sediments;
    const totalPages = sedimentResponse.totalPages;

    pusher.trigger(Event.CHANNEL, event, {
      sediment,
      totalPages,
      idCompany,
      idDepartment,
    });
  }
}

export default WebSocketService;
