"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentCreateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.departmentCreateSchema = (0, express_validator_1.checkSchema)({
    name: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Nome do departamento não fornecido",
    },
    idCompany: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Id da empresa não fornecido",
    },
    ramal: {
        in: ["body"],
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Ramal do departamento não fornecido",
    },
    email: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Email do departamento não fornecido",
    },
    responsible: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        errorMessage: "Responsáveç do departamento não fornecido",
    },
});
//# sourceMappingURL=departmentSchema.js.map