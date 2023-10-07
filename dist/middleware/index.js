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
exports.cacheControlMiddleware = exports.verifyPermission = exports.verifyToken = exports.validRequest = void 0;
const express_validator_1 = require("express-validator");
const externalApi_service_1 = __importDefault(require("../services/externalApi_service"));
const validRequest = (req, res, next) => {
    const myValidationResult = express_validator_1.validationResult.withDefaults({
        formatter: (error) => {
            return {
                location: error.location,
                msg: error.msg,
                param: error.param,
                nestedErrors: error.nestedErrors,
            };
        },
    });
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.validRequest = validRequest;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: "Token não fornecido" });
        return;
    }
    const validToken = yield externalApi_service_1.default.validateToken(token);
    if (validToken.status == 200) {
        req.token = token;
        req.user = validToken.data;
        next();
    }
    else {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
});
exports.verifyToken = verifyToken;
const verifyPermission = (permission) => {
    return (req, res, next) => {
        const user = req.user;
        if (permission.includes(user.role[0])) {
            next();
        }
        else {
            return res.status(401).send({
                message: "Você não possui permissão para cadastrar esse tipo de usuário",
            });
        }
    };
};
exports.verifyPermission = verifyPermission;
const cacheControlMiddleware = (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
};
exports.cacheControlMiddleware = cacheControlMiddleware;
//# sourceMappingURL=index.js.map