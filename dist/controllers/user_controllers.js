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
const user_service_1 = __importDefault(require("../services/user_service"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, idDepartment, idCompany, role, ramal, username, password, email, } = req.body;
                // Chame o método do service para criar o usuário
                const createUser = yield user_service_1.default.createUser({
                    name,
                    idDepartment,
                    idCompany,
                    role,
                    ramal,
                    username,
                    password,
                    email,
                });
                return res.status(201).json(createUser);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getUsersByRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, itemsPerPage, role, idCompany, idDepartment } = req.body;
                const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);
                const users = yield user_service_1.default.getUsers(role, skip, itemsPerPage, idCompany, idDepartment);
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    getUserByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, idCompany, idDepartment } = req.query;
                const user = yield user_service_1.default.getUsername({
                    username,
                    idCompany,
                    idDepartment,
                });
                if (user) {
                    return res.status(200).json(user);
                }
                return res.status(404).send({ message: "Usuário não encontrado" });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    }
    updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, password, ramal, email } = req.body;
                const { id } = req.params;
                const user = yield user_service_1.default.updateUser([{ name, username, password, ramal, email }], id);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).send({ message: error.message });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.default.deleteUser(id);
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user_controllers.js.map