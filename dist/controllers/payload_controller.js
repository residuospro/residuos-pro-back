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
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../utils/jwtUtils");
class PayloadController {
    payload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.token;
            const user = (0, jwtUtils_1.userInfo)(token);
            const data = {
                name: user === null || user === void 0 ? void 0 : user.name,
                username: user === null || user === void 0 ? void 0 : user.username,
                permission: user === null || user === void 0 ? void 0 : user.permission,
                company: user.company,
                userId: user.userId,
            };
            if (!user) {
                res.status(401).send({ message: "Token inválido" });
            }
            return res.status(200).json(data);
        });
    }
}
exports.default = PayloadController;
//# sourceMappingURL=payload_controller.js.map