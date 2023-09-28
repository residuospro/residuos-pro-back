"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const AxiosClient_1 = require("./clients/AxiosClient");
dotenv_1.default.config();
const server = (0, express_1.default)();
(0, routers_1.default)(server);
(0, AxiosClient_1.setupClient)(process.env.AUTHENTICATOR_BACK);
dbConfig_1.default.on("error", console.log.bind("Error ao conectar com o banco"));
dbConfig_1.default.once("open", () => console.log("A conexão com o banco foi realizada com sucesso"));
server.listen(process.env.PORT || 5000, () => console.log("Server running at " + process.env.PORT || 5000));
//# sourceMappingURL=index.js.map