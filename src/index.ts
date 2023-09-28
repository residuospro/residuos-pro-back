import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import dbConnection from "./config/dbConfig";
import { setupClient } from "./clients/AxiosClient";

dotenv.config();

const server = express();

router(server);

setupClient(process.env.AUTHENTICATOR_BACK);

dbConnection.on("error", console.log.bind("Error ao conectar com o banco"));
dbConnection.once("open", () =>
  console.log("A conexão com o banco foi realizada com sucesso")
);

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running at " + process.env.PORT || 5000)
);
