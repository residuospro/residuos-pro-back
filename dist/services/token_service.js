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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshToken_1 = __importDefault(require("../models/refreshToken"));
const users_1 = __importDefault(require("../models/users"));
let JWT_SECRET = String(process.env.SECRET_KEY);
class TokenService {
    static generateRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
                    expiresIn: "2d",
                });
                const token = new refreshToken_1.default({
                    userId,
                    refreshToken,
                });
                const saveToken = yield token.save();
                if (saveToken)
                    return refreshToken;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static generateAcessToken(permission, name, username, company, userId, idDepartment, department, ramal) {
        let config = {
            permission,
            name,
            username,
            company,
            userId,
        };
        if (idDepartment) {
            config = Object.assign(Object.assign({}, config), { idDepartment, department, ramal });
        }
        const token = jsonwebtoken_1.default.sign(config, JWT_SECRET, { expiresIn: "5h" });
        return token;
    }
    static verifyToken(token) {
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decodedToken;
    }
    static updateRefreshToken(oldRefreshToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh_token = yield refreshToken_1.default.findOne({
                refreshToken: oldRefreshToken,
            });
            const user = yield users_1.default.findById(userId);
            if (refresh_token) {
                const token = this.generateAcessToken(user.role, user.name, user.username, user.idCompany, userId);
                const refreshToken = yield this.generateRefreshToken(user.id);
                return { token, refreshToken };
            }
            return null;
        });
    }
}
exports.default = TokenService;
//# sourceMappingURL=token_service.js.map