import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers";
import dbConnection from "./config/dbConfig";

dotenv.config();
const server = express();

router(server);

server.disable("x-powered-by");

server.use(cors());

dbConnection.on("error", console.log.bind("Error ao conectar com o banco"));
dbConnection.once("open", () =>
  console.log("A conexão com o banco foi realizada com sucesso")
);

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running at " + process.env.PORT || 5000)
);
