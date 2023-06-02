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
class UserService {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, idCompany } = userData;
                // Verifique se o username já existe no banco de dados
                const existingUser = yield users_1.default.findOne({ username, idCompany });
                if (existingUser != null) {
                    throw new Error("Nome de usuário já existe");
                }
                const saltRounds = 8;
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
                userData.password = hashedPassword;
                const newUser = new users_1.default(Object.assign({}, userData));
                const savedUser = yield newUser.save();
                return savedUser;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getUsers(role, skip, itemsPerPage, idCompany, idDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = { role: { $in: [role] }, deleted: false };
                if (idCompany) {
                    query["idCompany"] = idCompany;
                }
                if (idDepartment) {
                    query["idDepartment"] = idDepartment;
                }
                const users = yield users_1.default.find(query).skip(skip).limit(itemsPerPage);
                const totalUsers = yield users_1.default.find({ Roles: { $in: [role] } }).count();
                const totalPages = Math.ceil(totalUsers / itemsPerPage);
                if (users.length == 0) {
                    throw new Error("Não há usuários pra essa busca");
                }
                return { users, totalPages };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getUsername(users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, idCompany, idDepartment } = users;
                const query = { username, idCompany, deleted: false };
                if (idDepartment) {
                    query["idDepartment"] = idDepartment;
                }
                const user = yield users_1.default.findOne(query);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateUser(updatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = (yield users_1.default.findById(id));
                for (const key in updatedData[0]) {
                    const value = updatedData[0][key];
                    if (value) {
                        user[key] = value;
                    }
                }
                const updatedUser = yield user.save();
                return updatedUser;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const user = yield users_1.default.findByIdAndUpdate(userId, {
                    deleted: true,
                    deletedAt: currentDate,
                }, { new: true });
                return user;
            }
            catch (error) {
                throw new Error("Usuário não encontrado");
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map