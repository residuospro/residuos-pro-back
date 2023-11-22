import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import dbConnection from "./config/dbConfig";
import { setupClient } from "./clients/AxiosClient";
import WebSocketService from "./services/webSocketService";

dotenv.config();

const app = express();

const pusher = WebSocketService.configurePusherChannel();

app.set("pusher", pusher);

router(app);

setupClient(process.env.AUTHENTICATOR_BACK);

pusher.trigger("residuos-pro", "connected", {
  message: "conexão estabelecida",
});

dbConnection.on("error", console.log.bind("Error ao conectar-se com o banco"));
dbConnection.once("open", () =>
  console.log("A conexão com o banco foi realizada com sucesso")
);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running at " + process.env.PORT || 5000)
);
