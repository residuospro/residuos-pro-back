"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userInfo = (jwtToken) => {
    const decodedToken = jsonwebtoken_1.default.decode(jwtToken);
    if (decodedToken && decodedToken.exp) {
        const { exp, name, username, permission } = decodedToken;
        return { exp, name, username, permission };
    }
    return null;
};
exports.userInfo = userInfo;
//# sourceMappingURL=jwtUtils.js.map