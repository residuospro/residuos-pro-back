"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsernameSchema = exports.getUserByRoleSchema = exports.userCreateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.userCreateSchema = (0, express_validator_1.checkSchema)({
    name: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Nome não fornecido",
    },
    role: {
        in: ["body"],
        isArray: true,
        notEmpty: true,
        errorMessage: "Permissão não fornecida",
    },
    username: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Username não fornecido",
    },
    idCompany: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Id da empresa não fornecido",
    },
    idDepartment: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Id do departamento não fornecido",
    },
});
exports.getUserByRoleSchema = (0, express_validator_1.checkSchema)({
    page: {
        in: ["body"],
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Pagina não fornecida",
    },
    itemsPerPage: {
        in: ["body"],
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Itens por pagina não fornecido",
    },
    role: {
        in: ["body"],
        isArray: true,
        notEmpty: true,
        errorMessage: "Permissão não fornecida",
    },
    idCompany: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Id da empresa não fornecido",
    },
});
exports.getUsernameSchema = (0, express_validator_1.checkSchema)({
    username: {
        in: ["query"],
        isString: true,
        notEmpty: true,
        errorMessage: "Username não fornecido",
    },
    idCompany: {
        in: ["query"],
        isString: true,
        notEmpty: true,
        errorMessage: "Id da empresa não fornecido",
    },
});
//# sourceMappingURL=userSchema.js.map