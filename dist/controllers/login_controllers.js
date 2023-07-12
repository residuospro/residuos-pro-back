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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const token_service_1 = __importDefault(require("../services/token_service"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith("Basic ")) {
                    return null;
                }
                const base64Credentials = authHeader.slice(6);
                const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
                if (!credentials) {
                    return res.status(401).send({ message: "Credenciais inválidas" });
                }
                const [username, password] = credentials.split(":");
                // Verificar se o usuário existe no banco de dados
                const user = yield users_1.default.findOne({ username, deleted: false });
                if (!user) {
                    return res.status(403).json({ error: "Usuário não encontrado" });
                }
                // Verificar se a senha está correta
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(403).json({ error: "Senha incorreta" });
                }
                // Gerar o token JWT com a permissão do usuário
                const token = token_service_1.default.generateAcessToken(user.role, user.name, user.username, user.idCompany, user._id, user.idDepartment, user.department, user.ramal);
                const refreshToken = yield token_service_1.default.generateRefreshToken(user.id);
                // Retornar o token JWT para o cliente
                res.json({ token, refreshToken });
            }
            catch (error) {
                res.status(500).json({ error: "Erro ao fazer login" });
            }
        });
    }
}
exports.default = LoginController;
//# sourceMappingURL=login_controllers.js.map